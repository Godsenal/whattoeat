import React from 'react';
import classNames from 'classnames/bind';

import styles from '../style/Header.scss';

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx('headerContainer')}>
      <div className={cx('headerInnerContainer')}>
        <span>무엇을 먹을까?</span>
      </div>
    </div>
  );
}

export default Header;