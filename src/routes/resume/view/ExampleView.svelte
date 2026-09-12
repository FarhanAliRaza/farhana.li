<script lang="ts">
	import { profile, experience } from '$lib/profile';

	const escapeXml = (value: string) =>
		value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

	// Full Example XML with your actual resume data
	const exampleXML = `<?xml version="1.0" encoding="UTF-8"?>
<resume>
  <name>${escapeXml(profile.name)}</name>
  <initials>FA</initials>
  <location>Bahwalnagar, Pakistan | GMT+5</location>
  <locationLink>https://maps.google.com/?q=Bahwalnagar,Pakistan</locationLink>
  <tagline>${escapeXml(profile.tagline)}</tagline>
  <about>${escapeXml(profile.resumeSummary)}</about>
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

${experience
	.map(
		(job) => `  <work>
    <company>${escapeXml(job.company)}</company>
    <title>${escapeXml(job.role)}</title>
    ${[job.employmentType, ...job.skills].map((badge) => `<badges>${escapeXml(badge)}</badges>`).join('\n    ')}
    <start>${job.start}</start>
    <end>${job.end}</end>
    ${[job.summary, ...job.highlights].map((highlight) => `<highlights>${escapeXml(highlight)}</highlights>`).join('\n    ')}
  </work>`
	)
	.join('\n\n')}

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
		const url = new URL('/resume/view', window.location.origin);
		url.searchParams.set('data', exampleXML);
		await copyToClipboard(url.href, 'url');
	}
</script>

<main class="example-page">
	<div class="example-content">
		<h1>Resume XML Generator</h1>
		<p class="subtitle">
			Generate job-specific resumes using XML. Copy the example below, customize it, and generate a
			link to preview your resume.
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
				<strong>💡 Pro Tip:</strong> You can paste raw XML directly in the URL bar - the browser handles
				encoding automatically!
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
		background: #08070c;
		color: #f5f1fa;
		padding: 40px var(--bento-gutter) 72px;
	}
	.example-content {
		max-width: 1080px;
		margin: 0 auto;
		min-width: 0;
	}
	h1 {
		font-family: var(--font-display);
		font-size: clamp(2.4rem, 5vw, 4rem);
		letter-spacing: -0.05em;
		font-weight: 600;
		line-height: 1.1;
		margin-bottom: 20px;
	}
	.subtitle {
		color: var(--bento-muted);
		font-size: 16px;
		line-height: 1.8;
		max-width: 660px;
		margin-bottom: 36px;
	}
	.card {
		background: var(--bento-surface);
		border: 1px solid var(--bento-border);
		border-radius: var(--bento-radius);
		padding: clamp(20px, 3vw, 36px);
		margin-bottom: var(--bento-gap);
		min-width: 0;
	}
	.card h2 {
		font-family: var(--font-display);
		font-size: clamp(1.25rem, 2.5vw, 1.8rem);
		letter-spacing: -0.03em;
		margin: 0 0 16px;
	}
	.card ol {
		color: var(--bento-muted);
		line-height: 1.8;
		margin: 0;
		padding-left: 24px;
		list-style: decimal;
	}
	.card li {
		margin-bottom: 8px;
	}
	.card code {
		background: #22192e;
		color: #e9c2ff;
		padding: 2px 6px;
		border-radius: 6px;
		font-family: var(--font-mono);
		font-size: 12px;
		overflow-wrap: anywhere;
	}
	.tip {
		background: #22192e;
		color: #d9c5e9;
		padding: 20px;
		border-radius: 16px;
		margin-top: 20px;
		line-height: 1.7;
	}
	.card-header {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		margin-bottom: 20px;
	}
	.card-header h2 {
		margin-bottom: 0;
	}
	.copy-btn,
	.test-btn,
	.link-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 44px;
		background: #22192e;
		color: #e9c2ff;
		border: 1px solid #382c47;
		padding: 10px 18px;
		border-radius: 999px;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: background 180ms;
		text-decoration: none;
	}
	.test-btn {
		background: #e9c2ff;
		color: #251431;
	}
	.copy-btn:hover,
	.link-btn:hover {
		background: #352443;
	}
	.test-btn:hover {
		background: #f2ddff;
	}
	.code-block {
		background: #0a0810;
		color: #d7cee2;
		padding: clamp(16px, 2vw, 28px);
		border: 1px solid var(--bento-border);
		border-radius: 18px;
		overflow: auto;
		font-size: 12px;
		line-height: 1.8;
		margin: 0;
		max-height: 400px;
		scrollbar-color: #544063 #0a0810;
		scrollbar-width: thin;
	}
	.code-block.prompt {
		max-height: 300px;
	}
	.code-block code {
		background: transparent;
		color: inherit;
		padding: 0;
		overflow-wrap: normal;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 32px;
	}
	@media (prefers-reduced-motion: reduce) {
		.copy-btn,
		.test-btn,
		.link-btn {
			transition: none;
		}
	}
</style>
