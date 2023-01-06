import { useContext } from 'react';

import { UserPreferencesContext } from '../context/UserPreferencesContext';
import { ArticleResponse } from '../types/NewsFeedArticleType';
import { UserPreferencesContextTypes } from '../types/UserPreferContext';

const TOKEN = 'pub_15362f38ac3988ca613743aeaa20979cbc8c2';

const DEF_ARTICLE: ArticleResponse = {
  creator: [''],
  content: '',
  pubDate: '',
  source_id: '',
  title: '',
  link: '',
  image_url: '',
  description: '',
};

// date period for API Request

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 5);

// User lang detector

const userLang = navigator.language.split('-')[0];

export const useApiRequest = () => {
  const { userSettings } = useContext(
    UserPreferencesContext,
  ) as UserPreferencesContextTypes;

  // converting array of user followed tags to string template

  const userPreferences = userSettings.myFeed.tagSub.map((tag) => `${tag},`);
  const userPreferencesStringUrl =
    userPreferences.length !== 0 ? userPreferences.join('') : '';

  // converting array of user followed tags to string template

  let categoryTags = '';

  if (userSettings.myFeed.tagSub.length === 1) {
    categoryTags = userSettings.myFeed.tagSub[0];
  } else {
    userSettings.myFeed.tagSub.forEach((tag) => (categoryTags += `${tag},`));
  }

  const commaShouldBeRemoved = categoryTags.lastIndexOf(',');

  if (commaShouldBeRemoved !== -1) {
    categoryTags = categoryTags.slice(0, commaShouldBeRemoved);
  }

  const searchTags = categoryTags.length > 0 ? `&category=${categoryTags}` : '';

  const newUrl = `https://newsdata.io/api/1/news?apikey=${TOKEN}${searchTags}`;

  const newNews = async () => {
    const request = new Request(newUrl + `&language=${userLang}&country=${userLang}`);
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const newses = await response.json();

    return {
      ...newses,
      results: newses?.results.map((result: ArticleResponse) => ({
        ...result,
        vote: Math.floor(Math.random() * (120 - 64) + 64), //Only for mock-up
        messages: Math.floor(Math.random() * (40 - 14) + 14), //Only for mock-up
        isClicked: false,
      })),
    };
  };

  return { userPreferencesStringUrl, newNews, DEF_ARTICLE };
};
