import { faHashtag, faTh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { useContext } from 'react';

import { UserPreferencesContext } from '../context/UserPreferencesContext';
import { layoutTheme } from '../shared/theme/LayoutTheme';
import { UserPreferencesContextTypes } from '../types/UserPreferContext';

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
  const { userSettings, setUserSettings } = useContext(
    UserPreferencesContext,
  ) as UserPreferencesContextTypes;

  return (
    <>
      <div className="mt-10 flex w-full flex-col lg:w-1/4">
        <button
          onClick={() =>
            setUserSettings((prevState) => ({
              ...prevState,
              myFeed: {
                tagSub: prevState.myFeed.tagSub,
                myFeedCategory: 'MyFeed',
              },
            }))
          }
          className={clsx(
            buttonClassName,
            userSettings.myFeed.myFeedCategory === 'MyFeed' && theme.mainButton,
          )}
        >
          <FontAwesomeIcon icon={faHashtag} /> My feed tags
        </button>
        <button
          onClick={() =>
            setUserSettings((prevState) => ({
              ...prevState,
              myFeed: {
                tagSub: prevState.myFeed.tagSub,
                myFeedCategory: 'FeedLayout',
              },
            }))
          }
          id="FeedLayout"
          className={clsx(
            buttonClassName,
            userSettings.myFeed.myFeedCategory === 'FeedLayout' && theme.mainButton,
          )}
        >
          <FontAwesomeIcon icon={faTh} /> Feed layout
        </button>
      </div>
      <div className={clsx('w-full lg:w-3/4 lg:border-l', theme.borderB)}>
        <div>
          <h2 className={clsx('border-b py-2 px-6 text-2xl', theme.borderB)}>
            {userSettings.myFeed.myFeedCategory === 'MyFeed'
              ? 'Menage tags'
              : 'Menage feed layout'}
          </h2>
        </div>
        <div className="min-h-80-s p-2 lg:p-6">
          {userSettings.myFeed.myFeedCategory === 'MyFeed' && (
            <ul>
              {categories.map((category) => (
                <li
                  className={clsx('my-5 flex flex-row rounded-xl p-4', theme.accButton)}
                  key={category}
                >
                  <button
                    onClick={(e: React.MouseEvent) => {
                      if (
                        !userSettings.myFeed?.tagSub?.includes(
                          (e.target as HTMLButtonElement).id,
                        )
                      ) {
                        setUserSettings((prevState) => ({
                          ...prevState,
                          myFeed: {
                            myFeedCategory: prevState.myFeed.myFeedCategory,
                            tagSub: [
                              ...prevState.myFeed.tagSub,
                              (e.target as HTMLButtonElement).id,
                            ],
                          },
                        }));
                      }
                    }}
                    id={category}
                    className={clsx('w-3/4')}
                  >
                    {category}
                  </button>
                  <button
                    id={category}
                    onClick={(e: React.MouseEvent) => {
                      userSettings.myFeed.tagSub.includes(
                        (e.target as HTMLButtonElement).id,
                      )
                        ? setUserSettings((prevState) => ({
                            ...prevState,
                            myFeed: {
                              myFeedCategory: prevState.myFeed.myFeedCategory,
                              tagSub: userSettings.myFeed.tagSub.filter(
                                (tag: string) =>
                                  tag !== (e.target as HTMLButtonElement).id,
                              ),
                            },
                          }))
                        : setUserSettings((prevState) => ({
                            ...prevState,
                            myFeed: {
                              myFeedCategory: prevState.myFeed.myFeedCategory,
                              tagSub: [
                                ...prevState.myFeed.tagSub,
                                (e.target as HTMLButtonElement).id,
                              ],
                            },
                          }));
                    }}
                    className={clsx(
                      'ml-auto rounded-xl py-2 px-6',
                      userSettings.myFeed.tagSub.includes(category)
                        ? theme.elementsBgP
                        : theme.elementsLinearBG,
                    )}
                  >
                    {userSettings.myFeed.tagSub.includes(category)
                      ? 'Unfollow'
                      : 'Follow'}
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