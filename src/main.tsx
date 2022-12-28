import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Discussion from './Routes/Discussion';
import MyFeed from './Routes/MyFeed';
import Popular from './Routes/Popular';
import Search from './Routes/Search';
import Upvoted from './Routes/Upvoted';

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
        element: <Popular />,
      },
      {
        path: '/news-feeder/upvoted',
        element: <Upvoted />,
      },
      {
        path: '/news-feeder/discussion',
        element: <Discussion />,
      },
      {
        path: '/news-feeder/search',
        element: <Search />,
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
