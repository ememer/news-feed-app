import clsx from 'clsx';
import React, { useState } from 'react';

import { layoutTheme } from '../shared/theme/LayoutTheme';
import MobileMenu from './MobileMenu';
import NavElements from './NavElements';

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
          'fixed top-0 left-0 z-10 flex min-h-10-s w-full items-center justify-center rounded-b-md border border-b bg-blue-800 bg-opacity-10 bg-clip-padding py-4 px-10 backdrop-blur-sm backdrop-filter lg:justify-start',
        )}
      >
        <div className="ml-auto lg:ml-0">
          <h1 className={clsx('text-2xl font-extrabold', theme.mainAccText)}>
            Daily
            <span className={clsx('font-bold', theme.headerFeeder)}>Feeder</span>
          </h1>
        </div>
        <div className="ml-auto lg:hidden">
          <div>
            <button
              title="Open side menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group relative"
            >
              <span className="sr-only">Open side menu button</span>{' '}
              <div className="relative flex h-[40px] w-[40px] transform items-center justify-center overflow-hidden rounded-xl bg-prussian-blue-900 shadow-md transition-all duration-200">
                <div
                  className={clsx(
                    isMenuOpen && '-translate-x-1.5 rotate-180',
                    'flex h-[15px] w-[15px] origin-center transform flex-col justify-between overflow-hidden transition-all duration-300',
                  )}
                >
                  <span
                    className={clsx(
                      isMenuOpen && 'w-2/4 rotate-[42deg] delay-150',
                      'h-[2px] w-7 origin-left transform bg-white transition-all duration-300',
                    )}
                  />

                  <span
                    className={clsx(
                      isMenuOpen && 'w-2/4 translate-x-10',
                      'h-[2px] w-7 transform rounded bg-white transition-all duration-300',
                    )}
                  />

                  <span
                    className={clsx(
                      isMenuOpen && 'w-2/4 -rotate-[42deg]',
                      'h-[2px] w-7 origin-left transform bg-white transition-all delay-150 duration-300',
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
            'fixed mt-20 hidden h-full w-2/12 border-r px-8 py-16 lg:block',
            theme.borderB,
            theme.linearBG,
            theme.mainText,
          )}
        >
          <NavElements theme={theme} />
        </nav>
        {children}
      </main>
    </>
  );
};

export default Layout;
