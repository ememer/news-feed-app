import React, { useContext } from 'react';

import { faHashtag, faTh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

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

const layoutSets = ['eco', 'roomy', 'cozy'];

const buttonClassName = 'mb-10 rounded-xl p-4';

const theme = layoutTheme[0];

const PreferenceMenu = () => {
  const { t } = useTranslation('translation');
  const { userSettings, setUserSettings } = useContext(
    UserPreferencesContext,
  ) as UserPreferencesContextTypes;

  return (
    <>
      <div className="mt-10 flex w-full flex-col lg:w-1/4">
        <button
          title={t('tagsButton') as string}
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
          <FontAwesomeIcon icon={faHashtag} /> {t('menagePop.myTags')}
        </button>
        <button
          title={t('layoutButton') as string}
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
          <FontAwesomeIcon icon={faTh} /> {t('menagePop.feedLayout')}
        </button>
      </div>
      <div className={clsx('w-full lg:w-3/4 lg:border-l', theme.borderB)}>
        <div>
          <h2 className={clsx('border-b py-2 px-6 text-2xl', theme.borderB)}>
            {t(
              userSettings.myFeed.myFeedCategory === 'MyFeed'
                ? 'menagePop.tagsTitle'
                : 'menagePop.feedTitle',
            )}
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
                    title={t('categoryButton', { category: t(category) }) as string}
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
                    {t(category)}
                  </button>
                  <button
                    title={`${t(
                      userSettings.myFeed.tagSub.includes(category)
                        ? 'Unfollow'
                        : 'Follow',
                      { ns: 'translation' },
                    )} ${t(category)}`}
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
                    {t(
                      userSettings.myFeed.tagSub.includes(category)
                        ? 'Unfollow'
                        : 'Follow',
                      { ns: 'translation' },
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {userSettings.myFeed.myFeedCategory === 'FeedLayout' && (
            <>
              {layoutSets.map((set) => (
                <div className="w-full p-4" key={set}>
                  <label className="flex cursor-pointer items-center">
                    <input
                      onChange={(e) =>
                        setUserSettings((prevState) => ({
                          ...prevState,
                          layoutType: (e.target as HTMLInputElement).value as
                            | 'eco'
                            | 'roomy'
                            | 'cozy',
                        }))
                      }
                      className="mr-10"
                      type="radio"
                      name={t(`menagePop.${set}`) as string}
                      value={set}
                      checked={
                        userSettings.layoutType === (set as 'eco' | 'roomy' | 'cozy')
                      }
                    />
                    {t(`menagePop.${set}`)}
                  </label>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PreferenceMenu;
