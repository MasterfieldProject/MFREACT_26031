import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import App from './Exercise2.jsx'
import './Exercise1.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App title="Személyi adatok" />
  </StrictMode>,
)
