import React from 'react';

import { clipLongText } from '../shared/utils/clipText';
import { ArticleResponse } from '../types/NewsFeedArticleType';
import { DEF_COMPONENT_DATA } from '../types/NewsFeedProvider';

import missingImage from './../images/img_missing.png';

interface Article extends ArticleResponse {
  id: number;
}

interface Props {
  article: Article;
  onClick: React.Dispatch<React.SetStateAction<DEF_COMPONENT_DATA>>;
}

const RecentArticles = ({ article, onClick }: Props) => {
  const { id, image_url, title } = article;

  return (
    <button
      key={id}
      id={`${id}`}
      onClick={(e) =>
        onClick((prevState) => ({
          ...prevState,
          componentId: +(e.target as HTMLButtonElement).id,
        }))
      }
      className="my-4 flex w-full cursor-pointer items-center gap-4 p-4 hover:bg-gray-600/20"
    >
      <div id={`${id}`} className="w-3/12">
        <img
          id={`${id}`}
          className="aspect-video w-full"
          src={(image_url as string) ?? missingImage}
        />
      </div>
      <div id={`${id}`} className="w-9/12">
        <h2 id={`${id}`} className="w-full">
          {clipLongText(title as string, 50)}
        </h2>
      </div>
    </button>
  );
};

export default RecentArticles;
