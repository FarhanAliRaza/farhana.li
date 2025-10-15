<script lang="ts">
	import { onMount } from 'svelte';

	// Full Example XML with your actual resume data
	const exampleXML = `<?xml version="1.0" encoding="UTF-8"?>
<resume>
  <name>Farhan Ali</name>
  <initials>FA</initials>
  <location>Bahwalnagar, Pakistan | GMT+5</location>
  <locationLink>https://maps.google.com/?q=Bahwalnagar,Pakistan</locationLink>
  <tagline>Full Stack Engineer | Django Core Contributor</tagline>
  <about>Full-stack engineer with 5+ years building production systems at scale. Django core contributor via Google Summer of Code 2025, shipped template partials feature to framework. Created django-bolt, a Rust/PyO3 framework achieving 64K+ RPS, exploring Python-Rust performance boundaries. Architected systems processing 100M+ emails with 99.9% uptime. Expert in Python, Django, Rust, and async processing with Tokio and Actix. Track record of delivering solutions rapidly while solving complex technical challenges end-to-end.</about>
  <avatarUrl>https://avatars.githubusercontent.com/u/62690310?s=400&amp;u=cee700c06c6b86ca633e78e3d6f096b7a27b8437&amp;v=4</avatarUrl>

  <contact>
    <personalWebsiteUrl>https://farhana.li</personalWebsiteUrl>
    <email>your.email@example.com</email>
    <tel>+1234567890</tel>
    <social>
      <name>GitHub</name>
      <url>https://github.com/FarhanAliRaza</url>
      <icon>github</icon>
    </social>
    <social>
      <name>LinkedIn</name>
      <url>https://www.linkedin.com/in/farhanaliraza</url>
      <icon>linkedin</icon>
    </social>
  </contact>

  <work>
    <company>Django Software Foundation</company>
    <title>Google Summer of Code 2025 Contributor</title>
    <badges>Remote</badges>
    <badges>Django</badges>
    <badges>Python</badges>
    <badges>Open Source</badges>
    <start>05/2025</start>
    <end>08/2025</end>
    <highlights>Selected for the highly competitive Google Summer of Code program to contribute to the Django web framework</highlights>
    <highlights>Shipped template partials to Django core (PR #19643)</highlights>
    <highlights>Wrote comprehensive documentation and 50+ tests</highlights>
    <highlights>Collaborated openly with maintainers through 100+ public review comments</highlights>
  </work>

  <work>
    <company>Medgebra</company>
    <title>Full Stack Engineer</title>
    <badges>Remote</badges>
    <badges>Django</badges>
    <badges>Next.js</badges>
    <badges>RAG</badges>
    <badges>PostgreSQL</badges>
    <badges>Redis</badges>
    <badges>DSPY</badges>
    <badges>Pinecone</badges>
    <start>06/2024</start>
    <end>07/2025</end>
    <highlights>Engineered LLM-powered semantic matching system with coordinate caching, reducing citation lookup time from 3-5s to less than 200ms</highlights>
    <highlights>Built a scalable pipeline processing 100,000+ medical PDFs with AI-powered page filtering and citation tracking</highlights>
    <highlights>Implemented real-time document search and retrieval system using vector embeddings and semantic similarity matching</highlights>
  </work>

  <work>
    <company>Bulk Mail Verifier</company>
    <title>Full Stack Engineer</title>
    <badges>Django</badges>
    <badges>Svelte</badges>
    <badges>Celery</badges>
    <badges>Redis</badges>
    <badges>PostgreSQL</badges>
    <badges>Rabbitmq</badges>
    <badges>SMTP</badges>
    <start>03/2024</start>
    <end>Present</end>
    <highlights>Evolved product from email validation service processing 100M+ emails to comprehensive cold email platform</highlights>
    <highlights>Achieved 3,000+ active users and growing MRR through pure product-led growth strategy</highlights>
    <highlights>Developing AI agent for autonomous cold email campaign management with fine-tuned Qwen 2.5 0.5B model</highlights>
    <highlights>Led full product ownership cycle: user research, pivot decision, feature development</highlights>
    <highlights>Built scalable architecture handling millions of emails with RESTful APIs</highlights>
  </work>

  <education>
    <school>Islamia University of Bahawalpur</school>
    <degree>BS CS - 3.61/4.0</degree>
    <start>08/2019</start>
    <end>05/2023</end>
  </education>

  <skills>Python</skills>
  <skills>Django</skills>
  <skills>Rust</skills>
  <skills>JavaScript</skills>
  <skills>TypeScript</skills>
  <skills>React</skills>
  <skills>Svelte</skills>
  <skills>Next.js</skills>
  <skills>FastAPI</skills>
  <skills>Celery</skills>
  <skills>PyO3</skills>
  <skills>msgspec</skills>
  <skills>Tokio</skills>
  <skills>Actix</skills>
  <skills>PostgreSQL</skills>
  <skills>Redis</skills>
  <skills>Pinecone</skills>
  <skills>Docker</skills>
  <skills>Git</skills>
  <skills>REST APIs</skills>
  <skills>RAG</skills>
  <skills>LLM Integration</skills>
  <skills>Prompt Engineering</skills>
  <skills>DSPY</skills>
  <skills>Performance Optimization</skills>
  <skills>Open Source</skills>

  <projects>
    <title>django-bolt</title>
    <description>High-performance Django HTTP APIs powered by Rust (Actix+Tokio) with msgspec serialization, achieving 60k+ RPS for typed endpoints.</description>
    <techStack>Django</techStack>
    <techStack>Rust</techStack>
    <techStack>PyO3</techStack>
    <techStack>Actix</techStack>
    <techStack>Tokio</techStack>
    <url>https://github.com/FarhanAliRaza/django-bolt</url>
  </projects>

  <projects>
    <title>claude-context-local</title>
    <description>Semantic code search MCP server for Claude Code that runs 100% locally using EmbeddingGemma, with zero API costs and complete privacy.</description>
    <techStack>Python</techStack>
    <techStack>FASTMCP</techStack>
    <techStack>MCP</techStack>
    <techStack>FAISS</techStack>
    <techStack>Local Model</techStack>
    <url>https://github.com/FarhanAliRaza/claude-context-local</url>
  </projects>

  <projects>
    <title>django-rapid</title>
    <description>FastAPI-like decorators for Django with 3-10x faster JSON serialization using msgspec, providing simple request validation and response serialization.</description>
    <techStack>Python</techStack>
    <techStack>Django</techStack>
    <techStack>msgspec</techStack>
    <url>https://github.com/FarhanAliRaza/django-rapid</url>
  </projects>
</resume>`;

	// TypeScript Type Definition
	const typeDefinition = `// TypeScript Type Definition for Resume Data
interface ResumeData {
  name: string;
  initials: string; // max 3 chars
  location: string;
  locationLink: string; // must be valid URL
  tagline: string;
  about: string;
  avatarUrl: string; // must be valid URL

  contact: {
    personalWebsiteUrl?: string; // optional, valid URL
    email: string; // must be valid email
    tel?: string; // optional
    social?: Array<{
      name: string;
      url: string; // must be valid URL
      icon: 'github' | 'linkedin' | 'twitter' | 'email' | 'website';
    }>;
  };

  work: Array<{
    company: string;
    title: string;
    badges?: string[]; // optional tags
    start: string; // date format: MM/YYYY
    end: string;   // date format: MM/YYYY or "Present"
    highlights: string[]; // bullet points
  }>;

  education: Array<{
    school: string;
    degree: string;
    start: string;
    end: string;
  }>;

  skills: string[]; // list of skills

  projects: Array<{
    title: string;
    description: string;
    techStack: string[];
    url?: string; // optional, valid URL
  }>;
}`;

	const llmPrompt = `Generate a tailored resume XML for the following job posting.
Use this XML structure and adapt the content to emphasize relevant experience:

${exampleXML}

Instructions:
1. Reorder work highlights to put most relevant experience first
2. Adjust the tagline to match the job requirements
3. Modify the about section to align with the role
4. Prioritize relevant skills (reorder, don't remove)
5. Emphasize projects that demonstrate required skills
6. Keep all dates and company names unchanged
7. Maintain professional tone while highlighting fit

Job Description: [PASTE JOB HERE]

Return only the modified XML, no explanations.`;

	let copiedXML = $state(false);
	let copiedTypes = $state(false);
	let copiedPrompt = $state(false);
	let copiedURL = $state(false);

	async function copyToClipboard(text: string, type: 'xml' | 'types' | 'prompt' | 'url') {
		await navigator.clipboard.writeText(text);

		// Reset all states
		copiedXML = false;
		copiedTypes = false;
		copiedPrompt = false;
		copiedURL = false;

		// Set the specific one
		if (type === 'xml') copiedXML = true;
		else if (type === 'types') copiedTypes = true;
		else if (type === 'prompt') copiedPrompt = true;
		else if (type === 'url') copiedURL = true;

		setTimeout(() => {
			copiedXML = false;
			copiedTypes = false;
			copiedPrompt = false;
			copiedURL = false;
		}, 2000);
	}

	async function generateTestUrl() {
		const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
		const fullUrl = `${baseUrl}/resume/view?data=${exampleXML}`;
		await copyToClipboard(fullUrl, 'url');
	}
