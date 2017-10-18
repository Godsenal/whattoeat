import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

import FaAngleDoubleDown from 'react-icons/lib/fa/angle-double-down';
import { Result, FoodInfo, FoodAdd } from '../component';
import { getFoods, getRandomFood, getRandomFoodClear, getFoodByName, getFoodsByTag, getFoodsByTags, getFoodsByScroll, postFoods} from '../actions/food';

import styles from '../style/ResultPage.scss';
const cx = classNames.bind(styles);

class ResultPage extends Component{
  render(){
    const {activeTags, get, getByScroll, getRandom, getRandomFood, getByTags,  getFoodsByTags, getFoodsByScroll} = this.props;
    return(
      <div>
        {
          getRandom.status == 'SUCCESS' && !getRandom.isRandom?
            <div className={cx('resetTagButton')} onClick={this.handleResetTag}>
              <FaAngleDoubleDown />
            </div>:null
        }
        <Result 
          activeTags={activeTags}
          getByTags={getByTags}
          getRandom={getRandom}
          getFoodsByTags={getFoodsByTags}
          getRandomFood={getRandomFood}
          getRandomFoodClear={getRandomFoodClear}/>
        <FoodInfo
          getByScroll={getByScroll}
          getFoodsByScroll={getFoodsByScroll} />
        <FoodAdd />
      </div>
    );
  }
}

ResultPage.defaultProps = {
  activeTags: [],
  isMobile: false,
};
ResultPage.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  activeTags: PropTypes.array.isRequired,
  get: PropTypes.object.isRequired,
  getRandom: PropTypes.object.isRequired,
  getByScroll : PropTypes.object.isRequired,
  getByTags: PropTypes.object.isRequired,

  getFoods: PropTypes.func.isRequired,
  getRandomFood: PropTypes.func.isRequired,
  getRandomFoodClear: PropTypes.func.isRequired,
  getFoodByName: PropTypes.func.isRequired,
  getFoodsByTag: PropTypes.func.isRequired,
  getFoodsByTags: PropTypes.func.isRequired,
  getFoodsByScroll : PropTypes.func.isRequired,
  postFoods: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    activeTags: state.tag.activeTags,
    get: state.food.get,
    getRandom: state.food.getRandom,
    getByTags: state.food.getByTags,
    getByScroll: state.food.getByScroll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFoods : () => {
      return dispatch(getFoods());
    },
    getRandomFood : (tags) => {
      return dispatch(getRandomFood(tags));
    },
    getRandomFoodClear : () => {
      return dispatch(getRandomFoodClear());
    },
    getFoodByName : (name) => {
      return dispatch(getFoodByName(name));
    },
    getFoodsByTag : (tag) => {
      return dispatch(getFoodsByTag(tag));
    },
    getFoodsByTags : (tags) => {
      return dispatch(getFoodsByTags(tags));
    },
    getFoodsByScroll : (isInitial, id) => {
      return dispatch(getFoodsByScroll(isInitial, id));
    },
    postFoods : (foods) => {
      return dispatch(postFoods(foods));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);