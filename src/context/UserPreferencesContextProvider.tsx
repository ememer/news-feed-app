import React, { useEffect, useState } from 'react';

import { UserSettingsObjectTypes } from '../types/UserPreferContext';
import { UserPreferencesContext } from './UserPreferencesContext';

interface Props {
  children: React.ReactNode;
}

const DEFAULT_USER_SETTINGS: UserSettingsObjectTypes = {
  myFeed: {
    tagSub: [],
    myFeedCategory: 'MyFeed',
  },
  layoutType: 'cozy',
  isHintShouldOpen: true,
};

const UserPreferencesContextProvider = ({ children }: Props) => {
  const [userSettings, setUserSettings] = useState<UserSettingsObjectTypes>(
    JSON.parse(localStorage.getItem('feedUserSettings') as string) ??
      DEFAULT_USER_SETTINGS,
  );

  useEffect(() => {
    localStorage.setItem('feedUserSettings', JSON.stringify(userSettings));
  }, [userSettings]);

  return (
    <UserPreferencesContext.Provider value={{ userSettings, setUserSettings }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export default UserPreferencesContextProvider;
