import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { VideoProvider } from './contexts/VideoContext';
import AppContainer from './containers/AppContainer';
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HelmetProvider } from 'react-helmet-async';

if (import.meta.hot) {
  window.addEventListener('beforeunload', () => {
    window.__is_being_hot_reloaded__ = true;
  });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => registration.unregister());
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <VideoProvider>
          <AppContainer />
        </VideoProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);