import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(circle at center top, var(--tw-gradient-stops))'
			}
		}
	},
	darkMode: 'class',

	plugins: [typography, forms, containerQueries]
} satisfies Config;
