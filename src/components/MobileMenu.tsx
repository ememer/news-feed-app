import { clsx } from 'clsx';
import React, { SetStateAction } from 'react';

import { layoutTheme } from '../shared/theme/LayoutTheme';
import { navLink } from '../shared/utils/navigationLinks';
const theme = layoutTheme[0];

interface Props {
  onClose: React.Dispatch<SetStateAction<boolean>>;
}

const MobileMenu = ({ onClose }: Props) => {
  return (
    <div
      id="MobiCover"
      className={clsx('fixed -left-1 top-0 w-full')}
      onClick={(e) => {
        if ((e.target as HTMLDivElement).id === 'MobiCover') {
          onClose(false);
        }
      }}
    >
      <nav
        className={clsx(
          'w-3/4 min-h-screen border-r px-4 py-6 z-20',
          theme.linearBG,
          theme.borderB,
          theme.mainText,
        )}
      >
        {navLink.map((link) => (
          <a key={link.title} href={link.url} title={link.title}>
            {link.urlText}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default MobileMenu;