</script>

<main class="example-page">
	<div class="example-content">
		<h1>Resume XML Generator</h1>
		<p class="subtitle">
			Generate job-specific resumes using LLMs. The browser will automatically URL-encode your XML when you paste it in the address bar.
		</p>

		<div class="card">
			<h2>📋 How to Use</h2>
			<ol>
				<li>Copy the example XML below</li>
				<li>Send it to an LLM (ChatGPT, Claude, etc.) with the job description</li>
				<li>Copy the generated XML and paste it after <code>?data=</code> in the URL</li>
				<li>Press Ctrl+P (or Cmd+P on Mac) to save as PDF</li>
			</ol>
			<div class="tip">
				<strong>💡 Pro Tip:</strong> You can paste raw XML directly in the URL bar - the browser handles encoding automatically!
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h2>🔧 XML Structure Example</h2>
				<button class="copy-btn" onclick={() => copyToClipboard(exampleXML, 'xml')}>
					{copiedXML ? '✓ Copied!' : 'Copy XML'}
				</button>
			</div>
			<pre class="code-block"><code>{exampleXML}</code></pre>
		</div>

		<div class="card">
			<div class="card-header">
				<h2>📝 TypeScript Types</h2>
				<button class="copy-btn" onclick={() => copyToClipboard(typeDefinition, 'types')}>
					{copiedTypes ? '✓ Copied!' : 'Copy Types'}
				</button>
			</div>
			<pre class="code-block"><code>{typeDefinition}</code></pre>
		</div>

		<div class="card">
			<div class="card-header">
				<h2>🤖 LLM Prompt Template</h2>
				<button class="copy-btn" onclick={() => copyToClipboard(llmPrompt, 'prompt')}>
					{copiedPrompt ? '✓ Copied!' : 'Copy Prompt'}
				</button>
			</div>
			<pre class="code-block prompt"><code>{llmPrompt}</code></pre>
		</div>

		<div class="actions">
			<button class="test-btn" onclick={generateTestUrl}>
				{copiedURL ? '✓ Test URL Copied!' : '🚀 Copy Test URL (with example data)'}
			</button>
			<a href="/resume" class="link-btn">View Original Resume →</a>
		</div>
	</div>
