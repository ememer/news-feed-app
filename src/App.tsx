import { Outlet } from 'react-router-dom';

import Layout from './components/Layout';
// import NewsFeed from './components/NewsFeed';
import NewsFeedContextProvider from './context/NewsFeedContextProvider';

function App() {
  return (
    <Layout>
      <NewsFeedContextProvider>
        <Outlet />
      </NewsFeedContextProvider>
    </Layout>
  );
}

export default App;
