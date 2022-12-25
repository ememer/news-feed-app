import { faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useContext, useState } from 'react';

import FeedPopUp from '../components/FeedPopup';
import NewsFeedCard from '../components/NewsFeedCard';
import { NewsFeedContext } from '../context/NewsFeedContext';
import { layoutTheme } from '../shared/theme/LayoutTheme';
import { TempData } from '../shared/utils/tempData';
import { ArticleResponse, ResponseArray } from '../types/NewsFeedArticleType';
import { NewsFeedContextTypes } from '../types/NewsFeedProvider';

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

const MyFeed = () => {
  const { fillComponentData } = useContext(NewsFeedContext) as NewsFeedContextTypes;
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);
  const [isHintShouldOpen, setIsHintShouldOpen] = useState(true);
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
    <div className="ml-auto mt-20 grid w-full scroll-m-10 grid-cols-1 gap-10 scroll-smooth p-10 lg:w-10/12">
      <div className="relative my-10 flex min-h-10-s items-center p-6">
        <button
          className={clsx(
            'flex items-center rounded-2xl py-4 px-6 font-bold hover:bg-prussian-blue-800',
            theme.mainText,
          )}
        >
          My feed <FontAwesomeIcon className="ml-4 text-xl" icon={faBarsProgress} />
        </button>
        {isHintShouldOpen && (
          <div className=" -ml-4 flex items-center justify-start">
            <span className="block h-2 w-2 rounded-full  border border-hot-ping-500 bg-hot-ping-500" />
            <span className="block h-0.5 w-6 bg-hot-ping-500" />
            <div
              className={clsx(
                'flex w-4/6 items-start rounded-xl border border-hot-ping-500 py-2 px-4',

                theme.mainText,
              )}
            >
              <span className="text-sm">Edit your personal feed preferences here</span>
              <button
                onClick={() => setIsHintShouldOpen(false)}
                className="w-10 text-2xl text-hot-ping-500"
              >
                x
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
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
    </div>
  );
};

export default MyFeed;
