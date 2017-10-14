import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import data from '../tempData.json';
import styles from '../style/TagList.scss';

const cx = classNames.bind(styles);
class TagList extends Component {
  constructor(){
    super();
  }
  handleClick(tag,isActive,activeIndex){
    const {addActiveTag, deleteActiveTag} = this.props;
    if(isActive){
      deleteActiveTag(activeIndex);
    }
    else{
      addActiveTag(tag);
    }
    
  }
  render(){
    const {activeTags, isMobile} = this.props;
    return (
      <div className={cx('tagListInnerContainer')}>
        {data.tags.map((tag,index)=>{
          let isActive = false;
          let activeIndex = 0;
          for(var i=0; i<activeTags.length; ++i){
            if(activeTags[i] == tag){
              isActive = true;
              activeIndex = i;
              break;
            }
          }
          return(
            <div
              className={cx(isActive?'activeTag':'normalTag')}
              onClick={()=>this.handleClick(tag,isActive,activeIndex)} 
              key={index}>{tag}</div>
          );
        })}
      </div>
    );
  }
}

TagList.defaultProps = {
  isMobile: false,
  activeTags: [],
  addActiveTag: ()=>{console.log('TagList props error');},
  deleteActiveTag: ()=>{console.log('TagList props error');},
};
TagList.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  activeTags: PropTypes.array.isRequired,
  addActiveTag: PropTypes.func.isRequired,
  deleteActiveTag: PropTypes.func.isRequired,
};
export default TagList;