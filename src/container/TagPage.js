import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

import { TagList, TagFinder } from '../component';
import {addActiveTag, deleteActiveTag, getTags, getRandomTags, getSuggestTags, postTags } from '../actions/tag';

import styles from '../style/TagPage.scss';
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
      if(showTags[i] == tag){
        isIn = true;
        break;
      }
    }
    if(isIn){
      this.setState({
        showTags: [...showTags,tag]
      });
      this.props.addActiveTag(tag);
    }
    
  }
  
  render(){
    const {showTags} = this.state;
    const {
      activeTags, 
      isMobile, 
      getRandom,
      getFoodRandom,
      getSuggest, 
      addActiveTag,
      deleteActiveTag, 
      getRandomTags,
      getSuggestTags
    } = this.props;
    return(
      <div className={cx('tagContainer',getFoodRandom.status !== 'INIT' && getFoodRandom.status !== 'FAILURE'?'tagContainer-inactive':null)}>
        <TagFinder
          handleAddTag={this.handleAddTag} 
          getSuggest={getSuggest}
          getSuggestTags={getSuggestTags}/>
        <TagList 
          isMobile={isMobile}
          activeTags={activeTags}
          showTags={showTags}
          getRandom={getRandom}
          addActiveTag={addActiveTag}
          deleteActiveTag={deleteActiveTag}
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
  isMobile: PropTypes.bool.isRequired,
  getRandom: PropTypes.object.isRequired,
  getFoodRandom: PropTypes.object.isRequired,
  getSuggest: PropTypes.object.isRequired,

  addActiveTag: PropTypes.func.isRequired,
  deleteActiveTag: PropTypes.func.isRequired,
  getTags: PropTypes.func.isRequired,
  getRandomTags: PropTypes.func.isRequired,
  getSuggestTags: PropTypes.func.isRequired,
  postTags: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    activeTags: state.tag.activeTags,
    getRandom: state.tag.getRandom,
    getFoodRandom: state.food.getRandom,
    getSuggest: state.tag.getSuggest,
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
    getTags : () => {
      return dispatch(getTags());
    },
    getRandomTags : (size) => {
      return dispatch(getRandomTags(size));
    },
    getSuggestTags : (word) => {
      return dispatch(getSuggestTags(word));
    },
    postTags : (tags) => {
      return dispatch(postTags(tags));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagPage);