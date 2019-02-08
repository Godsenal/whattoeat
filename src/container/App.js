import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';
import { NotiPortal } from 'renoti';
import { Header } from '../component';
import { TagPage, ResultPage } from './';
import notifier from '../utils/notifier';
import WindowContext from '../contexts/window';
import styles from '../style/App.scss';

const cx = classNames.bind(styles);

function App() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 800,
  });
  const setWindowSize = useCallback(
    () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 800,
      }),
    [],
  );
  useEffect(() => {
    window.addEventListener('resize', setWindowSize);
    return () => window.removeEventListener('resize', setWindowSize);
  }, []);
  return (
    <WindowContext.Provider value={{ size, setSize }}>
      <div className={cx('mainContainer')}>
        <Header />
        <TagPage />
        <ResultPage isMobile={size.isMobile} />
        <NotiPortal notifier={notifier} />
      </div>
    </WindowContext.Provider>
  );
}

export default App;
