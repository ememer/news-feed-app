import { useEffect, useState } from 'react';

import { layoutTheme } from '../shared/theme/LayoutTheme';
import { TempData } from '../shared/utils/tempData';
// import { ResponseArray } from '../types/NewsFeedArticleType';
import NewsFeedCard from './NewsFeedCard';

const NewsFeed = () => {
  // const [response, setResponse] = useState<ResponseArray>(TempData);
  const [response, setResponse] = useState(TempData);
  const theme = layoutTheme[0];

  // const TOKEN = 'apiKey=dcfea20b502345c6be30e1d013d3d7b3';
  // const URL = 'https://newsapi.org/v2/everything?' + 'q=Sport&' + TOKEN;
  // const request: Request = new Request(URL);

  // const news = async (): Promise<ResponseArray> => {
  //   const resp = await fetch(request);

  //   if (!resp.ok) {
  //     const message = `Error exist ${resp.status}`;
  //     throw new Error(message);
  //   }

  //   const articlesResponse = await resp.json();
  //   setResponse(articlesResponse);
  //   return articlesResponse;
  // };

  // console.log(TempData);

  // useEffect(() => {
  //   news().catch((err) => err.message);
  // }, []);

  return (
    <div className="grid gap-10 ml-auto mt-20 p-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full scroll-smooth scroll-m-10 lg:w-10/12">
      {response?.articles.map((article, idx) => (
        <NewsFeedCard key={`${article.title}+${idx}`} article={article} theme={theme} />
      ))}
    </div>
  );
};

export default NewsFeed;
