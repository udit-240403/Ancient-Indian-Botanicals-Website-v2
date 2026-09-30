import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Analytics} from '@vercel/analytics/react';
import App from './App.tsx';
import {BuyerLanguageProvider} from './context/BuyerLanguageContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BuyerLanguageProvider>
      <App />
      <Analytics />
    </BuyerLanguageProvider>
  </StrictMode>,
);
