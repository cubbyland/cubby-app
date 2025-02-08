import { createBrowserRouter } from 'react-router-dom';
import AppContainer from '../containers/AppContainer';
import VideosPage from '../containers/VideosPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppContainer />,
    children: [
      {
        path: '/videos',
        element: <VideosPage />
      }
    ]
  }
]);
