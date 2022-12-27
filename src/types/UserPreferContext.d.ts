export interface UserSettingsObjectTypes {
  myFeed: {
    tagSub: string[];
    myFeedCategory: 'MyFeed' | 'FeedLayout';
  };
  layoutType: 'eco' | 'roomy' | 'cozy';
}

export interface UserPreferencesContextTypes {
  userSettings: UserSettingsObjectTypes;
  setUserSettings: React.Dispatch<React.SetStateAction<UserSettingsObjectTypes>>;
}
