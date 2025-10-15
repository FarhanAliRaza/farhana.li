// Word bank with obscure hints - stored obfuscated in localStorage
interface WordPair {
	word: string;
	hint: string;
}

// Base64 encode to make it harder for LLMs to extract
const encodeWords = (words: WordPair[]): string => {
	return btoa(JSON.stringify(words));
};

const decodeWords = (encoded: string): WordPair[] => {
	return JSON.parse(atob(encoded));
};

// The word bank - will be stored in localStorage obfuscated
const wordBank: WordPair[] = [
	{ word: 'CAT', hint: 'Keyboard walker at 3am' },
	{ word: 'BUG', hint: 'Feature in disguise' },
	{ word: 'CODE', hint: "Developer's poetry" },
	{ word: 'WIFI', hint: 'Invisible lifeline' },
	{ word: 'APP', hint: "Thumb's best friend" },
	{ word: 'GIT', hint: 'Time machine for code' },
	{ word: 'API', hint: 'services talk through?' },
	{ word: 'LOG', hint: "Developer's diary" },
	{ word: 'BIT', hint: 'Smallest yes or no' },
	{ word: 'RAM', hint: "Computer's short memory" },
	{ word: 'CPU', hint: 'Silicon brain' },
	{ word: 'ZIP', hint: 'File diet plan' },
	{ word: 'TAB', hint: "Space bar's cousin" },
	{ word: 'WEB', hint: "Spider's internet" }
	// { word: 'KEY', hint: "Password's building block" },
	// { word: 'URL', hint: "Web's home address" },
	// { word: 'JSON', hint: "Data's favorite outfit" },
	// { word: 'DOM', hint: "Browser's family tree" },
	// { word: 'CSS', hint: "Web's makeup artist" },
	// { word: 'HTML', hint: "Web's skeleton" },
	// { word: 'PORT', hint: "Server's doorway" },
	// { word: 'SSH', hint: 'Remote secret tunnel' },
	// { word: 'BASH', hint: "Terminal's native tongue" },
	// { word: 'GREP', hint: 'Text detective' },
	// { word: 'CURL', hint: 'Command line browser' },
	// { word: 'PIPE', hint: "Unix's assembly line" },
	// { word: 'ROOT', hint: "System's god mode" },
	// { word: 'NULL', hint: 'Absence incarnate' },
	// { word: 'LOOP', hint: 'Infinite déjà vu' },
	// { word: 'FORK', hint: "Process's twin maker" },
	// { word: 'PUSH', hint: "Git's send button" },
	// { word: 'PULL', hint: "Git's receive button" },
	// { word: 'DIFF', hint: 'Change detector' },
	// { word: 'BLOB', hint: "Git's data pocket" },
	// { word: 'HEAD', hint: "Git's now pointer" },
	// { word: 'NODE', hint: "JavaScript's server home" },
	// { word: 'NPM', hint: "Node's package mall" },
	// { word: 'YARN', hint: "NPM's faster cousin" },
	// { word: 'RUST', hint: "C++'s safer sibling" },
	// { word: 'ASYNC', hint: "Promise's lifestyle" },
	// { word: 'AWAIT', hint: "Promise's patience" },
	// { word: 'MACRO', hint: "Rust's code wizard" },
	// { word: 'TRAIT', hint: "Rust's behavior contract" },
	// { word: 'ENUM', hint: "Type's multiple choice" },
	// { word: 'TUPLE', hint: "Array's structured cousin" },
	// { word: 'HASH', hint: "Password's disguise" },
	// { word: 'SALT', hint: "Hash's random friend" },
	// { word: 'TOKEN', hint: 'Digital passport' },
	// { word: 'JWT', hint: 'Self-contained ticket' },
	// { word: 'CORS', hint: "Browser's border patrol" },
	// { word: 'AJAX', hint: 'No-reload refresh' },
	// { word: 'CRUD', hint: 'Database four verbs' },
	// { word: 'ORM', hint: 'SQL translator' },
	// { word: 'ACID', hint: "Database's safety rules" },
	// { word: 'CACHE', hint: "Speed's secret stash" },
	// { word: 'REDIS', hint: 'Fast memory store' },
	// { word: 'QUEUE', hint: 'Patient line former' },
	// { word: 'STACK', hint: 'Last-in first-out pile' },
	// { word: 'HEAP', hint: "Memory's free store" },
	// { word: 'TREE', hint: "Data's family tree" },
	// { word: 'GRAPH', hint: 'Connected dots map' },
	// { word: 'SORT', hint: "Array's organizer" },
	// { word: 'SEARCH', hint: 'Needle in haystack' },
	// { word: 'REGEX', hint: "Text's pattern finder" },
	// { word: 'PARSE', hint: "String's interpreter" },
	// { word: 'LINT', hint: "Code's grammar checker" },
	// { word: 'TEST', hint: "Bug's worst enemy" },
	// { word: 'MOCK', hint: "Test's pretend friend" },
	// { word: 'STUB', hint: "Test's placeholder" },
	// { word: 'PATCH', hint: "Bug's quick fix" },
	// { word: 'BUILD', hint: "Code's transformation" },
	// { word: 'DEPLOY', hint: "Code's final journey" },
	// { word: 'PROD', hint: "Code's scary home" },
	// { word: 'STAGE', hint: "Prod's dress rehearsal" },
	// { word: 'DEBUG', hint: "Bug's hunting season" },
	// { word: 'TRACE', hint: "Error's breadcrumb trail" },
	// { word: 'SUDO', hint: 'Admin magic word' },
	// { word: 'CHMOD', hint: 'Permission changer' },
	// { word: 'CRON', hint: 'Time-based robot' },
	// { word: 'NGINX', hint: 'Reverse traffic cop' },
	// { word: 'DOCKER', hint: 'App shipping container' },
	// { word: 'KUBE', hint: 'Container orchestra' },
	// { word: 'YAML', hint: 'Indent-sensitive config' },
	// { word: 'ENV', hint: "Secret's hiding place" },
	// { word: 'PATH', hint: "Shell's search route" },
	// { word: 'ALIAS', hint: "Command's nickname" },
	// { word: 'VIM', hint: 'Exit-proof editor' },
	// { word: 'EMACS', hint: "Vim's eternal rival" },
	// { word: 'BUFFER', hint: "Editor's workspace" },
	// { word: 'SYNTAX', hint: "Code's grammar rules" },
	// { word: 'SCOPE', hint: "Variable's home range" },
	// { word: 'CLASS', hint: "Object's blueprint" },
	// { word: 'PROXY', hint: "Request's middleman" },
	// { word: 'WEBSOCKET', hint: 'Two-way live chat' },
	// { word: 'CDN', hint: 'Global file copier' },
	// { word: 'DNS', hint: "Internet's phone book" },
	// { word: 'SSL', hint: "Web's padlock" },
	// { word: 'HTTPS', hint: "HTTP's secure twin" }
];

const STORAGE_KEY = '_wg_d';

export const initWordBank = (): void => {
	if (typeof window === 'undefined') return;

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (!stored) {
			const encoded = encodeWords(wordBank);
			localStorage.setItem(STORAGE_KEY, encoded);
		}
	} catch {
		// Silent fail if localStorage is not available
	}
};

export const getRandomWord = (): WordPair => {
	if (typeof window === 'undefined') {
		// Fallback for SSR
		return wordBank[Math.floor(Math.random() * wordBank.length)];
	}

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			const words = decodeWords(stored);
			return words[Math.floor(Math.random() * words.length)];
		}
	} catch {
		// Fallback to in-memory bank
	}

	return wordBank[Math.floor(Math.random() * wordBank.length)];
};

export const getWordCount = (): number => {
	return wordBank.length;
};
