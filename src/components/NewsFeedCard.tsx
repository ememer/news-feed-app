import {
  faHeart,
  faMessage,
  faNewspaper,
  faShareFromSquare,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import { useState } from 'react';

import { clipLongText } from '../shared/utils/clipText';
import { LayoutTheme } from '../types/layoutTheme';
import { ArticleResponse } from '../types/NewsFeedArticleType';
interface Props {
  theme: LayoutTheme;
  article: ArticleResponse;
}

const NewsFeedCard = ({ theme, article }: Props) => {
  const { source, title, author, url, urlToImage, content } = article;
  const [voteCount, setVoteCount] = useState({
    vote: Math.floor(Math.random() * (120 - 64) + 64), //Only for mock-up
    messages: Math.floor(Math.random() * (180 - 64) + 64),
    isClicked: false,
  });
  const [share, setShare] = useState(false);

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
      className={clsx(
        'flex flex-col justify-around w-full rounded-xl snap-always snap-center border shadow-lg cursor-pointer hover:scale-105 ease-in-out duration-200 transition-transform overflow-hidden group/cardItem',
        theme.elementsLinearBG,
        theme.borderB,
        theme.mainText,
      )}
    >
      <div className="grid grid-cols-2 items-center justify-between p-4">
        <span className={clsx(theme.mainAccText)}>
          <FontAwesomeIcon className="mr-2" icon={faNewspaper} />
          {source?.id?.toLocaleUpperCase()}
        </span>
        <a
          className={clsx(
            'lg:invisible lg:group-hover/cardItem:visible text-center border  rounded-md p-2',
            theme.borderB,
            theme.elementsLinearBG,
          )}
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          Open in new Tab
        </a>
      </div>
      <div className="p-4 pb-0 min-h-10-s mb-4">
        <h2 className="font-bold text-2xl w-full my-2">{title}</h2>
        <span className="my-2 font-light">{author}</span>
        <p className="my-4">{clipLongText(content, 100)}</p>
      </div>
      <img
        className="object-cover aspect-video rounded-b-md"
        alt={`${title} article`}
        src={urlToImage ?? 'https://miro.medium.com/max/800/1*hFwwQAW45673VGKrMPE2qQ.png'}
      />
      <div className="p-4 flex row justify-between">
        <div className="flex flex-row items-center">
          <button className="text-2xl" onClick={() => addVote()}>
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <span
            className={clsx(
              voteCount.isClicked && theme.mainAccText,
              'ml-4 duration-75 transform ease-in-out',
            )}
          >
            {voteCount.vote !== 0 ? voteCount.vote : null}
          </span>
        </div>
        <div className="flex flex-row items-center">
          <button className="text-2xl">
            <FontAwesomeIcon icon={faMessage} />
          </button>
          <span className="ml-4 duration-75 transform ease-in-out">
            {voteCount.messages !== 0 ? voteCount.messages : null}
          </span>
        </div>
        <div className="flex flex-row items-center overflow-hidden">
          <button
            className="text-2xl"
            onClick={() => {
              setShare(true);
              // TODO

              // Set url to clipboard

              setTimeout(() => {
                setShare(false);
              }, 2000);
            }}
          >
            <FontAwesomeIcon icon={faShareFromSquare} />
          </button>
          {share && (
            <span className={clsx(share && 'ml-2', theme.mainAccText)}>
              Link saved in clipboard
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default NewsFeedCard;
