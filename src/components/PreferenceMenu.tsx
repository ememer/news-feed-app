import { faHashtag, faTh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { useState } from 'react';

import { layoutTheme } from '../shared/theme/LayoutTheme';

const categories = [
  'Business',
  'Entertainment',
  'General',
  'Health',
  'Science',
  'Sports',
  'Technology',
];

const buttonClassName = 'mb-10 rounded-xl p-4';

const theme = layoutTheme[0];

const PreferenceMenu = () => {
  const [isActive, setIsActive] = useState('MyFeed');
  const [userCategories, setUserCategories] = useState<string[]>([]);

  return (
    <>
      <div className="mt-10 flex w-full flex-col lg:w-1/4">
        <button
          id="MyFeed"
          onClick={(e) => setIsActive((e.target as HTMLButtonElement).id)}
          className={clsx(buttonClassName, isActive === 'MyFeed' && theme.mainButton)}
        >
          <FontAwesomeIcon icon={faHashtag} /> My feed tags
        </button>
        <button
          id="FeedLayout"
          onClick={(e) => setIsActive((e.target as HTMLButtonElement).id)}
          className={clsx(buttonClassName, isActive === 'FeedLayout' && theme.mainButton)}
        >
          <FontAwesomeIcon icon={faTh} /> Feed layout
        </button>
      </div>
      <div className={clsx('w-full lg:w-3/4 lg:border-l', theme.borderB)}>
        <div>
          <h2 className={clsx('border-b py-2 px-6 text-2xl', theme.borderB)}>
            {isActive === 'MyFeed' ? 'Menage tags' : 'Menage feed layout'}
          </h2>
        </div>
        <div className="min-h-80-s p-2 lg:p-6">
          {isActive === 'MyFeed' && (
            <ul>
              {categories.map((category) => (
                <li
                  className={clsx('my-5 flex flex-row rounded-xl p-4', theme.accButton)}
                  key={category}
                >
                  <button
                    onClick={(e: React.MouseEvent) => {
                      if (!userCategories.includes(category)) {
                        setUserCategories((prevState) => [
                          ...prevState,
                          (e.target as HTMLButtonElement).id,
                        ]);
                      }
                    }}
                    id={category}
                    className={clsx(' w-3/4 ')}
                  >
                    {category}
                  </button>
                  <button
                    id={category}
                    onClick={(e: React.MouseEvent) => {
                      userCategories.includes((e.target as HTMLButtonElement).id)
                        ? setUserCategories(
                            userCategories.filter(
                              (elem) => elem !== (e.target as HTMLButtonElement).id,
                            ),
                          )
                        : setUserCategories((prevState) => [
                            ...prevState,
                            (e.target as HTMLButtonElement).id,
                          ]);
                    }}
                    className={clsx(
                      'ml-auto rounded-xl py-2 px-6',
                      userCategories.includes(category)
                        ? theme.elementsBgP
                        : theme.elementsLinearBG,
                    )}
                  >
                    Follow
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default PreferenceMenu;
