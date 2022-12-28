export interface UserSettingsObjectTypes {
  myFeed: {
    tagSub: string[];
    myFeedCategory: 'MyFeed' | 'FeedLayout';
  };
  layoutType: 'eco' | 'roomy' | 'cozy';
  isHintShouldOpen: boolean;
}

export interface UserPreferencesContextTypes {
  userSettings: UserSettingsObjectTypes;
  setUserSettings: React.Dispatch<React.SetStateAction<UserSettingsObjectTypes>>;
}
