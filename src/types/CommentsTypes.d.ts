export interface CommentType {
  id: number;
  author: string;
  text: string;
  edit?: boolean;
  isUpdated?: boolean;
  replays?: {
    id: number;
    author: string;
    text: string;
  }[];
}
