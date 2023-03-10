import { useCallback, useContext, useEffect, useState } from 'react';

import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import FeedPopUp from '../components/FeedPopup';
import LayoutPopUp from '../components/LayoutPopUp';
import NewsFeedCard from '../components/NewsFeedCard';
import { NewsFeedContext } from '../context/NewsFeedContext';
import { UserPreferencesContext } from '../context/UserPreferencesContext';
import { useApiRequest } from '../hook/useApiRequest';
import { useObserve } from '../hook/useObserver';
import { layoutTheme } from '../shared/theme/LayoutTheme';
import { ResponseArray } from '../types/NewsFeedArticleType';
import { NewsFeedContextTypes } from '../types/NewsFeedProvider';
import { UserPreferencesContextTypes } from '../types/UserPreferContext';

const Search = () => {
  const theme = layoutTheme[0];
  const { fillComponentData } = useContext(NewsFeedContext) as NewsFeedContextTypes;
  const { userSettings } = useContext(
    UserPreferencesContext,
  ) as UserPreferencesContextTypes;
  const { newNews, DEF_ARTICLE, isLoaded, setIsLoaded, nextPage } = useApiRequest();
  const { t } = useTranslation('translation');
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);
  const [response, setResponse] = useState<ResponseArray>();
  const [searchParam, setSearchParam] = useState('');
  const [shouldRequest, setShouldRequest] = useState(true);

  const createSearchUrl = (fieldText: string) => {
    if (fieldText.length >= 0 && fieldText.length < 3) {
      return { __err: t('searchFieldInfo') };
    }

    return `&q=${encodeURIComponent(`${fieldText}`)}`;
  };

  const validationError: string | { __err: string } = createSearchUrl(searchParam);

  const isValidate = Object.keys(validationError).toLocaleString() !== '__err';

  const { observeElement, shouldReRequest, setShouldReRequest } = useObserve();

  const lastArticle = useCallback(
    (node) => observeElement(node, isLoaded, nextPage),
    [isLoaded, nextPage],
  );

  useEffect(() => {
    setIsLoaded(true);
    if (shouldReRequest) {
      newNews({
        search:
          typeof createSearchUrl(searchParam) === 'object'
            ? ''
            : (createSearchUrl(searchParam) as string),
        pageNumber: nextPage as number,
      })
        .then((resp) =>
          setResponse(
            (prevResponse): ResponseArray => ({
              ...resp,
              results: [
                ...(prevResponse?.results ?? ''),
                ...resp.results,
              ] as ResponseArray['results'],
            }),
          ),
        )
        .catch((err) => err);
    }
    setShouldReRequest(false);
  }, [shouldReRequest]);

  useEffect(() => {
    if (shouldRequest) {
      newNews({
        search:
          typeof createSearchUrl(searchParam) === 'object'
            ? ''
            : (createSearchUrl(searchParam) as string),
      })
        .then((resp) => setResponse(resp))
        .catch((err) => err);
      setShouldRequest(false);
    }
  }, [shouldRequest]);

  const openAndUpdatePopup = () => {
    const matchArticle = response?.results.find(
      (e, idx) => idx === fillComponentData.componentId,
    );
    if (matchArticle && Object.keys(matchArticle).length !== 0) {
      return matchArticle;
    }
    return DEF_ARTICLE;
  };

  return (
    <div className="ml-auto mt-20 grid min-h-screen w-full scroll-m-10 grid-cols-1 gap-10 scroll-smooth p-4 lg:w-9/12 lg:p-10 xl:w-10/12">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isValidate) {
            setShouldRequest(true);
          }
        }}
        className="my-10 flex min-h-10-s flex-col items-center justify-center p-6"
      >
        <input
          onChange={(e) => {
            setSearchParam(e.target.value);
          }}
          value={searchParam}
          autoFocus={true}
          autoCapitalize="off"
          className="w-full rounded-lg p-3 focus:outline-none"
          title="Fill field"
          type="text"
          placeholder="Search"
        />

        <span className={clsx('inline-block w-full p-2', theme.mainAccText)}>
          {(validationError as { __err: string })?.__err}
        </span>
        {response?.results.length === 0 && searchParam !== '' && (
          <span
            className={clsx(
              theme.textP,
              'mx-auto my-2 inline-block w-full px-4 font-bold',
            )}
          >
            {t('notFoundMessage')} {searchParam}
          </span>
        )}
      </form>
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
            <FeedPopUp
              length={response?.results.length as number}
              onClose={setIsPopUpOpen}
              selectedArticle={openAndUpdatePopup()}
              response={response?.results ?? []}
            />
          </LayoutPopUp>
        )}

        {response?.results.map((article, idx) =>
          response?.results.length === idx + 1 ? (
            <NewsFeedCard
              index={idx}
              onClick={setIsPopUpOpen}
              key={`${article.title}+${idx}`}
              article={article}
              theme={theme}
              isReference={lastArticle}
            />
          ) : (
            <NewsFeedCard
              index={idx}
              onClick={setIsPopUpOpen}
              key={`${article.title}+${idx}`}
              article={article}
              theme={theme}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default Search;
