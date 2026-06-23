import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'  // Tailwind
import 'antd/dist/reset.css';
import { BrowserRouter } from 'react-router-dom';

// Router basename = the build's base path (set in vite.config) so the app works
// mounted under /strandhoots/magnetism-crit-c/.
const basename = import.meta.env.BASE_URL.replace(/\/+$/, '');

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('No root element found')

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
