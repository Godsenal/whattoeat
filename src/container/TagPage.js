import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { TagList, TagFinder } from '../component';
import {addActiveTag, deleteActiveTag, addInactiveTag, deleteInctiveTag, getTags, getRandomTags, postTags } from '../actions/tag';

import 'react-toastify/dist/ReactToastify.min.css';
import styles from '../style/TagPage.scss';
import toastStyle from '../style/Toast.scss';
const cx = classNames.bind(styles);

class TagPage extends Component{
  constructor(){
    super();
    this.state = {
      showTags: [],
    };
  }
  componentDidMount = () => {
    const {getRandomTags} = this.props;
    getRandomTags(10);
  }
  
  componentWillReceiveProps = (nextProps) => {
    if(this.props.getRandom !== nextProps.getRandom){
      if(nextProps.getRandom.status === 'SUCCESS'){
        this.setState({
          showTags: nextProps.getRandom.tags
        });
      }
    }
  }

  handleAddTag = (tag) => {
    const {showTags} = this.state;
    var isIn = false;
    for(var i = 0; i < showTags.length; i++){
      if(showTags[i].name == tag){
        isIn = true;
        break;
      }
    }
    if(!isIn){
      this.setState({
        showTags: [...showTags,{name:tag}]
      });
      this.props.addActiveTag(tag);
    }
    else{
      toast.error('이미 있는 태그입니다.',{
        className: 'toastContainer'
      });
    }
    
  }
  
  render(){
    const {showTags} = this.state;
    const {
      activeTags,
      inactiveTags ,
      isMobile, 
      getRandom,
      getFoodRandom,
      addActiveTag,
      deleteActiveTag, 
      addInactiveTag,
      deleteInactiveTag,
      getRandomTags,
    } = this.props;
    return(
      <div className={cx('tagContainer',getFoodRandom.status !== 'INIT' && getFoodRandom.status !== 'FAILURE'?'tagContainer-inactive':null)}>
        <TagFinder
          handleAddTag={this.handleAddTag}/>
        <TagList 
          isMobile={isMobile}
          activeTags={activeTags}
          inactiveTags={inactiveTags}
          showTags={showTags}
          getRandom={getRandom}
          addActiveTag={addActiveTag}
          deleteActiveTag={deleteActiveTag}
          addInactiveTag={addInactiveTag}
          deleteInactiveTag={deleteInactiveTag}
          getRandomTags={getRandomTags}
          postTags={postTags}/>
      </div>
    );
  }
}

TagPage.defaultProps = {
  activeTags: [],
  isMobile: false,
};
TagPage.propTypes = {
  activeTags: PropTypes.array.isRequired,
  inactiveTags: PropTypes.array.isRequired,
  isMobile: PropTypes.bool.isRequired,
  getRandom: PropTypes.object.isRequired,
  getFoodRandom: PropTypes.object.isRequired,

  addActiveTag: PropTypes.func.isRequired,
  deleteActiveTag: PropTypes.func.isRequired,
  addInactiveTag: PropTypes.func.isRequired,
  deleteInactiveTag: PropTypes.func.isRequired,
  getTags: PropTypes.func.isRequired,
  getRandomTags: PropTypes.func.isRequired,
  postTags: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    activeTags: state.tag.activeTags,
    inactiveTags: state.tag.inactiveTags,
    getRandom: state.tag.getRandom,
    getFoodRandom: state.food.getRandom,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addActiveTag : (tag) => {
      return dispatch(addActiveTag(tag));
    },
    deleteActiveTag : (index) => {
      return dispatch(deleteActiveTag(index));
    },
    addInactiveTag : (tag) => {
      return dispatch(addInactiveTag(tag));
    },
    deleteInactiveTag : (index) => {
      return dispatch(deleteInctiveTag(index));
    },
    getTags : () => {
      return dispatch(getTags());
    },
    getRandomTags : (size) => {
      return dispatch(getRandomTags(size));
    },
    postTags : (tags) => {
      return dispatch(postTags(tags));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagPage);