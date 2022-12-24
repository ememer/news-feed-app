import {
  faArrowAltCircleUp,
  faComment,
  faShareFromSquare,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { layoutTheme } from '../shared/theme/LayoutTheme';
import { ArticleResponse, CloseHandler } from '../types/NewsFeedArticleType';

const theme = layoutTheme[0];

interface Props {
  onClose: Dispatch<SetStateAction<any>>;
  selectedArticle: ArticleResponse;
  votes: number;
  comments: number;
}

const FeedPopUp = ({ selectedArticle, onClose, votes, comments }: Props) => {
  const [shouldCommentOpen, setShouldCommentOpen] = useState(false);
  const {
    title = '',
    content = '',
    publishedAt = '',
    urlToImage = '',
    url = '',
  } = selectedArticle;

  useEffect(() => {
    const closePopup = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose((prevState: CloseHandler) => ({
          ...prevState,
          isPopUpOpen: false,
        }));
      }
    };

    window.addEventListener('keyup', (e) => closePopup(e));
    () => removeEventListener('keyup', closePopup);
  }, []);

  return (
    <div
      id="Popup"
      onClick={(e) => {
        if ((e.target as HTMLDivElement).id === 'Popup') {
          onClose((prevState: CloseHandler) => ({
            ...prevState,
            isPopUpOpen: false,
          }));
        }
      }}
      className={clsx(
        'fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-hot-ping-900 bg-opacity-30 bg-clip-padding backdrop-blur-sm backdrop-filter',
        theme.mainText,
      )}
    >
      <div
        className={clsx(
          'mt-10 flex min-h-90-s  w-full gap-5 rounded-lg border p-10 shadow-lg lg:w-4/6',
          theme.borderB,
          theme.elementsLinearBG,
        )}
      >
        <div className="w-3/4 border-r border-hot-ping-500 pr-10">
          <h2 className="text-5xl font-bold">{title}</h2>
          <p className="my-4 border-l-2 border-hot-ping-500 pl-4">
            <span className="mr-2 border-l-8 border-hot-ping-500 pl-4 text-xl font-bold text-hot-ping-500">
              {'TL:DR/>'}
            </span>
            {content}
          </p>
          <span className="m-2 block">{publishedAt}</span>
          <img className="rounded-md" src={urlToImage as string} />
          <div className="mt-6 mb-2 w-full text-sm">
            <span className="mx-2">{votes} Upovotes</span>
            <span className="mx-2">{comments} Comments</span>
          </div>
          <div className="mb-6 flex items-center justify-between border-t border-b border-hot-ping-500 py-4">
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
        </div>
        <div>test</div>
      </div>
    </div>
  );
};

export default FeedPopUp;
