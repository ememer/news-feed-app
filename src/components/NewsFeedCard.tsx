import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

import {
  faHeart,
  faMessage,
  faNewspaper,
  faShareFromSquare,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import LazyLoad from 'react-lazy-load';

import { NewsFeedContext } from '../context/NewsFeedContext';
import { clipLongText } from '../shared/utils/clipText';
import { LayoutTheme } from '../types/layoutTheme';
import { ArticleResponse } from '../types/NewsFeedArticleType';
import { NewsFeedContextTypes } from '../types/NewsFeedProvider';

import missingImage from './../images/img_missing.png';

type Props = {
  theme: LayoutTheme;
  article: ArticleResponse;
  onClick: Dispatch<SetStateAction<boolean>>;
  index: number;
  isReference?: any;
};

const NewsFeedCard = ({ theme, article, onClick, index, isReference }: Props) => {
  const { fillComponentData, setFillComponentData } = useContext(
    NewsFeedContext,
  ) as NewsFeedContextTypes;
  const { t } = useTranslation('translation');
  const {
    source_id,
    title,
    creator,
    link,
    image_url,
    content,
    description,
    vote,
    messages,
    pubDate,
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

  const publishedDate = new Date(pubDate as string);

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
      ref={isReference}
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
          {source_id?.toLocaleUpperCase()}
        </span>
        <a
          id="UIelement"
          className={clsx(
            'rounded-md border p-2 text-center  lg:invisible lg:group-hover/cardItem:visible',
            theme.borderB,
            theme.elementsLinearBG,
          )}
          href={link as string}
          target="_blank"
          rel="noreferrer"
        >
          {t('newTab')}
        </a>
      </div>
      <div className={clsx('flex flex-wrap p-4 font-semibold', theme.textP)}>
        {publishedDate.toLocaleDateString()}
      </div>
      <div className="mb-4 min-h-10-s p-4 pb-0">
        <h2 className="my-2 w-full text-2xl font-bold">{title}</h2>
        <span className="my-2 font-light">{creator ?? ''}</span>
        {!description && !content ? (
          <p className="my-4">{'No article description available'}</p>
        ) : (
          <p className="my-4">{clipLongText((description ?? content) as string, 100)}</p>
        )}
      </div>

      <LazyLoad threshold={0.5}>
        <img
          className="aspect-video rounded-b-md object-cover"
          alt={title as string}
          src={image_url ?? missingImage}
        />
      </LazyLoad>
      <div id="UIelement" className="row flex justify-between p-4">
        <button
          className={clsx('flex flex-row items-center', theme.hoverP)}
          title={t('voteUpButton') as string}
          id="UIelement"
          onClick={() => addVote()}
        >
          <div id="UIelement">
            <FontAwesomeIcon
              id="UIelement"
              className="bg-transparent text-2xl"
              icon={faHeart}
            />
            <span
              id="UIelement"
              className={clsx(
                userReactions.isClicked && theme.mainAccText,
                'ml-4 transform text-base',
              )}
            >
              {userReactions.vote !== 0 ? userReactions.vote : null}
            </span>
          </div>
        </button>
        <button
          title={t('commentButton') as string}
          className={clsx('flex flex-row items-center', theme.hoverP)}
        >
          <div className="text-2xl">
            <FontAwesomeIcon icon={faMessage} />
            <span className="ml-4 transform text-base">
              {userReactions.messages !== 0 ? userReactions.messages : null}
            </span>
          </div>
        </button>
        <button
          className={clsx('flex flex-row items-center overflow-hidden', theme.hoverP)}
          title={t('shareButton') as string}
          id="UIelement"
          onClick={() =>
            navigator.share({
              title: title as string,
              text: (content ?? description) as string,
              url: link as string,
            })
          }
        >
          <div id="UIelement" className="text-2xl">
            <FontAwesomeIcon id="UIelement" icon={faShareFromSquare} />
          </div>
        </button>
      </div>
    </article>
  );
};

export default NewsFeedCard;
