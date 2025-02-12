// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL,

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

  adapter: node({
    mode: "standalone",
  }),
});