import React, { useState } from 'react';

import { NewsFeedContext } from './NewsFeedContext';

interface Props {
  children: React.ReactNode;
}

const DEFAULT_COMPONENT_DATA = {
  componentId: 0,
  voteReactionCount: 0,
  messagesReactionCount: 0,
};

const NewsFeedContextProvider = ({ children }: Props) => {
  const [fillComponentData, setFillComponentData] = useState(DEFAULT_COMPONENT_DATA);

  return (
    <NewsFeedContext.Provider
      value={{
        fillComponentData,
        setFillComponentData,
      }}
    >
      {children}
    </NewsFeedContext.Provider>
  );
};

export default NewsFeedContextProvider;
