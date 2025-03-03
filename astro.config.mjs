// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
    integrations: [svelte()],
    vite: {
        plugins: [tailwindcss()],
        build: {
            assetsInlineLimit: 0,
        },
    },
    site: 'https://DjonniStorm.github.io',
    base: '/weather-todo',
    output: 'static',
    trailingSlash: 'always',
});
