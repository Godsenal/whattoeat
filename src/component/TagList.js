import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../style/TagList.scss';


const cx = classNames.bind(styles);
class TagList extends Component {
  constructor(){
    super();
  }
  handleClick(tag, isActive, isInactive, activeIndex){
    const {addActiveTag, deleteActiveTag, addInactiveTag, deleteInactiveTag} = this.props;
    if(isActive){
      deleteActiveTag(activeIndex);
      addInactiveTag(tag);
    }
    else if(isInactive){
      deleteInactiveTag(activeIndex);
    }
    else{
      addActiveTag(tag);
    }
    
  }
  render(){
    const {activeTags, inactiveTags, showTags, isMobile} = this.props;
    return (
      <div className={cx('tagListInnerContainer')}>
        {showTags.map((tag,index)=>{
          let isActive = false;
          let isInactive = false;
          let activeIndex = 0;
          for(var i=0; i<activeTags.length; ++i){
            if(activeTags[i] == tag.name){
              isActive = true;
              activeIndex = i;
              break;
            }
          }
          if(!isActive){
            for(var j=0; j<inactiveTags.length; ++j){
              if(inactiveTags[j] == tag.name){
                isInactive = true;
                activeIndex = j;
                break;
              }
            }
          }
          
          return(
            <div
              className={cx(isActive?'activeTag':isInactive?'inactiveTag':'normalTag')}
              onClick={()=>this.handleClick(tag.name,isActive,isInactive,activeIndex)} 
              key={index}>{tag.name}</div>
          );
        })}
      </div>
    );
  }
}

TagList.defaultProps = {
  isMobile: false,
  activeTags: [],
  showTags: [],
  addActiveTag: ()=>{console.log('TagList props error');},
  deleteActiveTag: ()=>{console.log('TagList props error');},
};
TagList.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  activeTags: PropTypes.array.isRequired,
  inactiveTags: PropTypes.array.isRequired,
  showTags: PropTypes.array.isRequired,
  getRandom: PropTypes.object.isRequired,

  addActiveTag: PropTypes.func.isRequired,
  addInactiveTag: PropTypes.func.isRequired,
  deleteActiveTag: PropTypes.func.isRequired,
  deleteInactiveTag: PropTypes.func.isRequired,
  getRandomTags: PropTypes.func.isRequired,
};
export default TagList;