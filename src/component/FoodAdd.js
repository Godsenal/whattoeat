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

const re=/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

const checkAndReplace = (value) => {
  let word = value;
  let hasSpecial = re.test(word);
  if(word && hasSpecial){
    word = word.replace(re,'');
  }
  return word;
};

export default class FoodAdd extends Component {
  constructor(){
    super();
    this.state = {
      open: false,
      tags: [],
      value: '',
    };
  }
  componentWillReceiveProps = (nextProps) => {
    if(this.props.post.status !== nextProps.post.status){
      
      switch(nextProps.post.status){
      case 'SUCCESS':
        toast.info('음식 등록 성공!',{
          className: 'toastContainer_info'
        });
        this.setState({
          open: false,
          tags: [],
          value: '',
        });
        break;
      case 'FAILURE':
        if(toast.code == 1){
          toast.error('DB에러',{
            className: 'toastContainer'
          });
        }
        else{
          toast.error('음식 등록 실패...이미 있는 이름',{
            className: 'toastContainer'
          });
          this.setState({
            value: '',
          });
        }
        break;
      }
    }
  }
  
  handleChange = (e) => {
    let value = checkAndReplace(e.target.value);
    this.setState({
      value
    });
  }
  handleToggleModal = () => {
    this.setState({
      open: !this.state.open,
      value :'',
      tags: [],
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
  handleAddFood = () => {
    const {value, tags} = this.state;
    if(!value.trim()){
      /* Do Something */
      return ;
    }
    if(!tags.length){
      /* Do Something */
      return ;
    }
    this.props.postFoods([{name: value.trim(), tags}]);
  }
  render() {
    const {open, value, tags} = this.state;
    return (
      <div>
        <div className={cx('foodAddButton')}>
          <a onClick={this.handleToggleModal}>음식 추가!</a>
        </div>
        <Modal 
          open={open}
          header={'음식 추가'} 
          handleToggleModal={this.handleToggleModal}>
          <div className={cx('foodAddContainer')}>
            <div>
              <span><FaSpoon/> 음식명</span>
              <input 
                className={cx('foodAddInput')} 
                value={value}
                onChange={this.handleChange} />
            </div>
            
            <div style={{marginTop: 20}}>
              <span ><FaTags/> 태그 추가</span>
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
            <div className={cx('foodAddConfirm')} onClick={this.handleAddFood}>
              추가!
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

FoodAdd.propTypes = {
  post: PropTypes.object.isRequired,
  postFoods: PropTypes.func.isRequired,
};
