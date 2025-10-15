import { XMLParser } from 'fast-xml-parser';

/**
 * Helper function to clean empty objects and undefined values from parsed XML
 */
export function cleanEmptyValues(obj: any): any {
	if (obj === null || obj === undefined) {
		return undefined;
	}

	if (Array.isArray(obj)) {
		return obj.map(cleanEmptyValues).filter(item => item !== undefined);
	}

	if (typeof obj === 'object') {
		// Check if it's an empty object
		const keys = Object.keys(obj);
		if (keys.length === 0) {
			return undefined;
		}

		const cleaned: any = {};
		for (const key of keys) {
			const value = cleanEmptyValues(obj[key]);
			if (value !== undefined) {
				cleaned[key] = value;
			}
		}

		// Return undefined if the cleaned object is empty
		return Object.keys(cleaned).length === 0 ? undefined : cleaned;
	}

	return obj;
}

/**
 * Parse XML string to JavaScript object with proper configuration for resume data
 */
export function parseResumeXML(xmlString: string) {
	const parser = new XMLParser({
		ignoreAttributes: false,
		attributeNamePrefix: '',
		textNodeName: '_text',
		parseAttributeValue: false, // Don't parse attribute values
		parseTagValue: false, // Don't parse tag values - keep everything as strings
		trimValues: true,
		isArray: (tagName) => {
			// Define which tags should always be treated as arrays
			return ['social', 'work', 'education', 'skills', 'projects', 'badges', 'highlights', 'techStack', 'skill'].includes(tagName);
		}
	});

	const result = parser.parse(xmlString);

	if (!result.resume) {
		throw new Error('XML must have a root <resume> element');
	}

	// Clean up the parsed data - remove empty objects and undefined values
	const cleaned = cleanEmptyValues(result.resume);
	return cleaned;
}