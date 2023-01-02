import myFeedTranslation from './locales/en/myFeedTranslation.json';

import 'react-i18next';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'myFeedTranslation';
    resources: {
      myFeedTranslation: typeof myFeedTranslation;
    };
  }
}
