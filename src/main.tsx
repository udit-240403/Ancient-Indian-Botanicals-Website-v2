import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {injectSpeedInsights} from '@vercel/speed-insights';
import App from './App.tsx';
import './index.css';

// Cookieless aggregate traffic reporting appears in the owner's Vercel dashboard
// once Web Analytics is enabled for the production project.
if (!['localhost', '127.0.0.1'].includes(window.location.hostname)) {
  const analytics = document.createElement('script');
  analytics.defer = true;
  analytics.src = '/_vercel/insights/script.js';
  document.head.appendChild(analytics);
}

// Vercel Speed Insights - tracks real user performance metrics
injectSpeedInsights();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
