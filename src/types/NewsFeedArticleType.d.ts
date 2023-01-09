export interface ArticleResponse {
  creator: string[] | null;
  content: string | null;
  pubDate: string | null;
  source_id: string | null;
  title: string | null;
  link: string | null;
  image_url: string | null;
  description: string | null;
  vote?: number;
  messages?: number;
}

export interface ResponseArray {
  results: ArticleResponse[];
  status: string;
  totalResults: number;
  nextPage?: number | null;
}

export interface CloseHandler {
  isPopUpOpen: boolean;
  articleId: ArticleResponse;
  index: number;
}
