import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Navigation } from './components/Navigation.tsx';
import { Footer } from './components/Footer.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <App />
    
  </StrictMode>
);
