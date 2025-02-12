// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";


import sitemap from "@astrojs/sitemap";


// https://astro.build/config
export default defineConfig({
  site: 'https://athar-org-v2.pages.dev',
  vite: {
      plugins: [
        tailwindcss()
      ],
    },
    i18n: {
      locales: ["ar","en"],
      defaultLocale: "ar",
    },
  integrations: [
    sitemap(
    {
      i18n: {
        defaultLocale: 'ar', // All urls that don't contain `es` or `fr` after `https://stargazers.club/` will be treated as default locale, i.e. `en`
        locales: {
          ar: 'ar-SA',
          en: 'en-US',
        }
      }
    }
  )],
});