import Layout from './components/Layout';
import NewsFeed from './components/NewsFeed';
import NewsFeedContextProvider from './context/NewsFeedContextProvider';

function App() {
  return (
    <Layout>
      <NewsFeedContextProvider>
        <NewsFeed />
      </NewsFeedContextProvider>
    </Layout>
  );
}

export default App;
