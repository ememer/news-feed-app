import { clsx } from 'clsx';
import React, { SetStateAction } from 'react';

import { layoutTheme } from '../shared/theme/LayoutTheme';
import NavElements from './NavElements';
// import { navLink } from '../shared/utils/navigationLinks';
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
          'z-20 min-h-screen w-3/4 border-r px-4 py-6 md:w-2/4',
          theme.linearBG,
          theme.borderB,
          theme.mainText,
        )}
      >
        <NavElements onClose={() => onClose(false)} theme={theme} />
      </nav>
    </div>
  );
};

export default MobileMenu;
