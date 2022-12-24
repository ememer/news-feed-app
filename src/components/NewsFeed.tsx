import { useState } from 'react';

import { layoutTheme } from '../shared/theme/LayoutTheme';
import { TempData } from '../shared/utils/tempData';
import { ArticleResponse, ResponseArray } from '../types/NewsFeedArticleType';
import FeedPopUp from './FeedPopup';
import NewsFeedCard from './NewsFeedCard';

const DEF_ARTICLE: ArticleResponse = {
  author: '',
  content: '',
  publishedAt: '',
  source: {
    id: '',
    name: '',
  },
  title: '',
  url: '',
  urlToImage: '',
};

const NewsFeed = () => {
  // const [response, setResponse] = useState<ResponseArray>(TempData);
  const [response] = useState<ResponseArray>(TempData);
  const [clickedNews, setClickedNews] = useState({
    isPopUpOpen: false,
    articleId: DEF_ARTICLE,
    currentVotes: 0,
    comments: 0,
  });
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

  //

  const selectNewsHandler = (idx: number, votes: number, comments: number) => {
    const matchArticle = response.articles.find((e, index) => index === idx);

    if (matchArticle && Object.keys(matchArticle).length !== 0) {
      setClickedNews(() => ({
        isPopUpOpen: true,
        articleId: matchArticle,
        currentVotes: votes,
        comments: comments,
      }));
      return;
    }
    setClickedNews(() => ({
      isPopUpOpen: true,
      articleId: DEF_ARTICLE,
      currentVotes: votes,
      comments: comments,
    }));
  };

  return (
    <div className="ml-auto mt-20 grid w-full scroll-m-10 grid-cols-1 gap-10 scroll-smooth p-10 md:grid-cols-2 lg:w-10/12 xl:grid-cols-3">
      {clickedNews.isPopUpOpen && (
        <FeedPopUp
          onClose={setClickedNews}
          selectedArticle={clickedNews.articleId}
          votes={clickedNews.currentVotes}
          comments={clickedNews.comments}
        />
      )}
      {response?.articles.map((article, idx) => (
        <NewsFeedCard
          index={idx}
          onClick={selectNewsHandler}
          key={`${article.title}+${idx}`}
          article={article}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default NewsFeed;
