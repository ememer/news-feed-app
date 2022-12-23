import React from 'react';

import { layoutTheme } from '../shared/theme/LayoutTheme';
import NewsFeedCard from './NewsFeedCard';

const NewsFeed = () => {
  const theme = layoutTheme[0];

  return (
    <div className="grid gap-10 ml-auto mt-20 p-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full scroll-smooth scroll-m-10 lg:w-10/12">
      <NewsFeedCard theme={theme} />
      <NewsFeedCard theme={theme} />
      <NewsFeedCard theme={theme} />
      <NewsFeedCard theme={theme} />
      <NewsFeedCard theme={theme} />
      <NewsFeedCard theme={theme} />
      <NewsFeedCard theme={theme} />
      <NewsFeedCard theme={theme} />
      <NewsFeedCard theme={theme} />
      <NewsFeedCard theme={theme} />
      <NewsFeedCard theme={theme} />
    </div>
  );
};

export default NewsFeed;
