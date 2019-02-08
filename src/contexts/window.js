import { createContext } from 'react';

export default createContext({
  width: window.innerWidth,
  height: window.innerHeight,
  isMobile: window.innerWidth < 800,
});
