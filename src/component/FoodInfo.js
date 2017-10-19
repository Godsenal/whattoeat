import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import FaSpoon from 'react-icons/lib/fa/spoon';
import FaTags from 'react-icons/lib/fa/tags';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaSearch from 'react-icons/lib/fa/search';

import {Modal, FoodEdit} from './';
import styles from '../style/FoodInfo.scss';
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

export default class FoodInfo extends Component {
  constructor(){
    super();
    this.state = {
      open: false,
      searchWord: '',
      isSearching: false,
      editOpen: false,
      editFood: {},
    };
  }
  
  handleChange = (e) => {
    let searchWord = checkAndReplace(e.target.value);
    let isSearching = searchWord.length == 0 ? false : this.state.isSearching;
    this.setState({
      searchWord,
      isSearching,
    });
  }
  handlePress = (e) => {
    if(e.key === 'Enter'){
      this.handleSearch();
    }
  }
  handleSearch = () => {
    if(this.state.searchWord && this.state.searchWord.trim().length >= 2){
      this.props.getFoodsBySearch(this.state.searchWord.trim());
      this.setState({
        isSearching: true,
      });
    }
    else{
      toast.error('두 글자 이상의 검색어가 필요합니다!',{
        className: 'toastContainer'
      });
    }
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
      searchWord: '',
      isSearching: false,
      editOpen: false,
      editFood: {},
    });
  }
  handleToggleEditModal = (food = {}) => {
    this.setState({
      editOpen: !this.state.editOpen,
      editFood: food,
    });
  }
  renderFoodInfoList = (food, index) => {
    return (
      <div key={index} className={cx('foodInfoList')}>
        <div className={cx('foodInfoFood')}>{food.name}</div>
        <div className={cx('foodInfoTags')}>{food.tags.map((tag,index)=>{
          return <span key={index}>{tag}</span>;
        })}
        </div>
        <div className={cx('foodInfoEdit')}><FaPencil onClick={()=>this.handleToggleEditModal(food)}/></div>
      </div>
    );
  }
  render() {
    const {open, editOpen, editFood, searchWord, isSearching} = this.state;
    const {getByScroll, getBySearch, isMobile, update, updateFood} = this.props;
    return (
      <div>
        <div className={cx('foodInfoButton')}>
          <a onClick={this.handleToggleModal}>어떤 음식?</a>
        </div>
        <Modal 
          open={open}
          header={'음식 정보'} 
          width={isMobile?'90%':'50%'}
          handleToggleModal={this.handleToggleModal}>
          <div>
            <div className={cx('foodInfoSearch')}>
              <input 
                className={cx('foodInfoSearchInput')}
                value={searchWord}
                autoFocus={true}
                placeholder={'검색어 입력 후 엔터!'}
                onChange={this.handleChange}
                onKeyPress={this.handlePress} />
              <FaSearch
                className={cx('foodInfoSearchIcon')}
                onClick={this.handleSearch}/>
            </div>
            <div className={cx('foodInfoList')}>
              <div className={cx('foodInfoFood','foodInfoHeader')}><FaSpoon /></div>
              <div className={cx('foodInfoTags','foodInfoHeader')}><FaTags /></div>
            </div>
            {
              isSearching&&getBySearch.foods.length?
                getBySearch.foods.map(this.renderFoodInfoList):
                !isSearching && getByScroll.foods.length?
                  getByScroll.foods.map(this.renderFoodInfoList)
                  :null
            }
            {isSearching?null:<Waypoint onEnter={this.handleScrollMore} />}
          </div>
        </Modal>
        <Modal
          open={editOpen}
          header={'음식 수정'} 
          width={isMobile?'80%':'40%'}
          height={'60%'}
          handleToggleModal={this.handleToggleEditModal}>
          <FoodEdit 
            open={editOpen}
            food={editFood}
            update={update}
            updateFood={updateFood}
            handleToggleModal={this.handleToggleEditModal}/>
        </Modal>
      </div>
    );
  }
}

FoodInfo.propTypes = {
  isMobile: PropTypes.bool,
  update: PropTypes.object.isRequired,
  getByScroll: PropTypes.object.isRequired,
  getBySearch: PropTypes.object.isRequired,

  updateFood: PropTypes.func.isRequired,
  getFoodsByScroll:PropTypes.func.isRequired,
  getFoodsBySearch: PropTypes.func.isRequired,
};
