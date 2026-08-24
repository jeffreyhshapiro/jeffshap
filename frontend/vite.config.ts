import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { SITE } from './src/data/seo'

/**
 * Renders the meta tags into index.html from SITE, so the served markup
 * carries them without waiting on JS. Placeholders in index.html are
 * written as %SEO_*% and replaced here.
 */
function seoMeta(): Plugin {
  return {
    name: 'seo-meta',
    transformIndexHtml(html) {
      return html
        .replace(/%SEO_TITLE%/g, escapeHtml(SITE.title))
        .replace(/%SEO_DESCRIPTION%/g, escapeHtml(SITE.description))
        .replace(/%SEO_NAME%/g, escapeHtml(SITE.name))
        .replace(/%SEO_URL%/g, escapeHtml(SITE.url))
        .replace(/%SEO_THEME_COLOR%/g, escapeHtml(SITE.themeColor))
    },
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoMeta()],
})
