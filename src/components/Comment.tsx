import React, { Dispatch, SetStateAction, useState } from 'react';

import { faComment, faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import { CommentType } from '../types/CommentsTypes';
import { LayoutTheme } from '../types/layoutTheme';

import NewCommentPopup from './NewCommentPopup';

interface Props {
  theme: LayoutTheme;
  comment: CommentType;
  onClick: Dispatch<SetStateAction<boolean>>;
  openComment: boolean;
  title: string;
  source: string;
  comments: CommentType[];
  commentsLength: number;
  setNewComment: Dispatch<SetStateAction<CommentType[]>>;
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
  const [isFieldOpen, setIsFieldOpen] = useState(false);
  const [updatedContent, setUpdatedContent] = useState('');

  const updateOrRemoveComment = (e: React.MouseEvent, option: 'remove' | 'edit') => {
    setNewComment((prevState) => {
      return prevState.map((comment) => {
        if (comment.id === +(e.target as HTMLButtonElement).id) {
          if (option === 'remove') {
            return {
              id: +(e.target as HTMLButtonElement).id,
              text: '',
              author: '',
            } as CommentType;
          }
          if (option === 'edit') {
            return {
              ...comment,
              isUpdated: true,
              text: updatedContent,
            } as CommentType;
          }
        } else {
          return comment as CommentType;
        }
      }) as CommentType[];
    });
    setIsFieldOpen(false);
  };

  const findAndUpdateField = (e: React.MouseEvent) => {
    const matchedComment = comments.find(
      (comment) => comment.id === +(e.currentTarget as HTMLButtonElement).id,
    );

    setUpdatedContent(matchedComment?.text as string);
    setIsFieldOpen(!isFieldOpen);
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
          comment.replays && comment.replays?.length !== 0 ? 'border-b' : null,
          theme.borderB,
        )}
      >
        <div className="w-full">
          <div className="flex items-center justify-start">
            <span
              className={clsx(
                'my-4 mx-auto block  rounded-xl bg-slate-900/50',
                comment.author !== '' ? 'h-14 w-14' : 'h-10 w-10',
              )}
            />
            {comment.author && (
              <h2 className={clsx('my-4 ml-4 w-2/4 font-bold', theme.mainAccText)}>
                {comment.author}
              </h2>
            )}
            {!comment.author && (
              <span className="inline-block w-3/4">
                <span className="inline-block h-1 w-3/4 rounded-lg bg-slate-900" />
                <span className="inline-block h-1 w-2/4 rounded-lg bg-slate-900" />
              </span>
            )}

            {comment.edit && (
              <div className="flex">
                <button
                  id={`${comment.id}`}
                  onClick={(e) => updateOrRemoveComment(e, 'remove')}
                  className="p-2"
                >
                  <FontAwesomeIcon
                    id={`${comment.id}`}
                    className="text-lg"
                    icon={faTrashCan}
                  />
                </button>
                <button
                  id={`${comment.id}`}
                  onClick={(e) => findAndUpdateField(e)}
                  className="p-2"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            )}
          </div>
          {comment.isUpdated && <span className="px-2 text-sm">Edited</span>}
          {comment.text && !isFieldOpen && <p className="my-4 p-4">{comment.text}</p>}
          {isFieldOpen && (
            <div className="w-full">
              <textarea
                className={clsx(
                  'my-4 w-full rounded-md border bg-transparent p-4 outline-none ',
                  theme.borderB,
                )}
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
              />
              <div className="flex w-full justify-end">
                <button
                  id={`${comment.id}`}
                  onClick={(e) => updateOrRemoveComment(e, 'edit')}
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {comment.author && (
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
            <button id={`${comment.id}`} onClick={() => onClick(true)}>
              <FontAwesomeIcon icon={faComment} /> Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
