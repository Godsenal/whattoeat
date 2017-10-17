import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';

import FaAngleDoubleDown from 'react-icons/lib/fa/angle-double-down';
import { Result, Modal } from '../component';
import { getFoods, getRandomFood, getRandomFoodClear, getFoodByName, getFoodsByTag, getFoodsByTags, getFoodsByScroll, postFoods} from '../actions/food';

import styles from '../style/ResultPage.scss';
const cx = classNames.bind(styles);

class ResultPage extends Component{
  constructor(){
    super();
    this.state = {
      open: false,
    };
  }
  handleScrollMore = (scroll) => {
    if(scroll.previousPosition === 'below' && !this.props.getByScroll.isLast){
      this.props.getFoodsByScroll(false,this.props.getByScroll.foods[this.props.getByScroll.foods.length -1]._id);
    }
  }
  handleToggleModal = () => {
    if(!this.state.open){
      this.props.getFoodsByScroll(true);
    }
    this.setState({
      open: !this.state.open,
    });
  }
  handleResetTag = () => {
    this.props.getRandomFoodClear();
  }
  render(){
    const {open} = this.state;
    const {activeTags, get, getByScroll, getRandom, getRandomFood, getByTags,  getFoodsByTags,} = this.props;
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
        <div className={cx('foodInfoButton')}>
          <a onClick={this.handleToggleModal}>어떤 음식?</a>
        </div>
        <Modal 
          open={open}
          header={'음식 정보'} 
          handleToggleModal={this.handleToggleModal}>
          <div>
            {
              getByScroll.foods.length?
                getByScroll.foods.map((food,index)=>{
                  return (
                    <div key={index} className={cx('foodInfoList')}>
                      <div className={cx('foodInfoFood')}>{food.name}</div>
                      <div className={cx('foodInfoTags')}>{food.tags.map((tag,index)=>{
                        return <span key={index}>{tag}</span>;
                      })}
                      </div>
                    </div>
                  );
                })
                :<div>No Food</div>
            }
            <Waypoint onEnter={this.handleScrollMore} />
          </div>
        </Modal>
        
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