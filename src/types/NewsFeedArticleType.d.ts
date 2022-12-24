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
