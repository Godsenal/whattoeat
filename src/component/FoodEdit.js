import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import FaClose from 'react-icons/lib/fa/close';
import FaSpoon from 'react-icons/lib/fa/spoon';
import FaTags from 'react-icons/lib/fa/tags';

import {TagFinder} from './';

import styles from '../style/FoodEdit.scss';
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

export default class FoodEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      _id:'',
      value: '',
      tags: [],
      wordValid: true,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    if(this.props.food !== nextProps.food){
      const {_id, name, tags} = nextProps.food;
      this.setState({
        _id,
        value: name,
        tags,
      });
    }
    
    if(this.props.update.status !== nextProps.update.status){
      
      switch(nextProps.update.status){
      case 'SUCCESS':
        toast.info('음식 수정 성공!',{
          className: 'toastContainer_info'
        });
        this.handleToggleModal();
        break;
      case 'FAILURE':
        if(toast.code == 1){
          toast.error('DB에러',{
            className: 'toastContainer'
          });
          this.handleToggleModal();
        }
        else{
          toast.error('음식 수정 실패...이미 있는 이름',{
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
      value,
      wordValid: true,
    });
  }
  handleToggleModal = () => {
    this.setState({
      value :'',
      tags: [],
      wordValid: true,
    });
    this.props.handleToggleModal();
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
  handleEditFood = () => {
    const {_id, value, tags} = this.state;
    if(!value || !value.trim()){
      toast.error('음식 이름을 입력해 주세요!',{
        className: 'toastContainer'
      });
      this.setState({
        wordValid: false,
      });
      return ;
    }
    if(!tags.length){
      toast.error('적어도 한 가지 이상의 태그를 골라주세요!',{
        className: 'toastContainer'
      });
      return ;
    }
    let food = {
      id: _id,
      name: value.trim(),
      tags,
    };
    this.props.updateFood(food);
  }
  render() {
    const {open} = this.props;
    const {value, tags, wordValid} = this.state;
    return (
      <div className={cx('foodEditContainer')}>
        {open?
          <div>
            <div>
              <span><FaSpoon/> 음식명</span>
              <input 
                className={cx('foodEditInput',!wordValid?'foodEditInputError':null)} 
                value={value}
                onChange={this.handleChange} />
            </div>
            <div style={{marginTop: 20}}>
              <span ><FaTags/> 태그 추가</span>
              <TagFinder 
                isAdd={true} 
                handleAddTag={this.handleAddTag}/>
              <div className={cx('foodEditTags')}>
                {tags.map((tag,index)=>{
                  return (
                    <span key={index} className={cx('foodEditTag')}>
                      {tag}
                      <span onClick={()=>this.handleDeleteTag(index)}><FaClose/></span>
                    </span>
                  );
                })}
              </div>
            </div>
            <div className={cx('foodEditConfirm')} onClick={this.handleEditFood}>
              수정!
            </div>
          </div>:null}
      </div>
    );
  }
}
FoodEdit.defaultProps ={
  open: false,
  food: {
    _id: '',
    name: '',
    tags: [],
  },
};
FoodEdit.propTypes = {
  open: PropTypes.bool.isRequired,
  food: PropTypes.object.isRequired,
  update: PropTypes.object.isRequired,

  handleToggleModal: PropTypes.func.isRequired,
  updateFood: PropTypes.func.isRequired,

};
