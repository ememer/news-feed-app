import React, { useEffect, useState } from 'react';

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
  const windowWidth = window.matchMedia('(max-width: 1024px)');
  const [fillComponentData, setFillComponentData] = useState(DEFAULT_COMPONENT_DATA);
  const [lazyLoadHeight, setLazyLoadHeight] = useState(200);

  useEffect(() => {
    const windowWidthCheck = () => {
      if (!windowWidth.matches) {
        setLazyLoadHeight(300);
        return;
      }
      setLazyLoadHeight(200);
    };

    windowWidth.addEventListener('change', () => windowWidthCheck());
    return () => windowWidth.removeEventListener('change', windowWidthCheck);
  }, [lazyLoadHeight]);
  return (
    <NewsFeedContext.Provider
      value={{
        fillComponentData,
        setFillComponentData,
        lazyLoadHeight,
      }}
    >
      {children}
    </NewsFeedContext.Provider>
  );
};

export default NewsFeedContextProvider;
