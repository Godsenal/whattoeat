import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

import { TagList, TagFinder } from '../component';
import {
  addActiveTag,
  deleteActiveTag,
  getTags,
  getRandomTags,
  postTags,
} from '../actions/tag';

import styles from '../style/TagPage.scss';
const cx = classNames.bind(styles);

function TagPage({
  activeTags,
  getFoodRandom,
  getRandom,
  getRandomTags,
  ...props
}) {
  const [showTags, setShowTags] = useState([]);
  // mount 시 random 태그 10개 fetch
  useEffect(() => {
    getRandomTags(10);
  }, []);
  // random tag 바뀔시 현재 state 업데이트( 왜 이렇게 짰을까 .. )
  useEffect(() => {
    setShowTags(getRandom.tags);
  }, [getRandom.tags]);

  const addTag = useCallback(
    tag => {
      if (!showTags.some(showTag => showTag.name === tag.name)) {
        setShowTags([...showTags, { name: tag }]);
        addActiveTag(tag);
      }
    },
    [showTags],
  );
  return (
    <div
      className={cx(
        'tagContainer',
        getFoodRandom.status !== 'INIT' &&
          getFoodRandom.status !== 'FAILURE' &&
          'tagContainer-inactive',
      )}
    >
      <TagFinder handleAddTag={addTag} />
      <TagList {...props} activeTags={activeTags} showTags={showTags} />
    </div>
  );
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

  addActiveTag: PropTypes.func.isRequired,
  deleteActiveTag: PropTypes.func.isRequired,
  getTags: PropTypes.func.isRequired,
  getRandomTags: PropTypes.func.isRequired,
  postTags: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    activeTags: state.tag.activeTags,
    getRandom: state.tag.getRandom,
    getFoodRandom: state.food.getRandom,
  };
};

const mapDispatchToProps = {
  addActiveTag,
  deleteActiveTag,
  getTags,
  getRandomTags,
  postTags,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TagPage);
