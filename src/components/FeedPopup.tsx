import {
  faArrowAltCircleUp,
  faComment,
  faShareFromSquare,
  faSquareCaretLeft,
  faSquareCaretRight,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { Dispatch, useContext, useEffect, useState } from 'react';

import { NewsFeedContext } from '../context/NewsFeedContext';
import { layoutTheme } from '../shared/theme/LayoutTheme';
import { ArticleResponse } from '../types/NewsFeedArticleType';
import { NewsFeedContextTypes } from '../types/NewsFeedProvider';
import CommentBlank from './ComentBlank';
import PopupCTA from './PopupCTA';

const theme = layoutTheme[0];

interface Props {
  selectedArticle: ArticleResponse;
  onClose: Dispatch<React.SetStateAction<boolean>>;
}

const FeedPopUp = ({ selectedArticle, onClose }: Props) => {
  const [shouldCommentOpen, setShouldCommentOpen] = useState(false);
  const { fillComponentData, setFillComponentData } = useContext(
    NewsFeedContext,
  ) as NewsFeedContextTypes;

  // TO DO
  //
  // COMMENT SECTION
  //
  //

  const {
    title = '',
    content = '',
    publishedAt = '',
    urlToImage = '',
    url = '',
    source = { id: '', name: '' },
  } = selectedArticle;

  const closePopup = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose(false);
    }
  };
  useEffect(() => {
    document.addEventListener('keyup', (e) => closePopup(e));
    return () => removeEventListener('keyup', closePopup);
  });

  return (
    <div
      id="Popup"
      onClick={(e) => {
        if ((e.target as HTMLDivElement).id === 'Popup') {
          onClose(false);
        }
      }}
      className={clsx(
        'h-90-s fixed top-0 left-0  z-50 flex h-full  w-full items-center justify-center overflow-y-auto bg-hot-ping-900 bg-opacity-30 bg-clip-padding  backdrop-blur-sm backdrop-filter',
        theme.mainText,
      )}
    >
      <div
        className={clsx(
          'mt-5 flex max-h-90-s w-full flex-col gap-5 overflow-y-scroll rounded-lg border p-10 shadow-lg lg:w-4/6 lg:flex-row',
          theme.borderB,
          theme.elementsLinearBG,
        )}
      >
        <div className="w-full border-hot-ping-500/20 lg:w-3/4 lg:border-r lg:pr-10">
          <div className="flex items-center justify-between">
            <div className="my-6 text-5xl">
              <button
                title="Previous Article"
                disabled={fillComponentData.componentId === 0}
                className={clsx(
                  'mx-2',
                  fillComponentData.componentId === 0 && 'text-hot-ping-500/50',
                  'text-hot-ping-500',
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
                title="Next Article"
                className="mx-2 text-hot-ping-500"
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
              title="Open article"
              className="text-3xl lg:hidden"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faShareFromSquare} /> Open
            </a>
            <div className="fixed top-14 right-14 z-50">
              <button className="relative w-1/4 lg:hidden" onClick={() => onClose(false)}>
                <span className="absolute inline-block h-1 w-8 rotate-45 rounded-md bg-hot-ping-500/50" />
                <span className="absolute inline-block h-1 w-8 -rotate-45 rounded-md bg-hot-ping-500/50" />
              </button>
            </div>
          </div>
          <h2 className="text-5xl font-bold">{title}</h2>
          <p className="my-4 border-l-2 border-hot-ping-500 pl-4">
            <span className="mr-2 border-l-8 border-hot-ping-500 pl-4 text-xl font-bold text-hot-ping-500">
              {'TL:DR/>'}
            </span>
            {content}
          </p>
          <span className="block m-2">{publishedAt}</span>
          <img className="rounded-md" src={urlToImage as string} />
          <div className="mt-6 mb-2 w-full text-sm">
            <span className="mx-2">{fillComponentData.voteReactionCount} Upvotes</span>
            <span className="mx-2">
              {fillComponentData.messagesReactionCount} Comments
            </span>
          </div>
          <div className="mb-6 flex items-center justify-between border-t border-b border-hot-ping-500/30 py-4">
            <div>
              <button>
                <FontAwesomeIcon icon={faArrowAltCircleUp} />
                <span className="ml-2">Upvote</span>
              </button>
            </div>
            <div>
              <button onClick={() => setShouldCommentOpen(true)}>
                <FontAwesomeIcon icon={faComment} />
                <span className="ml-2">Comment</span>
              </button>
            </div>
            <div>
              <button
                onClick={() =>
                  navigator.share({
                    title: title as string,
                    text: content as string,
                    url: url as string,
                  })
                }
              >
                <FontAwesomeIcon icon={faShareFromSquare} />

                <span className="ml-2">Share</span>
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
          <div className="mt-10 flex h-64 w-full items-center justify-center rounded-md border border-hot-ping-500/50 p-2 lg:mt-20">
            <span className="text-5xl opacity-20">TODO</span>
          </div>
          <div className="mt-10 flex h-64 w-full items-center justify-center rounded-md border border-hot-ping-500/50 p-2 lg:mt-20">
            <span className="text-5xl opacity-20">TODO</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPopUp;
