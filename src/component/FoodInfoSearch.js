import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from '../style/FoodInfo.scss';
const cx = classNames.bind(styles);

const reg = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

const FoodInfoSearch = ({ search, setSearch, getFoodsList }) => {
  const handleChange = e => setSearch(e.target.value);
  const handlePress = e => e.key === 'Enter' && handleSearch();
  const handleSearch = useCallback(() => {
    if (reg.test(search) || search.length < 2) {
      // 잘못된경우
      return;
    }
    getFoodsList({ limit: 15, search: search.trim() });
  }, [search]);
  return (
    <div className={cx('foodInfoSearch')}>
      <input
        className={cx('foodInfoSearchInput')}
        value={search}
        autoFocus={true}
        placeholder={'검색어 입력 후 엔터!'}
        onChange={handleChange}
        onKeyPress={handlePress}
      />
      <FaSearch className={cx('foodInfoSearchIcon')} onClick={handleSearch} />
    </div>
  );
};

FoodInfoSearch.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  getFoodsList: PropTypes.func.isRequired,
};

export default memo(FoodInfoSearch);
