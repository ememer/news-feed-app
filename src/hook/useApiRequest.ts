import { useContext } from 'react';

import { UserPreferencesContext } from '../context/UserPreferencesContext';
import { UserPreferencesContextTypes } from '../types/UserPreferContext';

export const useApiRequest = () => {
  const { userSettings } = useContext(
    UserPreferencesContext,
  ) as UserPreferencesContextTypes;

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const datePeriod = `from=${today.toISOString().split('T')[0]}&to=${
    yesterday.toISOString().split('T')[0]
  }&`;

  const userPreferences = userSettings.myFeed.tagSub.map((tag) => `q=${tag}&`);
  const userPreferencesStringUrl = userPreferences.join();
  return { userPreferencesStringUrl, datePeriod };
};
