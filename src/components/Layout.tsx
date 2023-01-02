import React, { useState } from 'react';

import clsx from 'clsx';

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
          'fixed top-0 left-0 z-10 flex min-h-10-s w-full items-center justify-center rounded-b-md border border-b bg-blue-800 bg-opacity-10 bg-clip-padding py-4 px-1 backdrop-blur-sm backdrop-filter lg:justify-start lg:px-10',
        )}
      >
        <div className="ml-auto lg:ml-0">
          <h1 className={clsx('text-2xl font-extrabold', theme.mainAccText)}>
            Daily
            <span className={clsx('font-bold', theme.headerFeeder)}>Feeder</span>
          </h1>
        </div>

        <div className="ml-auto lg:hidden">
          <button
            title="Open side menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="group relative"
          >
            <div
              className={clsx(
                'relative flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-lg bg-prussian-blue-900 shadow-md duration-200',
                isMenuOpen && 'transform',
              )}
            >
              <div
                className={clsx(
                  'flex h-[20px] w-[20px] origin-center flex-col justify-between overflow-hidden  duration-300',
                  isMenuOpen && 'transform',
                )}
              >
                <div
                  className={clsx(
                    'h-[2px] w-7 origin-left transform bg-white duration-300',
                    isMenuOpen && 'translate-x-10',
                  )}
                />
                <div
                  className={clsx(
                    'h-[2px] w-7 rounded bg-white delay-75 duration-300',
                    isMenuOpen && 'translate-x-10 transform',
                  )}
                />
                <div
                  className={clsx(
                    'h-[2px] w-7 origin-left transform bg-white delay-150 duration-300 ',
                    isMenuOpen && 'translate-x-10',
                  )}
                />
                <div
                  className={clsx(
                    'absolute top-2.5 flex transform items-center justify-between  duration-500',
                    isMenuOpen ? 'w-12 translate-x-0' : 'w-0 -translate-x-10',
                  )}
                >
                  <div
                    className={clsx(
                      'absolute h-[2px] w-5 transform bg-white delay-300 duration-500 ',
                      isMenuOpen ? 'rotate-45' : 'rotate-0',
                    )}
                  />
                  <div
                    className={clsx(
                      'absolute h-[2px] w-5 transform bg-white delay-300 duration-500 ',
                      isMenuOpen ? '-rotate-45' : '-rotate-0',
                    )}
                  />
                </div>
              </div>
            </div>
          </button>

          {isMenuOpen && <MobileMenu onClose={setIsMenuOpen} />}
        </div>
      </header>
      <main className={clsx('flex min-h-90-s', theme.linearBG)}>
        <nav
          className={clsx(
            'fixed mt-20 hidden h-full w-3/12 border-r px-8 py-16 lg:block xl:w-2/12',
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
