import React, { Dispatch, SetStateAction } from 'react';

import { faComment, faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import { LayoutTheme } from '../types/layoutTheme';

import NewCommentPopup from './NewCommentPopup';

interface Props {
  theme: LayoutTheme;
  comment: {
    id: number;
    author: string;
    text: string;
    edit?: boolean;
    replays?: {
      id: number;
      author: string;
      text: string;
    }[];
  };
  onClick: Dispatch<SetStateAction<boolean>>;
  openComment: boolean;
  title: string;
  source: string;
  commentsLength: number;
  setNewComment: Dispatch<SetStateAction<any>>;
}

const Comment = ({
  onClick,
  openComment,
  theme,
  comment,
  title,
  source,
  comments,
  commentsLength,
  setNewComment,
}: Props) => {
  const foo = (e) => {
    const test = comments.map((comment) => {
      console.log(comment.id, e.target.id);
      if (comment.id === +e.target.id) {
        return {
          id: +e.target.id,
          text: '',
          author: '',
        };
      } else {
        return comment;
      }
    });
    console.log('TEST', test);
  };

  return (
    <div
      className={clsx(
        'my-4 flex flex-col items-center justify-between rounded-lg border p-2',
        theme.borderB,
        theme.elementsLinearBG,
      )}
    >
      {openComment && (
        <NewCommentPopup
          length={commentsLength}
          setComment={setNewComment}
          title={title}
          source={source}
          onClose={onClick}
        />
      )}
      <div
        className={clsx(
          'flex w-full justify-between lg:items-center',
          comment.replays?.length !== 0 ? 'border-b' : null,
          theme.borderB,
        )}
      >
        <div className="w-full">
          <div className="flex items-center justify-start">
            <span className="my-4 mx-auto block h-14 w-14 rounded-xl bg-slate-900/50" />
            <h2 className={clsx('my-4 ml-4 w-2/4 font-bold', theme.mainAccText)}>
              {comment.author}
            </h2>
            {comment.edit && (
              <div className="flex">
                <button
                  id={`${comment.id}`}
                  onClick={(e) => foo(e)}
                  className="mx-2 w-1/6"
                >
                  <FontAwesomeIcon className="h-full w-full" icon={faTrashCan} />
                </button>
                <button className="mx-2">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            )}
          </div>
          <p className="my-4 p-4">{comment.text}</p>
        </div>
      </div>
      <div>
        {comment.replays &&
          comment.replays.map((reply) => (
            <div key={reply.id} className="my-2 w-full px-4">
              <div className="flex items-center justify-start">
                <span className="mx-auto block h-10 w-10 rounded-xl bg-slate-900/50" />
                <h2 className={clsx('my-4 w-3/4 font-semibold', theme.textP)}>
                  {reply.author}
                </h2>
              </div>
              <p className="py-4 px-6">{reply.text}</p>
              <span
                className={clsx('mx-auto my-2 block w-11/12 border-b', theme.borderP)}
              />
            </div>
          ))}
        <div className="flex w-full items-center justify-center p-4">
          <button onClick={() => onClick(true)}>
            <FontAwesomeIcon icon={faComment} /> Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
