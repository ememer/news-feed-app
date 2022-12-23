import clsx from 'clsx';
import React from 'react';

import { layoutTheme } from '../shared/theme/LayoutTheme';

type Props = {
  children: React.ReactNode;
};

const theme = layoutTheme[0];

const Layout = ({ children }: Props) => {
  return (
    <>
      <header
        className={clsx(
          theme.linearBG,
          theme.borderB,
          'min-h-10-s border-b py-4 px-10 flex items-center rounded-b-md',
        )}
      >
        <div>
          <h1 className={clsx('text-2xl', theme.mainAccText)}>
            Daily
            <span className={clsx('font-bold', theme.headerFeeder)}>Feeder</span>
          </h1>
        </div>
      </header>
      <main className={clsx('grid grid-cols-2 min-h-90-s', theme.linearBG)}>
        <nav className={clsx('w-4/12 border-r', theme.borderB, theme.linearBG)}></nav>
        {children}
      </main>
    </>
  );
};

export default Layout;
