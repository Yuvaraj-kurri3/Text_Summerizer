import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {reportWebVitals} from './reportWebVitals.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
reportWebVitals((metric) => {
  console.log("Web Vital:", metric);

  // Later we can send to backend or analytics
  // fetch("/api/metrics", { method: "POST", body: JSON.stringify(metric) })
});