<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Error - Resume Viewer</title>
</svelte:head>

<main class="error-page">
	<div class="error-content">
		<h1 class="error-title">
			{$page.status}
		</h1>
		<h2 class="error-message">
			{$page.error?.message || 'An error occurred'}
		</h2>

		<div class="error-help">
			<h3>How to use this page:</h3>
			<ol>
				<li>Prepare your resume data in XML format (see schema below)</li>
				<li>URL-encode the XML string</li>
				<li>
					Pass it as a query parameter: <code>/resume/view?data=YOUR_ENCODED_XML</code>
				</li>
			</ol>

			<details class="schema-info">
				<summary>View Required XML Schema</summary>
				<pre><code>{`<resume>
  <name>Farhan Ali</name>
  <initials>FA</initials>
  <location>City, Country | GMT+X</location>
  <locationLink>https://maps.google.com/?q=City,Country</locationLink>
  <tagline>Your professional tagline</tagline>
  <about>Your professional summary...</about>
  <avatarUrl>https://example.com/avatar.jpg</avatarUrl>

  <contact>
    <email>your.email@example.com</email>
    <personalWebsiteUrl>https://yourwebsite.com</personalWebsiteUrl>
    <tel>+1234567890</tel>
    <social>
      <name>GitHub</name>
      <url>https://github.com/username</url>
      <icon>github</icon>
    </social>
    <social>
      <name>LinkedIn</name>
      <url>https://linkedin.com/in/username</url>
      <icon>linkedin</icon>
    </social>
  </contact>

  <work>
    <company>Company Name</company>
    <title>Job Title</title>
    <badges>Remote</badges>
    <badges>Django</badges>
    <start>01/2024</start>
    <end>Present</end>
    <highlights>Achievement 1</highlights>
    <highlights>Achievement 2</highlights>
  </work>

  <education>
    <school>University Name</school>
    <degree>BS Computer Science - 3.8/4.0</degree>
    <start>08/2020</start>
    <end>05/2024</end>
  </education>

  <skills>Python</skills>
  <skills>JavaScript</skills>
  <skills>TypeScript</skills>

  <projects>
    <title>Project Name</title>
    <description>Project description...</description>
    <techStack>Python</techStack>
    <techStack>Django</techStack>
    <url>https://github.com/username/project</url>
  </projects>
</resume>`}</code></pre>
			</details>
		</div>

		<a href="/resume" class="back-link">← Back to Default Resume</a>
	</div>
</main>

<style>
	.error-page {
		min-height: 100vh;
		background: #ffffff;
		padding: 3rem 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.error-content {
		max-width: 48rem;
		width: 100%;
	}

	.error-title {
		font-size: 4rem;
		font-weight: 800;
		color: #dc2626;
		margin: 0 0 1rem 0;
	}

	.error-message {
		font-size: 1.5rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0 0 1.5rem 0;
	}

	.error-details {
		background: #fef2f2;
		border-left: 4px solid #dc2626;
		padding: 1rem 1.5rem;
		margin-bottom: 2rem;
		border-radius: 0.25rem;
	}

	.error-details h3 {
		font-size: 1rem;
		font-weight: 600;
		color: #991b1b;
		margin: 0 0 0.5rem 0;
	}

	.error-details p {
		font-family: var(--resume-font-mono, monospace);
		font-size: 0.875rem;
		color: #7f1d1d;
		margin: 0;
		line-height: 1.6;
		word-wrap: break-word;
	}

	.error-help {
		background: #f9fafb;
		border: 1px solid #e5e7eb;
		padding: 1.5rem;
		border-radius: 0.5rem;
		margin-bottom: 2rem;
	}

	.error-help h3 {
		font-size: 1.125rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0 0 1rem 0;
	}

	.error-help ol {
		margin: 0 0 1rem 0;
		padding-left: 1.5rem;
		color: #4b5563;
	}

	.error-help li {
		margin-bottom: 0.5rem;
		line-height: 1.6;
	}

	.error-help code {
		background: #1f2937;
		color: #f9fafb;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-family: var(--resume-font-mono, monospace);
		font-size: 0.875rem;
		word-break: break-all;
	}

	.schema-info {
		margin-top: 1rem;
	}

	.schema-info summary {
		cursor: pointer;
		font-weight: 600;
		color: #374151;
		padding: 0.5rem;
		background: #e5e7eb;
		border-radius: 0.25rem;
		user-select: none;
	}

	.schema-info summary:hover {
		background: #d1d5db;
	}

	.schema-info pre {
		background: #1f2937;
		color: #f9fafb;
		padding: 1rem;
		border-radius: 0.25rem;
		overflow-x: auto;
		margin-top: 0.5rem;
	}

	.schema-info code {
		font-family: var(--resume-font-mono, monospace);
		font-size: 0.875rem;
		line-height: 1.6;
		background: transparent;
		padding: 0;
	}

	.back-link {
		display: inline-block;
		color: #2563eb;
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s;
	}

	.back-link:hover {
		color: #1d4ed8;
		text-decoration: underline;
	}
</style>
