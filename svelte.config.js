import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
const dev = process.argv.includes('dev');
/** @type {import('@sveltejs/kit').Config} */

const config = {
	preprocess: vitePreprocess({ script: true }),

	kit: {
		adapter: adapter({
			fallback: '404.html',
			pages: 'build',
			assets: 'build',
			precompress: false,
			strict: true
		}),
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		}
	}
};

export default config;