</main>

<style>
	.example-page {
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 2rem 1rem;
	}

	.example-content {
		max-width: 1024px;
		margin: 0 auto;
	}

	h1 {
		color: white;
		font-size: 3rem;
		font-weight: 800;
		margin: 0 0 0.5rem 0;
		text-align: center;
	}

	.subtitle {
		color: rgba(255, 255, 255, 0.9);
		font-size: 1.25rem;
		text-align: center;
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.card {
		background: white;
		border-radius: 1rem;
		padding: 2rem;
		margin-bottom: 1.5rem;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
	}

	.card h2 {
		color: #1a202c;
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0 0 1rem 0;
	}

	.card ol {
		color: #4a5568;
		line-height: 1.8;
		margin: 0;
		padding-left: 1.5rem;
	}

	.card li {
		margin-bottom: 0.5rem;
	}

	.card code {
		background: #edf2f7;
		color: #e53e3e;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-family: 'Fira Code', monospace;
		font-size: 0.9rem;
	}

	.tip {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 1rem;
		border-radius: 0.5rem;
		margin-top: 1rem;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.copy-btn {
		background: #48bb78;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
	}

	.copy-btn:hover {
		background: #38a169;
		transform: translateY(-1px);
	}

	.code-block {
		background: #1a202c;
		color: #e2e8f0;
		padding: 1.5rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		font-size: 0.875rem;
		line-height: 1.5;
		margin: 0;
		max-height: 400px;
		overflow-y: auto;
	}

	.code-block.prompt {
		background: #2d3748;
		max-height: 300px;
	}

	.code-block code {
		font-family: 'Fira Code', monospace;
		background: transparent;
		color: inherit;
		padding: 0;
	}

	.actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-top: 2rem;
	}

	.test-btn {
		background: white;
		color: #667eea;
		border: 2px solid white;
		padding: 1rem 2rem;
		border-radius: 0.5rem;
		font-size: 1.125rem;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.2s;
	}

	.test-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		color: white;
		transform: translateY(-2px);
	}

	.link-btn {
		background: rgba(255, 255, 255, 0.2);
		color: white;
		border: 2px solid white;
		padding: 1rem 2rem;
		border-radius: 0.5rem;
		font-size: 1.125rem;
		font-weight: 700;
		text-decoration: none;
		display: inline-block;
		transition: all 0.2s;
	}

	.link-btn:hover {
		background: white;
		color: #667eea;
		transform: translateY(-2px);
	}

	/* Custom scrollbar for code blocks */
	.code-block::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	.code-block::-webkit-scrollbar-track {
		background: #2d3748;
	}

	.code-block::-webkit-scrollbar-thumb {
		background: #4a5568;
		border-radius: 4px;
	}

	.code-block::-webkit-scrollbar-thumb:hover {
		background: #718096;
	}
</style>