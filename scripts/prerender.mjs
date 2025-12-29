import { renderToString } from 'react-dom/server'
import { createElement, StrictMode } from 'react'
import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { build } from 'esbuild'
import { randomUUID } from 'crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function prerender() {
  const tempFile = resolve(__dirname, `../.temp-prerender-${randomUUID()}.mjs`)
  const aosMockFile = resolve(__dirname, `../.temp-aos-mock-${randomUUID()}.mjs`)
  
  try {
    // Create a mock for AOS (client-side only library)
    writeFileSync(aosMockFile, `export default { init: () => {} };`, 'utf-8')
    
    // Transpile and bundle the App component using esbuild
    await build({
      entryPoints: [resolve(__dirname, '../src/App.jsx')],
      bundle: true,
      format: 'esm',
      jsx: 'automatic',
      platform: 'node',
      target: 'node18',
      outfile: tempFile,
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
      plugins: [{
        name: 'aos-mock',
        setup(build) {
          // Intercept 'aos' module imports (but not CSS)
          build.onResolve({ filter: /^aos$/ }, () => {
            return { path: aosMockFile, namespace: 'file' }
          })
        }
      }],
      loader: {
        '.css': 'empty',
      },
      define: {
        'process.env.NODE_ENV': '"production"',
      },
    })

    // Import the transpiled module
    const moduleUrl = `file://${tempFile}`
    const module = await import(moduleUrl)
    const App = module.default || module

    // Render the app to HTML string
    const html = renderToString(
      createElement(StrictMode, null, createElement(App))
    )

    // Clean up temp files
    unlinkSync(tempFile)
    unlinkSync(aosMockFile)

    // Read the template HTML from dist
    const templatePath = resolve(__dirname, '../dist/index.html')
    if (!existsSync(templatePath)) {
      console.error('❌ Build output not found. Please run "vite build" first.')
      process.exit(1)
    }

    const template = readFileSync(templatePath, 'utf-8')

    // Inject the rendered HTML into the template
    const result_html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    )

    // Write the result back
    writeFileSync(templatePath, result_html, 'utf-8')

    console.log('✅ Pre-rendered HTML successfully')
  } catch (error) {
    // Clean up temp files on error
    for (const file of [tempFile, aosMockFile]) {
      if (existsSync(file)) {
        try {
          unlinkSync(file)
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    }
    console.error('❌ Pre-render failed:', error)
    process.exit(1)
  }
}

prerender()
