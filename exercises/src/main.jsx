import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import App from './Exercise12.jsx'
import './Exercise1.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App list={['Edit', 'Delete', 'View', 'Update']} />
  </StrictMode>,
)
