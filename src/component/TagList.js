import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../style/TagList.scss';

const cx = classNames.bind(styles);
class TagList extends Component {
  constructor() {
    super();
  }
  handleClick(tag, isActive, activeIndex) {
    const { addActiveTag, deleteActiveTag } = this.props;
    if (isActive) {
      deleteActiveTag(activeIndex);
    } else {
      addActiveTag(tag);
    }
  }
  render() {
    const { activeTags, showTags } = this.props;
    return (
      <div className={cx('tagListInnerContainer')}>
        {showTags.map((tag, index) => {
          let isActive = false;
          let activeIndex = 0;
          for (var i = 0; i < activeTags.length; ++i) {
            if (activeTags[i] == tag.name) {
              isActive = true;
              activeIndex = i;
              break;
            }
          }
          return (
            <div
              className={cx(isActive ? 'activeTag' : 'normalTag')}
              onClick={() => this.handleClick(tag.name, isActive, activeIndex)}
              key={index}
            >
              {tag.name}
            </div>
          );
        })}
      </div>
    );
  }
}

TagList.defaultProps = {
  activeTags: [],
  showTags: [],
  addActiveTag: () => {
    console.log('TagList props error');
  },
  deleteActiveTag: () => {
    console.log('TagList props error');
  },
};
TagList.propTypes = {
  activeTags: PropTypes.array.isRequired,
  showTags: PropTypes.array.isRequired,

  addActiveTag: PropTypes.func.isRequired,
  deleteActiveTag: PropTypes.func.isRequired,
};
export default TagList;
