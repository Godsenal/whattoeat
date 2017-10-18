import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import FaClose from 'react-icons/lib/fa/close';
import FaSpoon from 'react-icons/lib/fa/spoon';
import FaTags from 'react-icons/lib/fa/tags';

import {Modal, TagFinder} from './';

import styles from '../style/FoodAdd.scss';
const cx = classNames.bind(styles);

export default class FoodAdd extends Component {
  constructor(){
    super();
    this.state = {
      open: false,
      tags: [],
    };
  }
  handleToggleModal = () => {
    this.setState({
      open: !this.state.open,
    });
  }
  handleAddTag = (tag) => {
    const {tags} = this.state;
    var isIn = false;
    for(var i = 0; i < tags.length; i++){
      if(tags[i] == tag){
        isIn = true;
        break;
      }
    }
    if(!isIn){
      this.setState({
        tags: [...tags,tag]
      });
    }
    else{
      toast.error('이미 있는 태그입니다.',{
        className: 'toastContainer'
      });
    }
    
  }
  handleDeleteTag = (index) => {
    const {tags} = this.state;
    this.setState({
      tags: [...tags.slice(0,index),...tags.slice(index+1)]
    });
  }
  render() {
    const {open, tags} = this.state;
    return (
      <div>
        <div className={cx('foodAddButton')}>
          <a onClick={this.handleToggleModal}>음식 추가!</a>
        </div>
        <Modal 
          open={open}
          header={'음식 정보'} 
          handleToggleModal={this.handleToggleModal}>
          <div className={cx('foodAddContainer')}>
            <div>
              음식명
              <input className={cx('foodAddInput')}/>
            </div>
            
            <TagFinder 
              isAdd={true} 
              handleAddTag={this.handleAddTag}/>
            <div className={cx('foodAddTags')}>
              {tags.map((tag,index)=>{
                return (
                  <span key={index} className={cx('foodAddTag')}>
                    {tag}
                    <span onClick={()=>this.handleDeleteTag(index)}><FaClose/></span>
                  </span>
                );
              })}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

FoodAdd.propTypes = {
};
