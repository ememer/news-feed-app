import React, { useState } from 'react';

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
  layoutType: 'eco',
  isHintShouldOpen: true,
};

const UserPreferencesContextProvider = ({ children }: Props) => {
  const [userSettings, setUserSettings] =
    useState<UserSettingsObjectTypes>(DEFAULT_USER_SETTINGS);
  return (
    <UserPreferencesContext.Provider value={{ userSettings, setUserSettings }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export default UserPreferencesContextProvider;
