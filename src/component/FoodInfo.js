import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import classNames from 'classnames/bind';

import FaSpoon from 'react-icons/lib/fa/spoon';
import FaTags from 'react-icons/lib/fa/tags';

import {Modal} from './';

import styles from '../style/FoodInfo.scss';
const cx = classNames.bind(styles);

export default class FoodInfo extends Component {
  constructor(){
    super();
    this.state = {
      open: false
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
  render() {
    const {open} = this.state;
    const {getByScroll} = this.props;
    return (
      <div>
        <div className={cx('foodInfoButton')}>
          <a onClick={this.handleToggleModal}>어떤 음식?</a>
        </div>
        <Modal 
          open={open}
          header={'음식 정보'} 
          handleToggleModal={this.handleToggleModal}>
          <div>
            <div className={cx('foodInfoList')}>
              <div className={cx('foodInfoFood','foodInfoHeader')}><FaSpoon /></div>
              <div className={cx('foodInfoTags','foodInfoHeader')}><FaTags /></div>
            </div>
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
                :null
            }
            <Waypoint onEnter={this.handleScrollMore} />
          </div>
        </Modal>
      </div>
    );
  }
}

FoodInfo.propTypes = {
  getByScroll: PropTypes.object.isRequired,

  getFoodsByScroll:PropTypes.func.isRequired,
};
