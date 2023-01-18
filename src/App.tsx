import { Suspense } from 'react';

import { HelmetProvider } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

import Layout from './components/Layout';
import NewsFeedContextProvider from './context/NewsFeedContextProvider';
import UserPreferencesContextProvider from './context/UserPreferencesContextProvider';

function App() {
  return (
    <Suspense fallback="loading">
      <HelmetProvider>
        <UserPreferencesContextProvider>
          <Layout>
            <NewsFeedContextProvider>
              <Outlet />
            </NewsFeedContextProvider>
          </Layout>
        </UserPreferencesContextProvider>
      </HelmetProvider>
    </Suspense>
  );
}

export default App;
