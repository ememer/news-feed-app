import React, { Dispatch, SetStateAction, useContext } from 'react';

import {
  faHeart,
  faMessage,
  faShareFromSquare,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { NewsFeedContext } from '../context/NewsFeedContext';
import { LayoutTheme } from '../types/layoutTheme';
import { NewsFeedContextTypes } from '../types/NewsFeedProvider';

type UserReactions = {
  vote: number | undefined;
  messages: number | undefined;
  isClicked: boolean;
};

interface Props {
  theme: LayoutTheme;
  vote: () => void;
  userReactions: UserReactions;
  content: string | null;
  description: string | null;
  link: string;
  title: string;
  onClick: Dispatch<SetStateAction<boolean>>;
  index: number;
}
const ArticleCardsButtons = ({
  theme,
  vote,
  userReactions,
  content,
  description,
  link,
  title,
  onClick,
  index,
}: Props) => {
  const { t } = useTranslation();
  const { setFillComponentData } = useContext(NewsFeedContext) as NewsFeedContextTypes;

  return (
    <div className="row flex justify-between p-4">
      <button
        className={clsx('flex flex-row items-center', theme.hoverP)}
        title={t('voteUpButton') as string}
        onClick={() => vote()}
      >
        <div>
          <FontAwesomeIcon className="bg-transparent text-2xl" icon={faHeart} />
          <span
            className={clsx(
              (userReactions.isClicked as boolean) && theme.mainAccText,
              'ml-4 transform text-base',
            )}
          >
            {(userReactions.vote as number) !== 0 ? (userReactions.vote as number) : null}
          </span>
        </div>
      </button>
      <button
        title={t('commentButton') as string}
        className={clsx('flex flex-row items-center', theme.hoverP)}
        onClick={() => {
          setFillComponentData({
            componentId: index,
            voteReactionCount: userReactions.vote as number,
            messagesReactionCount: userReactions.messages as number,
          });
          onClick(true);
        }}
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
        onClick={() =>
          navigator.share({
            title: title as string,
            text: (content ?? description) as string,
            url: link as string,
          })
        }
      >
        <div className="bg-transparent text-2xl">
          <FontAwesomeIcon icon={faShareFromSquare} />
        </div>
      </button>
    </div>
  );
};

export default ArticleCardsButtons;
