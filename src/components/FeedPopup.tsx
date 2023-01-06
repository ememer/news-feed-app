import { useContext, useState } from 'react';

import {
  faArrowAltCircleUp,
  faComment,
  faShareFromSquare,
  faSquareCaretLeft,
  faSquareCaretRight,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import LazyLoad from 'react-lazy-load';

import { NewsFeedContext } from '../context/NewsFeedContext';
import { layoutTheme } from '../shared/theme/LayoutTheme';
import { ArticleResponse } from '../types/NewsFeedArticleType';
import { NewsFeedContextTypes } from '../types/NewsFeedProvider';

import CommentBlank from './CommentBlank';
import PopupCTA from './PopupCTA';

const theme = layoutTheme[0];

interface Props {
  selectedArticle: ArticleResponse;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const FeedPopUp = ({ selectedArticle, onClose }: Props) => {
  const { t } = useTranslation('translation');
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [shouldCommentOpen, setShouldCommentOpen] = useState(false);
  const { fillComponentData, setFillComponentData } = useContext(
    NewsFeedContext,
  ) as NewsFeedContextTypes;

  //  =>> TO DO <<=
  //
  // =>COMMENT SECTION
  //
  // => USE DECELERATED VARIABLE

  const {
    title = '',
    content = '',
    publishedAt = '',
    urlToImage = '',
    url = '',
    source = { id: '', name: '' },
  } = selectedArticle;

  const publishedDate = new Date(publishedAt as string);

  return (
    <>
      <div className={clsx('w-full lg:w-3/4 lg:border-r lg:pr-10', theme.borderP20)}>
        <div className="flex items-center justify-between">
          <div className="my-6 text-5xl">
            <button
              title={t('prevArt') as string}
              disabled={fillComponentData.componentId === 0}
              className={clsx(
                'mx-2',
                fillComponentData.componentId === 0
                  ? 'text-hot-ping-500/50'
                  : theme.textP,
              )}
              onClick={() => {
                if (fillComponentData.componentId > 0) {
                  setFillComponentData((prevState) => ({
                    ...prevState,
                    componentId: prevState.componentId - 1,
                  }));
                }
              }}
            >
              <FontAwesomeIcon icon={faSquareCaretLeft} />
            </button>

            {/*  TO DO => PROTECT CLICKING CONNECT WITH ARTICLES LENGTH */}
            <button
              title={t('nextArt') as string}
              className={clsx('mx-2', theme.textP)}
              onClick={() =>
                setFillComponentData((prevState) => ({
                  ...prevState,
                  componentId: prevState.componentId + 1,
                }))
              }
            >
              <FontAwesomeIcon icon={faSquareCaretRight} />
            </button>
          </div>
          <a
            target="_blank"
            href={url as string}
            title={t('readArticle') as string}
            className="text-3xl lg:hidden"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faShareFromSquare} /> Open
          </a>
          <div className="fixed top-14 right-14 z-50">
            <button
              title={t('closePopUp') as string}
              className="relative w-1/4 lg:hidden"
              onClick={() => onClose(false)}
            >
              <span
                className={clsx(
                  'absolute inline-block h-1 w-8 rotate-45 rounded-md',
                  theme.elementsBgP50,
                )}
              />
              <span
                className={clsx(
                  'absolute inline-block h-1 w-8 -rotate-45 rounded-md',
                  theme.elementsBgP50,
                )}
              />
            </button>
          </div>
        </div>
        <h2 className="text-3xl font-bold lg:text-5xl">{title}</h2>
        <p className={clsx('my-4 border-l-2 pl-4', theme.borderP)}>
          <span
            className={clsx(
              'mr-2 border-l-8 pl-4 text-xl font-bold ',
              theme.borderP,
              theme.textP,
            )}
          >
            {'TL:DR/>'}
          </span>
          {content}
        </p>
        <span className="m-4 block">{publishedDate.toLocaleDateString()}</span>
        <LazyLoad threshold={1.0}>
          <img
            className="rounded-md"
            src={
              (urlToImage as string) ??
              'https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png'
            }
          />
        </LazyLoad>

        <div className="mt-6 mb-2 w-full text-sm">
          <span className="mx-2">
            {fillComponentData.voteReactionCount} {t('vote')}
          </span>
          <span className="mx-2">
            {fillComponentData.messagesReactionCount} {t('comments')}
          </span>
        </div>
        <div
          className={clsx(
            'mb-6 flex items-center justify-between border-t border-b py-4',
            theme.borderP50,
          )}
        >
          <div>
            <button
              title={t('voteUpButton') as string}
              onClick={() =>
                setFillComponentData((prevState) => ({
                  ...prevState,
                  voteReactionCount: prevState.voteReactionCount + 1,
                }))
              }
            >
              <FontAwesomeIcon icon={faArrowAltCircleUp} />
              <span className="ml-2">{t('voteUpButton')}</span>
            </button>
          </div>
          <div>
            <button
              title={t('commentButton') as string}
              onClick={() => setShouldCommentOpen(true)}
            >
              <FontAwesomeIcon icon={faComment} />
              <span className="ml-2">{t('comments')}</span>
            </button>
          </div>
          <div>
            <button
              title={t('shareButton') as string}
              onClick={() =>
                navigator.share({
                  title: title as string,
                  text: content as string,
                  url: url as string,
                })
              }
            >
              <FontAwesomeIcon icon={faShareFromSquare} />

              <span className="ml-2">{t('share')}</span>
            </button>
          </div>
        </div>
        <div className="my-4 w-full">
          <span className="text-center text-slate-900/70">TO DO COMMENTS SECTION</span>
          <CommentBlank />
          <CommentBlank />
          <CommentBlank />
          <CommentBlank />
        </div>
      </div>
      <div className="w-full lg:w-2/4 ">
        <PopupCTA
          buttonClose={onClose}
          source={source}
          url={url as string}
          theme={theme}
          className="hidden lg:block"
        />
        <div
          className={clsx(
            'mt-10 flex h-64 w-full items-center justify-center rounded-md border p-2 lg:mt-20',
            theme.borderP50,
          )}
        >
          <span className="text-5xl opacity-20">TODO</span>
        </div>
        <div
          className={clsx(
            'mt-10 flex h-64 w-full items-center justify-center rounded-md border p-2 lg:mt-20',
            theme.borderP50,
          )}
        >
          <span className="text-5xl opacity-20">TODO</span>
        </div>
      </div>
    </>
  );
};

export default FeedPopUp;
