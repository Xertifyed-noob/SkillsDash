import React from 'react';
import { createRoot }from 'react-dom/client';
import './index.css';
import App from './App';
import './visualsConfig'; // Register Chart.js components globally

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

