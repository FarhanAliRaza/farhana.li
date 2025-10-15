import { describe, it, expect } from 'vitest';
import { ResumeDataSchema } from '../schema';
import { parseResumeXML } from '../xml-parser';

describe('XML Resume Parsing', () => {
	it('should parse minimal XML without optional fields', () => {
		const minimalXML = `<?xml version="1.0" encoding="UTF-8"?>
<resume>
  <name>John Doe</name>
  <initials>JD</initials>
  <location>San Francisco, CA</location>
  <locationLink>https://maps.google.com</locationLink>
  <tagline>Software Engineer</tagline>
  <about>Test about section</about>
  <avatarUrl>https://avatars.githubusercontent.com/u/1</avatarUrl>
  <contact>
    <email>test@example.com</email>
  </contact>
  <work>
    <company>Test Company</company>
    <title>Test Title</title>
    <start>01/2024</start>
    <end>Present</end>
    <highlights>Test highlight</highlights>
  </work>
  <education>
    <school>Test School</school>
    <degree>Test Degree</degree>
    <start>01/2020</start>
    <end>01/2024</end>
  </education>
  <skills>Python</skills>
  <skills>JavaScript</skills>
  <projects>
    <title>Test Project</title>
    <description>Test description</description>
    <techStack>Python</techStack>
  </projects>
</resume>`;

		const parsed = parseResumeXML(minimalXML);
		console.log('Minimal parsed:', JSON.stringify(parsed, null, 2));

		// Should not throw
		const validated = ResumeDataSchema.parse(parsed);

		expect(validated.name).toBe('John Doe');
		expect(validated.initials).toBe('JD');
		expect(validated.contact.email).toBe('test@example.com');
		expect(validated.skills).toHaveLength(2);
		expect(validated.work).toHaveLength(1);
		expect(validated.education).toHaveLength(1);
		expect(validated.projects).toHaveLength(1);
	});

	it('should parse full XML with all optional fields', () => {
		const fullXML = `<?xml version="1.0" encoding="UTF-8"?>
<resume>
  <name>John Doe</name>
  <initials>JD</initials>
  <location>San Francisco, CA | GMT-8</location>
  <locationLink>https://maps.google.com/?q=San+Francisco,CA</locationLink>
  <tagline>Software Engineer | Open Source Contributor</tagline>
  <about>Experienced software engineer with 3+ years building scalable web applications.</about>
  <avatarUrl>https://avatars.githubusercontent.com/u/1?v=4</avatarUrl>
  <contact>
    <email>john.doe@example.com</email>
    <personalWebsiteUrl>https://johndoe.com</personalWebsiteUrl>
    <tel>+14155551234</tel>
    <social>
      <name>GitHub</name>
      <url>https://github.com/johndoe</url>
      <icon>github</icon>
    </social>
    <social>
      <name>LinkedIn</name>
      <url>https://linkedin.com/in/johndoe</url>
      <icon>linkedin</icon>
    </social>
  </contact>
  <work>
    <company>Tech Startup Inc</company>
    <title>Senior Software Engineer</title>
    <badges>Remote</badges>
    <badges>TypeScript</badges>
    <start>01/2022</start>
    <end>Present</end>
    <highlights>Led development of microservices</highlights>
    <highlights>Reduced API response time by 60%</highlights>
  </work>
  <education>
    <school>University of California</school>
    <degree>BS Computer Science - 3.8/4.0</degree>
    <start>08/2016</start>
    <end>05/2020</end>
  </education>
  <skills>TypeScript</skills>
  <skills>JavaScript</skills>
  <skills>React</skills>
  <projects>
    <title>awesome-framework</title>
    <description>A modern web framework</description>
    <techStack>TypeScript</techStack>
    <techStack>Node.js</techStack>
    <url>https://github.com/johndoe/awesome-framework</url>
  </projects>
</resume>`;

		const parsed = parseResumeXML(fullXML);
		console.log('Full parsed:', JSON.stringify(parsed, null, 2));

		const validated = ResumeDataSchema.parse(parsed);

		expect(validated.name).toBe('John Doe');
		expect(validated.contact.tel).toBe('+14155551234');
		expect(validated.contact.personalWebsiteUrl).toBe('https://johndoe.com');
		expect(validated.contact.social).toHaveLength(2);
		expect(validated.work[0].badges).toHaveLength(2);
		expect(validated.work[0].highlights).toHaveLength(2);
		expect(validated.projects[0].url).toBe('https://github.com/johndoe/awesome-framework');
	});

	it('should handle arrays correctly', () => {
		const xmlWithArrays = `<?xml version="1.0" encoding="UTF-8"?>
<resume>
  <name>Test</name>
  <initials>T</initials>
  <location>Test</location>
  <locationLink>https://test.com</locationLink>
  <tagline>Test</tagline>
  <about>Test</about>
  <avatarUrl>https://test.com/avatar.jpg</avatarUrl>
  <contact>
    <email>test@test.com</email>
  </contact>
  <work>
    <company>Company1</company>
    <title>Title1</title>
    <start>01/2024</start>
    <end>Present</end>
    <highlights>Highlight1</highlights>
    <highlights>Highlight2</highlights>
    <highlights>Highlight3</highlights>
  </work>
  <work>
    <company>Company2</company>
    <title>Title2</title>
    <start>01/2023</start>
    <end>12/2023</end>
    <highlights>Highlight4</highlights>
  </work>
  <education>
    <school>School</school>
    <degree>Degree</degree>
    <start>01/2020</start>
    <end>01/2024</end>
  </education>
  <skills>Skill1</skills>
  <skills>Skill2</skills>
  <skills>Skill3</skills>
  <skills>Skill4</skills>
  <projects>
    <title>Project</title>
    <description>Description</description>
    <techStack>Tech1</techStack>
    <techStack>Tech2</techStack>
  </projects>
</resume>`;

		const parsed = parseResumeXML(xmlWithArrays);
		const validated = ResumeDataSchema.parse(parsed);

		expect(validated.work).toHaveLength(2);
		expect(validated.work[0].highlights).toHaveLength(3);
		expect(validated.work[1].highlights).toHaveLength(1);
		expect(validated.skills).toHaveLength(4);
		expect(validated.projects[0].techStack).toHaveLength(2);
	});

	it('should handle URL encoding and decoding', () => {
		const originalXML = `<?xml version="1.0" encoding="UTF-8"?>
<resume>
  <name>Test &amp; Special &lt; &gt; "Chars"</name>
  <initials>TS</initials>
  <location>Test Location</location>
  <locationLink>https://test.com</locationLink>
  <tagline>Test</tagline>
  <about>Test</about>
  <avatarUrl>https://test.com/avatar.jpg</avatarUrl>
  <contact>
    <email>test@test.com</email>
  </contact>
  <work>
    <company>Test</company>
    <title>Test</title>
    <start>01/2024</start>
    <end>Present</end>
    <highlights>Test</highlights>
  </work>
  <education>
    <school>Test</school>
    <degree>Test</degree>
    <start>01/2020</start>
    <end>01/2024</end>
  </education>
  <skills>Test</skills>
  <projects>
    <title>Test</title>
    <description>Test</description>
    <techStack>Test</techStack>
  </projects>
</resume>`;

		const encoded = encodeURIComponent(originalXML);
		const decoded = decodeURIComponent(encoded);

		expect(decoded).toBe(originalXML);

		const parsed = parseResumeXML(decoded);
		const validated = ResumeDataSchema.parse(parsed);

		expect(validated.name).toBe('Test & Special < > "Chars"');
	});

	it('should throw error for missing required fields', () => {
		const invalidXML = `<?xml version="1.0" encoding="UTF-8"?>
<resume>
  <name>Test</name>
</resume>`;

		const parsed = parseResumeXML(invalidXML);

		expect(() => ResumeDataSchema.parse(parsed)).toThrow();
	});

	it('should throw error for invalid URL', () => {
		const invalidUrlXML = `<?xml version="1.0" encoding="UTF-8"?>
<resume>
  <name>Test</name>
  <initials>T</initials>
  <location>Test</location>
  <locationLink>not-a-valid-url</locationLink>
  <tagline>Test</tagline>
  <about>Test</about>
  <avatarUrl>https://test.com/avatar.jpg</avatarUrl>
  <contact>
    <email>test@test.com</email>
  </contact>
  <work>
    <company>Test</company>
    <title>Test</title>
    <start>01/2024</start>
    <end>Present</end>
    <highlights>Test</highlights>
  </work>
  <education>
    <school>Test</school>
    <degree>Test</degree>
    <start>01/2020</start>
    <end>01/2024</end>
  </education>
  <skills>Test</skills>
  <projects>
    <title>Test</title>
    <description>Test</description>
    <techStack>Test</techStack>
  </projects>
</resume>`;

		const parsed = parseResumeXML(invalidUrlXML);

		expect(() => ResumeDataSchema.parse(parsed)).toThrow();
	});
});