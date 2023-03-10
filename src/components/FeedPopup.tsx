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
import { recentArticles, sourceArticles } from '../shared/utils/recentArticleRandomize';
import { ArticleResponse } from '../types/NewsFeedArticleType';
import { NewsFeedContextTypes } from '../types/NewsFeedProvider';

import CommentSection from './CommentsSection';
import PopupCTA from './PopupCTA';
import RecentArticles from './RecentArticles';

import missingImage from './../images/img_missing.png';

const theme = layoutTheme[0];

interface Props {
  selectedArticle: ArticleResponse;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  length: number;
  response: ArticleResponse[];
}

const FeedPopUp = ({ selectedArticle, onClose, length = 0, response = [] }: Props) => {
  const { t } = useTranslation('translation');

  const [shouldCommentOpen, setShouldCommentOpen] = useState(false);
  const { fillComponentData, setFillComponentData } = useContext(
    NewsFeedContext,
  ) as NewsFeedContextTypes;

  const {
    title = '',
    content = '',
    description = '',
    pubDate = '',
    image_url = '',
    link = '',
    source_id = '',
  } = selectedArticle;

  const publishedDate = new Date(pubDate as string);

  return (
    <>
      <div
        className={clsx('w-full py-10 lg:w-3/4 lg:border-r lg:pr-10', theme.borderP20)}
      >
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
              disabled={fillComponentData.componentId === length - 1}
              className={clsx(
                'mx-2',
                fillComponentData.componentId === length - 1
                  ? 'text-hot-ping-500/50'
                  : theme.textP,
              )}
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
            href={link as string}
            title={t('readArticle') as string}
            className="text-3xl lg:hidden"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faShareFromSquare} /> {t('open')}
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
          {content ?? description}
        </p>
        <span className="m-4 block">{publishedDate.toLocaleDateString()}</span>
        <LazyLoad threshold={1.0}>
          <img
            className="mx-auto rounded-md"
            src={(image_url as string) ?? missingImage}
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
            'mb-6 flex items-center justify-between border-t border-b px-2 py-4',
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
                  text: (content ?? description) as string,
                  url: link as string,
                })
              }
            >
              <FontAwesomeIcon icon={faShareFromSquare} />

              <span className="ml-2">{t('share')}</span>
            </button>
          </div>
        </div>
        <CommentSection
          title={title as string}
          source={source_id as string}
          openComment={shouldCommentOpen}
          onClick={setShouldCommentOpen}
        />
      </div>
      <div className="w-full lg:w-2/4 ">
        <PopupCTA
          buttonClose={onClose}
          source={(source_id as string).toLocaleUpperCase()}
          url={link as string}
          theme={theme}
          className="hidden lg:block"
        />
        <div
          className={clsx(
            'mt-10 flex w-full flex-col items-center justify-center lg:mt-20',
            theme.borderP50,
          )}
        >
          <h2 className="w-full text-left">{t('recent')}:</h2>
          {recentArticles(response, fillComponentData).map((recent) => (
            <RecentArticles
              article={recent}
              onClick={setFillComponentData}
              key={recent.id}
            />
          ))}
        </div>
        <div
          className={clsx(
            'mt-10 flex w-full flex-col items-center justify-center lg:mt-20',
            theme.borderP50,
          )}
        >
          <h2 className="w-full text-left">
            {t('otherFrom')}: {source_id?.toLocaleUpperCase()}
          </h2>
          {sourceArticles(response, fillComponentData, source_id as string).map(
            (sourceArticle) => (
              <RecentArticles
                article={sourceArticle}
                onClick={setFillComponentData}
                key={sourceArticle.id}
              />
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default FeedPopUp;
