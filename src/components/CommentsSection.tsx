import { layoutTheme } from '../shared/theme/LayoutTheme';
const theme = layoutTheme[0];
import comments from './../shared/utils/commentsTemplate.json';
import Comment from './Comment';
const CommentSection = () => {
  console.log(comments);

  return (
    <div className="w-full py-10">
      {comments.map((comment) => (
        <Comment key={comment.id + comment.author} comment={comment} theme={theme} />
      ))}
    </div>
  );
};

export default CommentSection;
