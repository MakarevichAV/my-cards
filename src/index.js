import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import App from './App';
import './index.css';

const store = configureStore();

const root = createRoot(document.getElementById('root'));

// Регистрация service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    }, error => {
      console.log('Service Worker registration failed:', error);
    });
  });
}

root.render(
  <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </Provider>
);