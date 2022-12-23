import { clsx } from 'clsx';
import React from 'react';

import { clipLongText, dumpyText } from '../shared/utils/clipText';
import { LayoutTheme } from '../types/layoutTheme';
interface Props {
  theme: LayoutTheme;
}

const NewsFeedCard = ({ theme }: Props) => {
  return (
    <div
      className={clsx(
        'w-full rounded-xl snap-always snap-center border shadow-lg cursor-pointer hover:scale-105 ease-in-out duration-200 hover:rotate-1  overflow-hidden',
        theme.elementsLinearBG,
        theme.borderB,
        theme.mainText,
      )}
    >
      <div className="p-4 pb-0h-3/4">
        <h2 className="font-bold text-2xl w-full my-2">Title</h2>
        <span className="my-2 font-light">author</span>
        <p className="my-4">{clipLongText(dumpyText, 70)}</p>
      </div>
      <img
        className="object-cover aspect-video h-full"
        alt="ALT TEMPORARY"
        src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
      />
    </div>
  );
};

export default NewsFeedCard;
