import { ArticleResponse, ResponseArray } from '../../types/NewsFeedArticleType';
import { DEF_COMPONENT_DATA } from '../../types/NewsFeedProvider';

export const recentArticles = (
  response: ResponseArray['results'],
  currentIndex: DEF_COMPONENT_DATA,
) => {
  const responseId = response.map((article: ArticleResponse, index: number) => ({
    ...article,
    id: index,
  }));
  const filteredResponse = responseId.filter(
    (item, index) => index !== currentIndex.componentId,
  );
  return filteredResponse.sort(() => 0.5 - Math.random()).slice(0, 3);
};
