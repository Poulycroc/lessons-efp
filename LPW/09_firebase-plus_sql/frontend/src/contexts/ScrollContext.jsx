import React, { useContext, useState, useEffect } from 'react';

const ScrollContext = React.createContext({});

export const useScrollPosition = () => {
  const { scrollPosition, isEndOfScroll } = useContext(ScrollContext);
  return { scrollPosition, isEndOfScroll };
};

export const ScrollProvider = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [isEndOfScroll, setIsEndOfScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({ x: window.pageXOffset, y: window.pageYOffset });

      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      setIsEndOfScroll(window.pageYOffset + windowHeight >= documentHeight - 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const value = {
    scrollPosition,
    isEndOfScroll,
  };

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
};
