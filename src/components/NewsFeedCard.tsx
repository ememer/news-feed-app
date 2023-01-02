import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

import {
  faHeart,
  faMessage,
  faNewspaper,
  faShareFromSquare,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import LazyLoad from 'react-lazy-load';

import { NewsFeedContext } from '../context/NewsFeedContext';
import { clipLongText } from '../shared/utils/clipText';
import { LayoutTheme } from '../types/layoutTheme';
import { ArticleResponse } from '../types/NewsFeedArticleType';
import { NewsFeedContextTypes } from '../types/NewsFeedProvider';

type Props = {
  theme: LayoutTheme;
  article: ArticleResponse;
  onClick: Dispatch<SetStateAction<boolean>>;
  index: number;
};

const NewsFeedCard = ({ theme, article, onClick, index }: Props) => {
  const { fillComponentData, setFillComponentData } = useContext(
    NewsFeedContext,
  ) as NewsFeedContextTypes;

  const {
    source,
    title,
    author,
    url,
    urlToImage,
    content,
    description,
    vote,
    messages,
    publishedAt,
  } = article;
  const [userReactions, setUserReactions] = useState({
    vote: vote,
    messages: messages,
    isClicked: false,
  });

  const addVote = () => {
    setUserReactions((prev) => ({
      ...prev,
      vote: (prev.vote as number) + 1,
      isClicked: true,
    }));
    setTimeout(() => {
      setUserReactions((prev) => ({
        ...prev,
        isClicked: false,
      }));
    }, 400);
  };

  // Updating Votes in Card via Popup

  useEffect(() => {
    if (fillComponentData.componentId === index) {
      setUserReactions((prevState) => ({
        ...prevState,
        vote: fillComponentData.voteReactionCount,
      }));
    }
  }, [fillComponentData.voteReactionCount]);

  // Updating Popup after index/render change in popup

  const publishedDate = new Date(publishedAt as string);

  useEffect(() => {
    if (fillComponentData.componentId === index) {
      setFillComponentData({
        componentId: index,
        voteReactionCount: userReactions.vote as number,
        messagesReactionCount: userReactions.messages as number,
      });
    }
  }, [fillComponentData.componentId]);

  return (
    <article
      onClick={(e) => {
        if ((e.target as HTMLDivElement).id !== 'UIelement') {
          setFillComponentData({
            componentId: index,
            voteReactionCount: userReactions.vote as number,
            messagesReactionCount: userReactions.messages as number,
          });
          onClick(true);
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
        <span className={clsx('text-xs lg:text-sm', theme.mainAccText)}>
          <FontAwesomeIcon className="mr-2" icon={faNewspaper} />
          {source?.name?.toLocaleUpperCase()}
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
      <div className={clsx('flex flex-wrap p-4 font-semibold', theme.textP)}>
        {publishedDate.toLocaleDateString()}
      </div>
      <div className="mb-4 min-h-10-s p-4 pb-0">
        <h2 className="my-2 w-full text-2xl font-bold">{title}</h2>
        <span className="my-2 font-light">{author}</span>
        {!description && !content ? (
          <p className="my-4">{'No article description available'}</p>
        ) : (
          <p className="my-4">{clipLongText((description ?? content) as string, 100)}</p>
        )}
      </div>

      <LazyLoad threshold={0.5}>
        <img
          className="aspect-video rounded-b-md object-cover"
          alt={`${title} article`}
          src={
            urlToImage ??
            'https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png'
          }
        />
      </LazyLoad>
      <div id="UIelement" className="row flex justify-between p-4">
        <div id="UIelement" className="flex flex-row items-center">
          <button
            title="Vote up"
            id="UIelement"
            className="text-2xl"
            onClick={() => addVote()}
          >
            <FontAwesomeIcon id="UIelement" icon={faHeart} />
          </button>
          <span
            className={clsx(
              userReactions.isClicked && theme.mainAccText,
              'ml-4 transform duration-75 ease-in-out',
            )}
          >
            {userReactions.vote !== 0 ? userReactions.vote : null}
          </span>
        </div>
        <div id="UIelement" className="flex flex-row items-center">
          <button title="Open comments" id="UIelement" className="text-2xl">
            <FontAwesomeIcon id="UIelement" icon={faMessage} />
          </button>
          <span className="ml-4 transform duration-75 ease-in-out">
            {userReactions.messages !== 0 ? userReactions.messages : null}
          </span>
        </div>
        <div id="UIelement" className="flex flex-row items-center overflow-hidden">
          <button
            title="Share content"
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
