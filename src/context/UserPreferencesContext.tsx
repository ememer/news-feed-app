import { createContext } from 'react';

import { UserPreferencesContextTypes } from '../types/UserPreferContext';

export const UserPreferencesContext = createContext<UserPreferencesContextTypes | null>(
  null,
);
