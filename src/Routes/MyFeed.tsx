import { useContext, useEffect, useState } from 'react';

import { faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import FeedPopUp from '../components/FeedPopup';
import LayoutPopUp from '../components/LayoutPopUp';
import NewsFeedCard from '../components/NewsFeedCard';
import PreferenceMenu from '../components/PreferenceMenu';
import { NewsFeedContext } from '../context/NewsFeedContext';
import { UserPreferencesContext } from '../context/UserPreferencesContext';
import { useApiRequest } from '../hook/useApiRequest';
import { layoutTheme } from '../shared/theme/LayoutTheme';
import { RequestParams, ResponseArray } from '../types/NewsFeedArticleType';
import { NewsFeedContextTypes } from '../types/NewsFeedProvider';
import { UserPreferencesContextTypes } from '../types/UserPreferContext';

const API_PARAMS = { preferences: 'top-headlines?', country: 'pl' } as RequestParams;

const MyFeed = () => {
  const { fillComponentData } = useContext(NewsFeedContext) as NewsFeedContextTypes;
  const [preferenceMenu, setPreferenceMenu] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);
  const [response, setResponse] = useState<ResponseArray>();
  const theme = layoutTheme[0];
  const { userSettings, setUserSettings } = useContext(
    UserPreferencesContext,
  ) as UserPreferencesContextTypes;
  const { userPreferencesStringUrl, DEF_ARTICLE, news } = useApiRequest();

  useEffect(() => {
    window.addEventListener('online', () =>
      news({ ...API_PARAMS, userPreferencesTags: userPreferencesStringUrl })
        .then((resp) => setResponse(resp))
        .catch((err) => err.message),
    );

    news({
      ...API_PARAMS,
      userPreferencesTags: userPreferencesStringUrl,
    })
      .then((resp) => setResponse(resp))
      .catch((err) => console.warn(err));

    return () => window.removeEventListener('online', () => news);
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
      {preferenceMenu && (
        <LayoutPopUp className="flex flex-col lg:flex-row " onClose={setPreferenceMenu}>
          <PreferenceMenu />
        </LayoutPopUp>
      )}
      <div className="my-10 flex min-h-10-s flex-col items-center p-6 lg:flex-row">
        <button
          title="Open my feed setting"
          onClick={() => setPreferenceMenu(true)}
          className={clsx(
            'flex items-center rounded-2xl py-4 px-6 font-bold hover:bg-prussian-blue-800',
            theme.mainText,
          )}
        >
          My feed <FontAwesomeIcon className="ml-4 text-xl" icon={faBarsProgress} />
        </button>
        {userSettings.isHintShouldOpen && (
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
              <div className="w-4/12 lg:w-2/12">
                <button
                  title="Close my feed hint"
                  className={clsx(
                    'w-full text-right text-2xl font-bold lg:text-left',
                    theme.textP,
                  )}
                  onClick={() =>
                    setUserSettings((prevState) => ({
                      ...prevState,
                      isHintShouldOpen: false,
                    }))
                  }
                >
                  x
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
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

export default MyFeed;
