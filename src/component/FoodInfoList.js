import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Waypoint from 'react-waypoint';
import { FaBeer, FaTags } from 'react-icons/fa';
import styles from '../style/FoodInfo.scss';
import { FoodInfoListItem } from '.';
const cx = classNames.bind(styles);

const FoodInfoList = ({ search, getList, getFoodsList, ...props }) => {
  const handleScrollMore = scroll => {
    if (scroll.previousPosition === 'below' && !getList.isLast) {
      const offsetId =
        getList.foods.length > 0
          ? getList.foods[getList.foods.length - 1]._id
          : '';
      getFoodsList({
        offsetId,
        limit: 15,
        search,
        isMore: true, // foodList saga 참고
      });
    }
  };
  return (
    <div>
      <div className={cx('foodInfoList')}>
        <div className={cx('foodInfoFood', 'foodInfoHeader')}>
          <FaBeer />
        </div>
        <div className={cx('foodInfoTags', 'foodInfoHeader')}>
          <FaTags />
        </div>
      </div>
      {getList.foods.map((food, i) => (
        <FoodInfoListItem key={i} {...food} {...props} />
      ))}
      <Waypoint onEnter={handleScrollMore} />
    </div>
  );
};

FoodInfoList.propTypes = {
  search: PropTypes.string.isRequired,
  getList: PropTypes.object.isRequired,
  getFoodsList: PropTypes.func.isRequired,
};

export default memo(FoodInfoList);
