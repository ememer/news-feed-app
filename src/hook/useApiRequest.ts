import { useContext } from 'react';

import { UserPreferencesContext } from '../context/UserPreferencesContext';
import { ArticleResponse, ResponseArray } from '../types/NewsFeedArticleType';
import { RequestParams } from '../types/NewsFeedArticleType';
import { UserPreferencesContextTypes } from '../types/UserPreferContext';
const TOKEN = 'apiKey=dcfea20b502345c6be30e1d013d3d7b3';
const DEF_ARTICLE: ArticleResponse = {
  author: '',
  content: '',
  publishedAt: '',
  source: {
    id: '',
    name: '',
  },
  title: '',
  url: '',
  urlToImage: '',
  description: '',
};

// date period

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 5);

// splitting to array and convert to string template

const datePeriod = `from=${today.toISOString().split('T')[0]}&to=${
  yesterday.toISOString().split('T')[0]
}&`;

export const useApiRequest = () => {
  const { userSettings } = useContext(
    UserPreferencesContext,
  ) as UserPreferencesContextTypes;

  // converting array of user followed tags to string template

  const userPreferences = userSettings.myFeed.tagSub.map((tag) => `category=${tag}&`);
  const userPreferencesStringUrl =
    userPreferences.length !== 0 ? userPreferences.join('') : '';

  const news = async ({
    preferences = 'everything?',
    popularity = '',
    userPreferencesTags = '',
    country = 'us',
  }: RequestParams): Promise<ResponseArray> => {
    const URL =
      `https://newsapi.org/v2/${preferences}` +
      popularity +
      (preferences === 'everything?' ? '' : `country=${country}&`) +
      userPreferencesTags +
      (preferences === 'everything?' ? datePeriod : '') +
      (!country && !popularity && !userPreferencesTags ? `&${TOKEN}` : TOKEN);

    // return;
    const request: Request = new Request(URL);
    const resp = await fetch(request);

    if (!resp.ok) {
      const message = `${resp?.status}`;
      throw new Error(message);
    }

    const articlesResponse = await resp.json();

    return {
      ...articlesResponse,
      articles: articlesResponse?.articles.map((article: ArticleResponse) => ({
        ...article,
        vote: Math.floor(Math.random() * (120 - 64) + 64), //Only for mock-up
        messages: Math.floor(Math.random() * (40 - 14) + 14), //Only for mock-up
        isClicked: false,
      })),
    };
  };

  return { userPreferencesStringUrl, news, DEF_ARTICLE };
};
