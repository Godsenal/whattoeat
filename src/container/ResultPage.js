import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

import FaAngleDoubleDown from 'react-icons/lib/fa/angle-double-down';
import { Result, FoodInfo, FoodAdd } from '../component';
import { 
  getFoods, 
  getRandomFood, 
  getRandomFoodClear, 
  getFoodByName, 
  getFoodsByTag, 
  getFoodsByTags, 
  getFoodsByScroll, 
  getFoodsBySearch,
  postFoods, 
  updateFood
} from '../actions/food';

import styles from '../style/ResultPage.scss';
const cx = classNames.bind(styles);

class ResultPage extends Component{
  render(){
    const {
      isMobile, 
      activeTags, 
      get, 
      update, 
      post, 
      getByScroll, 
      getBySearch,
      getRandom, 
      getRandomFood, 
      getRandomFoodClear, 
      getByTags,  
      getFoodsByTags, 
      getFoodsByScroll,
      getFoodsBySearch, 
      postFoods, 
      updateFood
    } = this.props;
    return(
      <div>
        {
          getRandom.status == 'SUCCESS' && !getRandom.isRandom?
            <div className={cx('resetTagButton')} onClick={getRandomFoodClear}>
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
          isMobile={isMobile}
          update={update}
          updateFood={updateFood}
          getByScroll={getByScroll}
          getBySearch={getBySearch}
          getFoodsByScroll={getFoodsByScroll}
          getFoodsBySearch={getFoodsBySearch} />
        <FoodAdd
          isMobile={isMobile} 
          post={post}
          postFoods={postFoods}/>
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
  post: PropTypes.object.isRequired,
  get: PropTypes.object.isRequired,
  getRandom: PropTypes.object.isRequired,
  getByScroll : PropTypes.object.isRequired,
  getBySearch: PropTypes.object.isRequired,
  getByTags: PropTypes.object.isRequired,
  update: PropTypes.object.isRequired,

  getFoods: PropTypes.func.isRequired,
  getRandomFood: PropTypes.func.isRequired,
  getRandomFoodClear: PropTypes.func.isRequired,
  getFoodByName: PropTypes.func.isRequired,
  getFoodsByTag: PropTypes.func.isRequired,
  getFoodsByTags: PropTypes.func.isRequired,
  getFoodsByScroll : PropTypes.func.isRequired,
  getFoodsBySearch: PropTypes.func.isRequired,
  postFoods: PropTypes.func.isRequired,
  updateFood: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    activeTags: state.tag.activeTags,
    post: state.food.post,
    get: state.food.get,
    getRandom: state.food.getRandom,
    getByTags: state.food.getByTags,
    getByScroll: state.food.getByScroll,
    getBySearch: state.food.getBySearch,
    update: state.food.update,
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
    getFoodsBySearch : (name) => {
      return dispatch(getFoodsBySearch(name));
    },
    postFoods : (foods) => {
      return dispatch(postFoods(foods));
    },
    updateFood : (food) => {
      return dispatch(updateFood(food));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);