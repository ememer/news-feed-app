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
    source = { id: '', name: '' },
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

    document.addEventListener('keyup', (e) => closePopup(e));
    return removeEventListener('keyup', closePopup);
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
        'h-90-s fixed top-0 left-0  z-50 flex h-full  w-full items-center justify-center overflow-y-auto bg-hot-ping-900 bg-opacity-30 bg-clip-padding  backdrop-blur-sm backdrop-filter',
        theme.mainText,
      )}
    >
      <div
        className={clsx(
          'mt-5 flex max-h-90-s w-full  gap-5 overflow-y-scroll rounded-lg border p-10 shadow-lg lg:w-4/6',
          theme.borderB,
          theme.elementsLinearBG,
        )}
      >
        <div className="w-3/4 border-r border-hot-ping-500/20 pr-10">
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
            <span className="mx-2">{votes} Upovotes</span>
            <span className="mx-2">{comments} Comments</span>
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
        </div>
        <div className="w-2/4">
          <div className="flex w-full flex-row justify-between">
            <a
              target="_blank"
              className={clsx(
                'block mx-auto rounded-md border border-hot-ping-500 p-4 xl:w-2/4',
                theme.elementsLinearBG,
              )}
              href={url as string}
              rel="noreferrer"
            >
              <span className="mr-4">
                <FontAwesomeIcon icon={faShareFromSquare} />
              </span>
              Read article
            </a>
            <button
              className="relative w-1/4"
              onClick={() =>
                onClose((prevState) => ({ ...prevState, isPopUpOpen: false }))
              }
            >
              <span className="absolute inline-block h-1 w-8 rotate-45 rounded-md bg-hot-ping-500/50" />
              <span className="absolute inline-block h-1 w-8 -rotate-45 rounded-md bg-hot-ping-500/50" />
            </button>
          </div>
          <div className="my-4 p-4">
            <span className="text-xl font-bold ">Source:</span>

            <span className={clsx('ml-4 font-bold', theme.mainAccText)}>
              {source.name ? source.name : 'No information'}
            </span>
          </div>
          <div className="mt-20 flex h-64 w-full items-center justify-center rounded-md border border-hot-ping-500/50 p-2">
            <span className="text-5xl opacity-20">TODO</span>
          </div>
          <div className="mt-20 flex h-64 w-full items-center justify-center rounded-md border border-hot-ping-500/50 p-2">
            <span className="text-5xl opacity-20">TODO</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPopUp;
