import clsx from 'clsx';
import React from 'react';

import { navLink } from '../shared/utils/navigationLinks';
library.add(faHouse, faFire, faArrowAltCircleUp, faComment, faMagnifyingGlass);
import { IconProp, library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowAltCircleUp,
  faComment,
  faFire,
  faHouse,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

import { LayoutTheme } from '../types/layoutTheme';

interface Props {
  theme: LayoutTheme;
}

const NavElements = ({ theme }: Props) => {
  return (
    <ul className="my-auto text-center lg:text-left">
      {navLink.feed.map((link) => (
        <li className="my-2 w-full" key={link.title}>
          <NavLink
            className={({ isActive }) =>
              isActive ? clsx(theme.mainAccText, 'w-full rounded-md') : theme.mainText
            }
            to={link.url}
            title={link.title}
          >
            <FontAwesomeIcon className="ml-2 mr-4" icon={link.icon as IconProp} />
            {link.urlText}
          </NavLink>
        </li>
      ))}
      <span className="mt-6 mb-2 inline-block w-full text-lg font-semibold">
        Discover
      </span>
      {navLink.discover.map((link) => (
        <li className="my-2 w-full" key={link.title}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? clsx(theme.mainAccText, 'w-full p-2 text-lg font-bold')
                : clsx(theme.mainText)
            }
            to={link.url}
            title={link.title}
          >
            <FontAwesomeIcon className="ml-2 mr-4" icon={link.icon as IconProp} />
            {link.urlText}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavElements;
