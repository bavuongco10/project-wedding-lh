import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Use hydrateRoot for SSG (hydration instead of render)
const rootElement = document.getElementById('root')

if (rootElement) {
  hydrateRoot(
    rootElement,
    <StrictMode>
      <App />
    </StrictMode>
  )
}
