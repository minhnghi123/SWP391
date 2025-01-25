import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '../lib/App'
import { BrowserRouter as Router } from "react-router-dom";
import {VaccineProvider} from '../components/Context/ChildrenSelected'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VaccineProvider>
      <Router>
        <App />
      </Router>
    </VaccineProvider>
  </StrictMode>,
)
