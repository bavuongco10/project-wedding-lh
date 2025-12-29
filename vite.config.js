import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 75,
      },
      jpg: {
        quality: 75,
      },
      webp: {
        quality: 80,
      },
      avif: {
        quality: 70,
      },
      svg: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
          {
            name: 'sortAttrs',
            active: true,
          },
        ],
      },
    }),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        // Use Vercel URL if available, otherwise use VITE_SITE_URL or default
        const vercelUrl = process.env.VERCEL_URL 
          ? `https://${process.env.VERCEL_URL}`
          : null
        const siteUrl = process.env.VITE_SITE_URL || vercelUrl || 'https://project-wedding-lh.vercel.app'
        return html.replace(/__SITE_URL__/g, siteUrl)
      },
    },
  ],
})
