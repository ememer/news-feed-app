export interface ArticleResponse {
  author: string;
  content: string;
  published: string;
  source: {
    id: string;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}

export interface ResponseArray {
  articles: ArticleResponse[];
  status: string;
  totalResults: number;
}
