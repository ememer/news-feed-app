import { Dispatch, SetStateAction } from 'react';

type DEF_COMPONENT_DATA = {
  componentId: number;
  voteReactionCount: number;
  messagesReactionCount: number;
};

export interface NewsFeedContextTypes {
  fillComponentData: DEF_COMPONENT_DATA;
  setFillComponentData: Dispatch<SetStateAction<DEF_COMPONENT_DATA>>;
  lazyLoadHeight: number;
}
