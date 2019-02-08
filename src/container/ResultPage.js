import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

import { FaAngleDoubleDown } from 'react-icons/fa';
import { Result, FoodInfo, FoodAdd } from '../component';
import {
  getFoods,
  getFoodsList,
  clearFoodsList,
  getRandomFood,
  getFoodByName,
  postFoods,
  updateFood,
} from '../actions/food';

import styles from '../style/ResultPage.scss';

const cx = classNames.bind(styles);

class ResultPage extends Component {
  render() {
    const { clearFoodsList, getRandom } = this.props;
    return (
      <div>
        {getRandom.status == 'SUCCESS' && !getRandom.isRandom && (
          <div className={cx('resetTagButton')} onClick={clearFoodsList}>
            <FaAngleDoubleDown />
          </div>
        )}
        <Result {...this.props} />
        <FoodInfo {...this.props} />
        <FoodAdd {...this.props} />
      </div>
    );
  }
}

ResultPage.defaultProps = {
  activeTags: [],
};
ResultPage.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  activeTags: PropTypes.array.isRequired,
  post: PropTypes.object.isRequired,
  get: PropTypes.object.isRequired,
  getList: PropTypes.object.isRequired,
  getRandom: PropTypes.object.isRequired,
  update: PropTypes.object.isRequired,

  getFoods: PropTypes.func.isRequired,
  getFoodsList: PropTypes.func.isRequired,
  clearFoodsList: PropTypes.func.isRequired,
  getRandomFood: PropTypes.func.isRequired,
  getFoodByName: PropTypes.func.isRequired,
  postFoods: PropTypes.func.isRequired,
  updateFood: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    activeTags: state.tag.activeTags,
    post: state.food.post,
    get: state.food.get,
    getList: state.food.getList,
    getRandom: state.food.getRandom,
    getByTags: state.food.getByTags,
    getByScroll: state.food.getByScroll,
    getBySearch: state.food.getBySearch,
    update: state.food.update,
  };
};

const mapDispatchToProps = {
  getFoods,
  getFoodsList,
  clearFoodsList,
  getRandomFood,
  getFoodByName,
  postFoods,
  updateFood,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultPage);
