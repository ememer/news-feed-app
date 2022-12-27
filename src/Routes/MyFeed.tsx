import { faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useContext, useState } from 'react';

import FeedPopUp from '../components/FeedPopup';
import LayoutPopUp from '../components/LayoutPopUp';
import NewsFeedCard from '../components/NewsFeedCard';
import PreferenceMenu from '../components/PreferenceMenu';
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
  const [preferenceMenu, setPreferenceMenu] = useState(false);
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
      {preferenceMenu && (
        <LayoutPopUp className="flex flex-col lg:flex-row " onClose={setPreferenceMenu}>
          <PreferenceMenu />
        </LayoutPopUp>
      )}
      <div className="my-10 flex min-h-10-s flex-col items-center p-6 lg:flex-row">
        <button
          onClick={() => setPreferenceMenu(true)}
          className={clsx(
            'flex items-center rounded-2xl py-4 px-6 font-bold hover:bg-prussian-blue-800',
            theme.mainText,
          )}
        >
          My feed <FontAwesomeIcon className="ml-4 text-xl" icon={faBarsProgress} />
        </button>
        {isHintShouldOpen && (
          <div className="-ml-4 -mt-2 flex flex-col items-center justify-start lg:flex-row">
            <span
              className={clsx(
                'block h-2 w-2 rounded-full border',
                theme.borderP,
                theme.elementsBgP,
              )}
            />
            <span
              className={clsx('block h-6 w-0.5 lg:h-0.5 lg:w-6', theme.elementsBgP)}
            />
            <div
              className={clsx(
                'flex w-4/6 items-start rounded-xl border py-2 px-4',
                theme.borderP,
                theme.mainText,
              )}
            >
              <span className="text-sm">Edit your personal feed preferences here</span>
              <div className="w-2/12">
                <button
                  className={clsx('text-2xl font-bold', theme.textP)}
                  onClick={() => setIsHintShouldOpen}
                >
                  x
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
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

export default MyFeed;
