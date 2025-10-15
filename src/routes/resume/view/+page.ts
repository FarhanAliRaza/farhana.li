import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { ResumeDataSchema, type ResumeData } from '../schema';
import { parseResumeXML } from '../xml-parser';
import { z } from 'zod';

export const load: PageLoad = ({ url }) => {
	// Get the XML data from query parameter
	const xmlData = url.searchParams.get('data');

	if (!xmlData) {
		// Return example data when no XML is provided
		return {
			showExample: true,
			resumeData: null
		};
	}

	try {
		// The URL parameter might already be decoded by the browser
		// Try to use it as-is first, or decode if needed
		let decodedXml: string;
		try {
			// Check if the data looks like it needs decoding (contains % signs)
			if (xmlData.includes('%')) {
				decodedXml = decodeURIComponent(xmlData);
			} else {
				decodedXml = xmlData;
			}
		} catch (decodeError) {
			// If decoding fails, use the original data
			decodedXml = xmlData;
		}

		// Parse the XML string
		let parsedData: unknown;
		try {
			parsedData = parseResumeXML(decodedXml);
		} catch (xmlError) {
			const errorMsg = xmlError instanceof Error ? xmlError.message : 'Failed to parse XML. Please ensure the data is valid XML format.';
			throw error(400, `Invalid XML format: ${errorMsg}`);
		}

		// Validate the parsed data against the schema
		let validatedData: ResumeData;
		try {
			validatedData = ResumeDataSchema.parse(parsedData);
		} catch (validationError) {
			if (validationError instanceof z.ZodError) {
				const errorMessages = validationError.issues
					.map((err: z.ZodIssue) => `${err.path.join('.')}: ${err.message}`)
					.join(', ');

				throw error(400, `Resume data validation failed: ${errorMessages}`);
			}
			throw error(400, 'Resume data validation failed: The provided data does not match the expected resume schema');
		}

		// Return the validated data
		return {
			showExample: false,
			resumeData: validatedData
		};
	} catch (err) {
		// Re-throw SvelteKit errors
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}

		// Handle unexpected errors
		const errorMsg = err instanceof Error ? err.message : 'Unknown error';
		throw error(500, `An unexpected error occurred while processing the resume data: ${errorMsg}`);
	}
};
