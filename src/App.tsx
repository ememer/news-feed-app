import { Outlet } from 'react-router-dom';

import Layout from './components/Layout';
// import NewsFeed from './components/NewsFeed';
import NewsFeedContextProvider from './context/NewsFeedContextProvider';
import UserPreferencesContextProvider from './context/UserPreferencesContextProvider';

function App() {
  return (
    <UserPreferencesContextProvider>
      <Layout>
        <NewsFeedContextProvider>
          <Outlet />
        </NewsFeedContextProvider>
      </Layout>
    </UserPreferencesContextProvider>
  );
}

export default App;
