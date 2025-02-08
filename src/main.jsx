import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { VideoProvider } from './contexts/VideoContext';
import AppContainer from './containers/AppContainer';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <VideoProvider>
        <AppContainer />
      </VideoProvider>
    </BrowserRouter>
  </React.StrictMode>
);