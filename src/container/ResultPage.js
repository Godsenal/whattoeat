import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

import FaAngleDoubleDown from 'react-icons/lib/fa/angle-double-down';
import { Result, Modal } from '../component';
import {setFoodResult, getFoods, getFoodByName, getFoodsByTag, getFoodsByTags, postFoods} from '../actions/food';

import styles from '../style/ResultPage.scss';
const cx = classNames.bind(styles);

class ResultPage extends Component{
  constructor(){
    super();
    this.state = {
      open: false,
    };
  }
  handleToggleModal = () => {
    this.setState({
      open: !this.state.open,
    });
  }
  handleResetTag = () => {
    this.props.setFoodResult('INIT');
  }
  render(){
    const {open} = this.state;
    const {activeTags, foodResult, setFoodResult} = this.props;
    return(
      <div>
        {
          foodResult.status == 'SUCCESS'?
            <div className={cx('resetTagButton')} onClick={this.handleResetTag}>
              <FaAngleDoubleDown />
            </div>:null
        }
        <Result 
          activeTags={activeTags}
          foodResult={foodResult}
          setFoodResult={setFoodResult}/>
        <div className={cx('foodInfoButton')}>
          <a onClick={this.handleToggleModal}>어떤 음식?</a>
        </div>
        <Modal open={open} handleToggleModal={this.handleToggleModal}/>
        
      </div>
    );
  }
}

ResultPage.defaultProps = {
  activeTags: [],
  isMobile: false,
  foodResult: {},
};
ResultPage.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  activeTags: PropTypes.array.isRequired,
  foodResult: PropTypes.object.isRequired,
  setFoodResult : PropTypes.func.isRequired,
  getFoods: PropTypes.func.isRequired,
  getFoodByName: PropTypes.func.isRequired,
  getFoodsByTag: PropTypes.func.isRequired,
  getFoodsByTags: PropTypes.func.isRequired,
  postFoods: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    activeTags: state.tag.activeTags,
    foodResult: state.food.result,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFoodResult : (status, name) => {
      return dispatch(setFoodResult(status, name));
    },
    getFoods : () => {
      return dispatch(getFoods());
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
    postFoods : (foods) => {
      return dispatch(postFoods(foods));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);