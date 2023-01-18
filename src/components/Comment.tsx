import React from 'react';

import clsx from 'clsx';

import { LayoutTheme } from '../types/layoutTheme';

interface Props {
  theme: LayoutTheme;
  comment: {
    id: number;
    author: string;
    text: string;
    replays?: {
      id: number;
      author: string;
      text: string;
    }[];
  };
}

const Comment = ({ theme, comment }: Props) => {
  console.log(comment);
  return (
    <div
      className={clsx(
        'my-4 flex flex-col items-center justify-between rounded-lg border p-2',
        theme.borderB,
        theme.elementsLinearBG,
      )}
    >
      <div
        className={clsx(
          'flex w-full justify-between lg:items-center',
          comment.replays?.length !== 0 ? 'border-b' : null,
          theme.borderB,
        )}
      >
        <div className="w-full">
          <div className="flex items-center justify-start">
            <span className="mx-auto block h-14 w-14 rounded-xl bg-slate-900/50" />
            <h2 className={clsx('my-4 ml-4 w-3/4 font-bold', theme.mainAccText)}>
              {comment.author}
            </h2>
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
      </div>
      <div className="my-2 flex w-full items-center justify-between p-4">
        <input
          type="text"
          className={clsx(
            'w-3/4 rounded-lg border p-2 shadow-md',
            theme.elementsLinearBG,
            theme.borderB,
          )}
          placeholder="Share your thought"
        />
        <button
          className={clsx(
            'mx-auto w-2/12 rounded-md p-2 shadow-md',
            theme.elementsLinearBG,
          )}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Comment;
