import React, { Dispatch, SetStateAction } from 'react';

import { faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { LayoutTheme } from '../types/layoutTheme';

interface Props {
  buttonClose: Dispatch<SetStateAction<boolean>>;
  source: { id?: string | null; name: string | null };
  url: string;
  theme: LayoutTheme;
  className: string;
}

const PopupCTA = ({ buttonClose, source, url, theme, className }: Props) => {
  const { t } = useTranslation('translation');
  return (
    <div className={className}>
      <div className="flex w-full flex-row justify-between">
        <a
          target="_blank"
          className={clsx(
            'mx-auto block rounded-md border border-hot-ping-500 p-4 xl:w-2/4',
            theme.elementsLinearBG,
          )}
          href={url as string}
          rel="noreferrer"
        >
          <span className="mr-4">
            <FontAwesomeIcon icon={faShareFromSquare} />
          </span>
          {t('readArticle')}
        </a>
        <button
          title={t('closePopUp') as string}
          className="relative w-1/4"
          onClick={() => buttonClose(false)}
        >
          <span className="absolute inline-block h-1 w-8 rotate-45 rounded-md bg-hot-ping-500/50" />
          <span className="absolute inline-block h-1 w-8 -rotate-45 rounded-md bg-hot-ping-500/50" />
        </button>
      </div>
      <div className="my-4 p-4">
        <span className="text-xl font-bold ">{t('source')}:</span>

        <span className={clsx('ml-4 font-bold', theme.mainAccText)}>
          {source.name ? source.name : t('noInfo')}
        </span>
      </div>
    </div>
  );
};

export default PopupCTA;
