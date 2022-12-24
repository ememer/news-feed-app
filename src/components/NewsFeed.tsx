import { useContext, useState } from 'react';

import { NewsFeedContext } from '../context/NewsFeedContext';
import { layoutTheme } from '../shared/theme/LayoutTheme';
import { TempData } from '../shared/utils/tempData';
import { ArticleResponse, ResponseArray } from '../types/NewsFeedArticleType';
import { NewsFeedContextTypes } from '../types/NewsFeedProvider';
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
  const { fillComponentData } = useContext(NewsFeedContext) as NewsFeedContextTypes;
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);
  // const [response, setResponse] = useState<ResponseArray>(TempData);
  const [response] = useState<ResponseArray>(TempData);
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

  // useEffect(() => {
  //   news().catch((err) => err.message);
  // }, []);

  //

  const openAndUpdatePopup = () => {
    const matchArticle = response.articles.find(
      (e, idx) => idx === fillComponentData.componentId,
    );
    if (matchArticle && Object.keys(matchArticle).length !== 0) {
      return matchArticle;
    }
    return DEF_ARTICLE;
  };

  return (
    <div className="ml-auto mt-20 grid w-full scroll-m-10 grid-cols-1 gap-10 scroll-smooth p-10 md:grid-cols-2 lg:w-10/12 xl:grid-cols-3">
      {isPopUpOpen && (
        <FeedPopUp onClose={setIsPopUpOpen} selectedArticle={openAndUpdatePopup()} />
      )}
      {response?.articles.map((article, idx) => (
        <NewsFeedCard
          index={idx}
          onClick={setIsPopUpOpen}
          key={`${article.title}+${idx}`}
          article={article}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default NewsFeed;
