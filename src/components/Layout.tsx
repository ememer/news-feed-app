import clsx from 'clsx';
import React, { useState } from 'react';

import { layoutTheme } from '../shared/theme/LayoutTheme';
import MobileMenu from './MobileMenu';

type Props = {
  children: React.ReactNode;
};

const theme = layoutTheme[0];

const Layout = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <header
        className={clsx(
          theme.borderB,
          'min-h-10-s border-b py-4 px-10 flex justify-center lg:justify-start items-center rounded-b-md fixed w-full top-0 left-0 z-10 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border bg-blue-800',
        )}
      >
        <div className="ml-auto lg:ml-0">
          <h1 className={clsx('text-2xl font-extrabold', theme.mainAccText)}>
            Daily
            <span className={clsx('font-bold', theme.headerFeeder)}>Feeder</span>
          </h1>
        </div>
        <div className="lg:hidden ml-auto">
          <div>
            <button
              title="Open side menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative group"
            >
              <span className="sr-only">Open side menu button</span>
              <div className="relative flex overflow-hidden items-center justify-center rounded-xl w-[40px] h-[40px] transform transition-all duration-200 shadow-md bg-prussian-blue-900">
                <div
                  className={clsx(
                    isMenuOpen && '-translate-x-1.5 rotate-180',
                    'flex flex-col justify-between w-[15px] h-[15px] transform transition-all duration-300 origin-center overflow-hidden',
                  )}
                >
                  <span
                    className={clsx(
                      isMenuOpen && 'rotate-[42deg] w-2/3 delay-150',
                      'bg-white h-[2px] w-7 transform transition-all duration-300 origin-left',
                    )}
                  />

                  <span
                    className={clsx(
                      isMenuOpen && 'translate-x-10',
                      'bg-white h-[2px] w-7 rounded transform transition-all duration-300',
                    )}
                  />

                  <span
                    className={clsx(
                      isMenuOpen && '-rotate-[42deg] w-2/3',
                      'bg-white h-[2px] w-7 transform transition-all duration-300 origin-left delay-150',
                    )}
                  />
                </div>
              </div>
            </button>
          </div>
          {isMenuOpen && <MobileMenu onClose={setIsMenuOpen} />}
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
