import clsx from 'clsx';

import { layoutTheme } from '../shared/theme/LayoutTheme';
const theme = layoutTheme[0];
const CommentBlank = () => {
  return (
    <div
      className={clsx(
        'my-4 flex h-20 items-center justify-between rounded-lg border p-2',
        theme.borderB,
        theme.elementsLinearBG,
      )}
    >
      <span className="block h-14 w-14 rounded-xl bg-slate-900/50" />
      <div className="w-3/4">
        <span className="block mb-2 h-2 w-32 rounded-xl bg-slate-900/50 lg:w-56" />
        <span className="block mb-2 ml-4 h-2 w-36 rounded-xl bg-slate-900/50 lg:w-60" />
        <span className="block mb-2 ml-6 h-2 w-36 rounded-xl bg-slate-900/50 lg:w-64" />
        <span className="block mb-2 ml-8 h-2 w-36 rounded-xl bg-slate-900/50" />
      </div>
    </div>
  );
};

export default CommentBlank;
