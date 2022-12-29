import { useContext } from 'react';

import { UserPreferencesContext } from '../context/UserPreferencesContext';
import { ArticleResponse, ResponseArray } from '../types/NewsFeedArticleType';
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
};

export const useApiRequest = () => {
  const { userSettings } = useContext(
    UserPreferencesContext,
  ) as UserPreferencesContextTypes;

  // date period

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // splitting to array and convert to string template

  const datePeriod = `from=${today.toISOString().split('T')[0]}&to=${
    yesterday.toISOString().split('T')[0]
  }&`;

  // converting array of user followed tags to string template

  const userPreferences = userSettings.myFeed.tagSub.map((tag) => `q=${tag}&`);
  const userPreferencesStringUrl =
    userPreferences.length !== 0 ? userPreferences.join('') : 'q=';

  type RequestParams = {
    preferences: 'everything?' | 'top-headlines?';
    popularity?: 'sortBy=popularity&' | '';
    userPreferencesTags: string;
    country?: 'country=us&' | '';
  };

  const news = async ({
    preferences = 'everything?',
    popularity = '',
    userPreferencesTags = '',
    country = '',
  }: RequestParams): Promise<ResponseArray> => {
    const URL =
      `https://newsapi.org/v2/${preferences}` +
      popularity +
      country +
      userPreferencesTags +
      (preferences === 'everything?' ? datePeriod : '') +
      (!country && !popularity && !userPreferencesTags ? `&${TOKEN}` : TOKEN);
    console.log(URL);

    const request: Request = new Request(URL);
    const resp = await fetch(request);

    if (!resp.ok) {
      const message = `Bad request ${resp?.status}`;
      throw new Error(message);
    }

    const articlesResponse = await resp.json();
    console.log(articlesResponse);

    return articlesResponse;
  };

  return { userPreferencesStringUrl, datePeriod, news, DEF_ARTICLE };
};
