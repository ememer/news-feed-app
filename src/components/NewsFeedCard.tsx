import {
  faHeart,
  faMessage,
  faNewspaper,
  faShareFromSquare,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import React, { useState } from 'react';

import { clipLongText } from '../shared/utils/clipText';
import { LayoutTheme } from '../types/layoutTheme';
import { ArticleResponse } from '../types/NewsFeedArticleType';

type Props = {
  theme: LayoutTheme;
  article: ArticleResponse;
  // eslint-disable-next-line no-unused-vars
  onClick: (idx: number, votes: number, comments: number) => void;
  index: number;
};

const NewsFeedCard = ({ theme, article, onClick, index }: Props) => {
  const { source, title, author, url, urlToImage, content = '' } = article;
  const [voteCount, setVoteCount] = useState({
    vote: Math.floor(Math.random() * (120 - 64) + 64), //Only for mock-up
    messages: Math.floor(Math.random() * (180 - 64) + 64), //Only for mock-up
    isClicked: false,
  });

  const addVote = () => {
    setVoteCount((prev) => ({
      ...prev,
      vote: prev.vote + 1,
      isClicked: true,
    }));
    setTimeout(() => {
      setVoteCount((prev) => ({
        ...prev,
        isClicked: false,
      }));
    }, 400);
  };

  return (
    <article
      onClick={(e) => {
        if ((e.target as HTMLDivElement).id !== 'UIelement') {
          onClick(index, voteCount.vote, voteCount.messages);
        }
      }}
      className={clsx(
        'group/cardItem flex w-full cursor-pointer snap-center snap-always flex-col justify-around overflow-hidden rounded-xl border shadow-lg transition-transform duration-200 ease-in-out hover:scale-105',
        theme.elementsLinearBG,
        theme.borderB,
        theme.mainText,
      )}
    >
      <div id="article" className="grid grid-cols-2 items-center justify-between p-4">
        <span className={clsx(theme.mainAccText)}>
          <FontAwesomeIcon className="mr-2" icon={faNewspaper} />
          {source?.id?.toLocaleUpperCase()}
        </span>
        <a
          id="UIelement"
          className={clsx(
            'rounded-md border p-2 text-center  lg:invisible lg:group-hover/cardItem:visible',
            theme.borderB,
            theme.elementsLinearBG,
          )}
          href={url as string}
          target="_blank"
          rel="noreferrer"
        >
          Open in new Tab
        </a>
      </div>
      <div className="mb-4 min-h-10-s p-4 pb-0">
        <h2 className="my-2 w-full text-2xl font-bold">{title}</h2>
        <span className="my-2 font-light">{author}</span>
        <p className="my-4">{clipLongText(content as string, 100)}</p>
      </div>
      <img
        className="aspect-video rounded-b-md object-cover"
        alt={`${title} article`}
        src={urlToImage ?? 'https://miro.medium.com/max/800/1*hFwwQAW45673VGKrMPE2qQ.png'}
      />
      <div id="UIelement" className="row flex justify-between p-4">
        <div id="UIelement" className="flex flex-row items-center">
          <button id="UIelement" className="text-2xl" onClick={() => addVote()}>
            <FontAwesomeIcon id="UIelement" icon={faHeart} />
          </button>
          <span
            className={clsx(
              voteCount.isClicked && theme.mainAccText,
              'ml-4 transform duration-75 ease-in-out',
            )}
          >
            {voteCount.vote !== 0 ? voteCount.vote : null}
          </span>
        </div>
        <div id="UIelement" className="flex flex-row items-center">
          <button id="UIelement" className="text-2xl">
            <FontAwesomeIcon id="UIelement" icon={faMessage} />
          </button>
          <span className="ml-4 transform duration-75 ease-in-out">
            {voteCount.messages !== 0 ? voteCount.messages : null}
          </span>
        </div>
        <div id="UIelement" className="flex flex-row items-center overflow-hidden">
          <button
            id="UIelement"
            className="text-2xl"
            onClick={() =>
              navigator.share({
                title: title as string,
                text: content as string,
                url: url as string,
              })
            }
          >
            <FontAwesomeIcon id="UIelement" icon={faShareFromSquare} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default NewsFeedCard;
