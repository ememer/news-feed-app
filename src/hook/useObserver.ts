import { useRef, useState } from 'react';

export const useObserve = () => {
  const observer = useRef<IntersectionObserver | null>();
  const [shouldReRequest, setShouldReRequest] = useState(false);

  const observeElement = (
    domElement: HTMLElement,
    isLoaded: boolean,
    isPage: number | null,
  ) => {
    console.log(domElement, isLoaded, isPage);

    if (!isLoaded) {
      return;
    }
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && isPage !== null) {
        setShouldReRequest(true);
      }
    });

    if (domElement) {
      observer.current.observe(domElement);
    }
  };

  return { shouldReRequest, observeElement, setShouldReRequest };
};
