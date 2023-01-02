export interface ArticleResponse {
  author: string | null;
  content: string | null;
  publishedAt: string | null;
  source: {
    id: string | null;
    name: string | null;
  };
  title: string | null;
  url: string | null;
  urlToImage: string | null;
  description: string | null;
}

export interface ResponseArray {
  articles: ArticleResponse[];
  status: string;
  totalResults: number;
}

export interface CloseHandler {
  isPopUpOpen: boolean;
  articleId: ArticleResponse;
  index: number;
}

export type RequestParams = {
  preferences: 'everything?' | 'top-headlines?';
  popularity?: 'sortBy=popularity&' | '';
  userPreferencesTags?: string;
  country?:
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
    | 'za'
    | '';
};
