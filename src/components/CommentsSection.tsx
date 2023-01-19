import { Dispatch, SetStateAction } from 'react';

import { layoutTheme } from '../shared/theme/LayoutTheme';
const theme = layoutTheme[0];

import comments from './../shared/utils/commentsTemplate.json';
import Comment from './Comment';
interface Props {
  onClick: Dispatch<SetStateAction<boolean>>;
  openComment: boolean;
  title: string;
  source: string;
}

const CommentSection = ({ onClick, openComment, title, source }: Props) => {
  console.log(comments);

  return (
    <div className="w-full py-10">
      {comments.map((comment) => (
        <Comment
          onClick={onClick}
          openComment={openComment}
          key={comment.id + comment.author}
          comment={comment}
          theme={theme}
          title={title}
          source={source}
        />
      ))}
    </div>
  );
};

export default CommentSection;
