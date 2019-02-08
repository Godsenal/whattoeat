import React from 'react';
import PropTypes from 'prop-types';
import { FaPencilAlt } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from '../style/FoodInfo.scss';
const cx = classNames.bind(styles);

const FoodInfoListItem = ({ handleFoodClick, ...food }) => (
  <div className={cx('foodInfoList')}>
    <div className={cx('foodInfoFood')}>{food.name}</div>
    <div className={cx('foodInfoTags')}>
      {food.tags.map((tag, index) => {
        return <span key={index}>{tag}</span>;
      })}
    </div>
    <div className={cx('foodInfoEdit')}>
      <FaPencilAlt onClick={() => handleFoodClick(food)} />
    </div>
  </div>
);

FoodInfoListItem.propTypes = {
  handleFoodClick: PropTypes.func.isRequired,
};
export default FoodInfoListItem;
