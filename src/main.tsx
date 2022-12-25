import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import MyFeed from './Routes/MyFeed';

const router = createBrowserRouter([
  {
    path: '/news-feeder/',
    element: <App />,
    children: [
      {
        index: true,
        element: <MyFeed />,
      },
      {
        path: '/news-feeder/popular',
        element: <MyFeed />,
      },
      {
        path: '/news-feeder/upvoted',
        element: <MyFeed />,
      },
      {
        path: '/news-feeder/discussion',
        element: <MyFeed />,
      },
      {
        path: '/news-feeder/search',
        element: <MyFeed />,
      },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root'),
);
