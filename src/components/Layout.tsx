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
          'min-h-10-s border-b py-4 px-10 flex justify-center lg:justify-start items-center rounded-b-md fixed w-full top-0 left-0 z-10',
        )}
      >
        <div>
          <h1 className={clsx('text-2xl font-extrabold', theme.mainAccText)}>
            Daily
            <span className={clsx('font-bold', theme.headerFeeder)}>Feeder</span>
          </h1>
        </div>
      </header>
      <main className={clsx('flex min-h-90-s', theme.linearBG)}>
        <nav
          className={clsx(
            'w-2/12 border-r hidden fixed h-full lg:block mt-20 p-6',
            theme.borderB,
            theme.linearBG,
          )}
        >
          test
        </nav>
        {children}
      </main>
    </>
  );
};

export default Layout;
