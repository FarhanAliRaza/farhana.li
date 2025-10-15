import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Simple in-memory rate limiting (in production, use Redis)
const requestCounts = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 10; // 10 requests
const RATE_WINDOW = 60000; // per minute

function isBot(userAgent: string): boolean {
	const botPatterns = [
		/bot/i,
		/crawler/i,
		/spider/i,
		/scraper/i,
		/curl/i,
		/wget/i,
		/python/i,
		/java/i,
		/ruby/i,
		/perl/i,
		/php/i,
		/googlebot/i,
		/bingbot/i,
		/slurp/i,
		/duckduckbot/i,
		/baiduspider/i,
		/yandexbot/i,
		/facebookexternalhit/i,
		/twitterbot/i,
		/linkedinbot/i,
		/whatsapp/i,
		/slackbot/i,
		/discord/i,
		/telegram/i
	];

	return botPatterns.some(pattern => pattern.test(userAgent));
}

export const load: PageServerLoad = async ({ request, getClientAddress }) => {
	const userAgent = request.headers.get('user-agent') || '';
	const clientIp = getClientAddress();

	// Block known bots and scrapers
	if (isBot(userAgent)) {
		throw error(403, 'Access denied for automated requests');
	}

	// Check for suspicious headers that indicate scraping
	const suspiciousHeaders = [
		'x-forwarded-host',
		'x-original-url',
		'x-rewrite-url'
	];

	for (const header of suspiciousHeaders) {
		if (request.headers.get(header)) {
			throw error(403, 'Suspicious request detected');
		}
	}

	// Rate limiting
	const now = Date.now();
	const userKey = `${clientIp}:${userAgent}`;

	// Clean old entries
	for (const [key, data] of requestCounts.entries()) {
		if (now - data.timestamp > RATE_WINDOW) {
			requestCounts.delete(key);
		}
	}

	const userData = requestCounts.get(userKey);

	if (userData) {
		if (now - userData.timestamp < RATE_WINDOW) {
			userData.count++;
			if (userData.count > RATE_LIMIT) {
				throw error(429, 'Too many requests. Please try again later.');
			}
		} else {
			// Reset if outside window
			requestCounts.set(userKey, { count: 1, timestamp: now });
		}
	} else {
		requestCounts.set(userKey, { count: 1, timestamp: now });
	}

	// Add security headers
	return {
		headers: {
			'X-Robots-Tag': 'noindex, nofollow, noarchive',
			'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
			'Pragma': 'no-cache',
			'Expires': '0'
		}
	};
};