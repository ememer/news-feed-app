import React, { Dispatch, SetStateAction, useState } from 'react';

import clsx from 'clsx';
import { t } from 'i18next';

import { layoutTheme } from '../shared/theme/LayoutTheme';
import { clipLongText } from '../shared/utils/clipText';
import { CommentType } from '../types/CommentsTypes';
const theme = layoutTheme[0];

interface Props {
  onClose: Dispatch<SetStateAction<boolean>>;
  title: string;
  source: string;
  setComment: Dispatch<SetStateAction<CommentType[]>>;
  length: number;
}

const NewCommentPopup = ({
  onClose,
  title = '',
  source = '',
  setComment,
  length = 1,
}: Props) => {
  const [userComment, setUserComment] = useState('');
  const addNewComment = () => {
    setComment((prevState) => [
      ...prevState,
      {
        id: (length as number) + 1,
        author: 'You',
        text: userComment,
        edit: true,
        replays: [],
      },
    ]);

    onClose(false);
  };
  return (
    <div
      onClick={(e) => {
        if ((e.target as HTMLDivElement).id === 'comment') {
          onClose(false);
        }
      }}
      id="comment"
      className="fixed top-0 left-0 flex min-h-screen w-full items-center justify-center overflow-hidden bg-prussian-blue-800/20"
    >
      <div
        className={clsx(
          'min-h-30-s w-full rounded-lg border lg:w-2/4',
          theme.elementsLinearBG,
          theme.borderB,
        )}
      >
        <div className="w-full p-2 text-right">
          <button
            title={t('closePopUp') as string}
            className={clsx('p-4', theme.textP)}
            onClick={() => onClose(false)}
          >
            X
          </button>
        </div>
        <div className="min-h-20-s p-4">
          <span
            className={clsx('my-2 inline-block w-full py-4 lg:px-6', theme.mainAccText)}
          >
            {source}
          </span>
          <h2 className="px-2">{clipLongText(title, 100)}</h2>
        </div>
        <div className="my-2 flex w-full items-center justify-between p-4">
          <input
            onChange={(e) => setUserComment(e.target.value)}
            value={userComment}
            type="text"
            className={clsx(
              'w-3/4 rounded-lg border p-2 shadow-md',
              theme.elementsLinearBG,
              theme.borderB,
            )}
            placeholder={t('commentPlaceholder') as string}
          />
          <button
            onClick={() => addNewComment()}
            className={clsx(
              'mx-auto w-2/12 rounded-md p-2 shadow-md',
              theme.elementsLinearBG,
            )}
          >
            {t('post')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCommentPopup;
