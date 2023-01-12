import { useContext, useState } from 'react';

import { UserPreferencesContext } from '../context/UserPreferencesContext';
import { countriesCodesList } from '../shared/utils/countriesCodeList';
import { ArticleResponse, ResponseArray } from '../types/NewsFeedArticleType';
import { UserPreferencesContextTypes } from '../types/UserPreferContext';

const TOKEN = 'pub_15362f38ac3988ca613743aeaa20979cbc8c2';

const DEF_LANG_COUNTRY = { languages: 'en', country_code2: 'us' };

// Fetch user Language and Country using IP geolocation

const fetchLocation = async () => {
  const URL =
    'https://api.ipgeolocation.io/ipgeo?apiKey=ef47981cbba64960930278a37104a4a6';

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  } catch (error) {
    return error;
  }
};

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

export const useApiRequest = () => {
  const [isLoaded, setIsLoaded] = useState(false);
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

  interface NewsParams {
    search?: string;
    pageNumber?: number;
  }
  const [nextPage, setNextPage] = useState<number | null>(0);

  const newNews = async ({
    search = '',
    pageNumber = 0,
  }: NewsParams): Promise<ResponseArray> => {
    // Location response await

    const locationResponse = await fetchLocation();

    const userLang = (await locationResponse.languages) ?? DEF_LANG_COUNTRY.languages;

    const country =
      (await locationResponse.country_code2) ?? DEF_LANG_COUNTRY.country_code2;

    const userCountry = (await countriesCodesList.includes(
      (await country.toLowerCase()) as string,
    ))
      ? country.toLowerCase()
      : DEF_LANG_COUNTRY.country_code2;

    // News API url

    const newUrl =
      `https://newsdata.io/api/1/news?apikey=${TOKEN}` +
      (search !== '' ? `${search}` : `${searchTags}`);

    const request = new Request(
      newUrl + `&language=${userLang}&country=${userCountry}&page=${pageNumber}`,
    );

    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const newses = await response.json();
    setIsLoaded(true);

    if (newses?.nextPage !== null || newses?.nextPage !== undefined) {
      setNextPage(newses?.nextPage);
    } else {
      setNextPage(null);
    }

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

  return {
    userPreferencesStringUrl,
    newNews,
    nextPage,
    isLoaded,
    setIsLoaded,
    DEF_ARTICLE,
  };
};
