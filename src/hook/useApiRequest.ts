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
  description: '',
};
type RequestParams = {
  preferences: 'everything?' | 'top-headlines?';
  popularity?: 'sortBy=popularity&' | '';
  userPreferencesTags?: string;
  country:
    | 'ae'
    | 'ar'
    | 'at'
    | 'au'
    | 'be'
    | 'bg'
    | 'br'
    | 'ca'
    | 'ch'
    | 'cn'
    | 'co'
    | 'cu'
    | 'cz'
    | 'de'
    | 'eg'
    | 'fr'
    | 'gb'
    | 'gr'
    | 'hk'
    | 'hu'
    | 'id'
    | 'ie'
    | 'il'
    | 'in'
    | 'it'
    | 'jp'
    | 'kr'
    | 'lt'
    | 'lv'
    | 'ma'
    | 'mx'
    | 'my'
    | 'ng'
    | 'nl'
    | 'no'
    | 'nz'
    | 'ph'
    | 'pl'
    | 'pt'
    | 'ro'
    | 'rs'
    | 'ru'
    | 'sa'
    | 'se'
    | 'sg'
    | 'si'
    | 'sk'
    | 'th'
    | 'tr'
    | 'tw'
    | 'ua'
    | 'us'
    | 've'
    | 'za';
};

// date period

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

// splitting to array and convert to string template

const datePeriod = `from=${today.toISOString().split('T')[0]}&to=${
  yesterday.toISOString().split('T')[0]
}&`;

export const useApiRequest = () => {
  const { userSettings } = useContext(
    UserPreferencesContext,
  ) as UserPreferencesContextTypes;

  // converting array of user followed tags to string template

  const userPreferences = userSettings.myFeed.tagSub.map((tag) => `q=${tag}&`);
  const userPreferencesStringUrl =
    userPreferences.length !== 0 ? userPreferences.join('') : 'q=';

  const news = async ({
    preferences = 'everything?',
    popularity = '',
    userPreferencesTags = '',
    country = 'us',
  }: RequestParams): Promise<ResponseArray> => {
    const URL =
      `https://newsapi.org/v2/${preferences}` +
      popularity +
      `country=${country}&` +
      userPreferencesTags +
      (preferences === 'everything?' ? datePeriod : '') +
      (!country && !popularity && !userPreferencesTags ? `&${TOKEN}` : TOKEN);

    const request: Request = new Request(URL);
    console.log(URL);

    const resp = await fetch(request);

    if (!resp.ok) {
      const message = `Error Hhh.. ${resp?.status}`;
      throw new Error(message);
    }

    const articlesResponse = await resp.json();
    return articlesResponse;
  };

  return { userPreferencesStringUrl, news, DEF_ARTICLE };
};
