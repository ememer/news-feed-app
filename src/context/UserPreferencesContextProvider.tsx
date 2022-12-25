import React from 'react';

import { UserPreferencesContext } from './UserPreferencesContext';

interface Props {
  children: React.ReactNode;
}

const temp = 'Hello Context';

const UserPreferencesContextProvider = ({ children }: Props) => {
  return (
    <UserPreferencesContext.Provider value={{ temp }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export default UserPreferencesContextProvider;
