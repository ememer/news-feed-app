import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';

import FeedPopUp from '../components/FeedPopup';
import LayoutPopUp from '../components/LayoutPopUp';
import NewsFeedCard from '../components/NewsFeedCard';
import { NewsFeedContext } from '../context/NewsFeedContext';
import { UserPreferencesContext } from '../context/UserPreferencesContext';
import { useApiRequest } from '../hook/useApiRequest';
import { layoutTheme } from '../shared/theme/LayoutTheme';
import { ArticleResponse, ResponseArray } from '../types/NewsFeedArticleType';
import { NewsFeedContextTypes } from '../types/NewsFeedProvider';
import { UserPreferencesContextTypes } from '../types/UserPreferContext';

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

const Discussion = () => {
  const { fillComponentData } = useContext(NewsFeedContext) as NewsFeedContextTypes;
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);
  const [response, setResponse] = useState<ResponseArray>();
  const theme = layoutTheme[0];
  const { userSettings } = useContext(
    UserPreferencesContext,
  ) as UserPreferencesContextTypes;
  const { userPreferencesStringUrl, datePeriod } = useApiRequest();

  const TOKEN = 'apiKey=dcfea20b502345c6be30e1d013d3d7b3';
  const URL =
    'https://newsapi.org/v2/everything?' +
    userPreferencesStringUrl +
    datePeriod +
    'sortBy=popularity&' +
    TOKEN;
  const request: Request = new Request(URL);

  const news = async (): Promise<ResponseArray> => {
    const resp = await fetch(request);

    if (!resp.ok) {
      const message = `Error exist ${resp.status}`;
      throw new Error(message);
    }

    const articlesResponse = await resp.json();

    return articlesResponse;
  };

  useEffect(() => {
    news()
      .then((resp) => setResponse(resp))
      .catch((err) => err.message);
  }, [userPreferencesStringUrl]);

  const openAndUpdatePopup = () => {
    const matchArticle = response?.articles.find(
      (e, idx) => idx === fillComponentData.componentId,
    );
    if (matchArticle && Object.keys(matchArticle).length !== 0) {
      return matchArticle;
    }
    return DEF_ARTICLE;
  };

  return (
    <div className="ml-auto mt-20 grid w-full scroll-m-10 grid-cols-1 gap-10 scroll-smooth p-4 lg:w-9/12 lg:p-10 xl:w-10/12">
      <div
        className={clsx('grid w-full grid-cols-1', {
          'gap-2 p-2 md:grid-cols-2 xl:grid-cols-4': userSettings.layoutType === 'eco',
          'gap-10 p-4 md:grid-cols-2 md:gap-6 md:p-16 lg:p-20 xl:grid-cols-3':
            userSettings.layoutType === 'roomy',
          'md:gap-15 gap-20 md:grid-cols-2 lg:p-10 xl:grid-cols-3':
            userSettings.layoutType === 'cozy',
        })}
      >
        {isPopUpOpen && (
          <LayoutPopUp className="flex flex-col lg:flex-row" onClose={setIsPopUpOpen}>
            <FeedPopUp onClose={setIsPopUpOpen} selectedArticle={openAndUpdatePopup()} />
          </LayoutPopUp>
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
    </div>
  );
};

export default Discussion;
