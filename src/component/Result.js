import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../style/Result.scss';

const cx = classNames.bind(styles);

function Result({ activeTags, getRandom, getRandomFood }) {
  const { status, food, isRandom } = getRandom;

  const handleStart = useCallback(
    () =>
      (status === 'INIT' || status === 'SUCCESS') && getRandomFood(activeTags),
    [activeTags, status],
  );

  return (
    <div className={cx('container')}>
      <div
        className={cx(
          'startButton',
          (status == 'WAITING' || status == 'SUCCESS') &&
            'startButton-in-active',
        )}
        onClick={handleStart}
      >
        <span>
          {status === 'INIT'
            ? '골라보자!'
            : status == 'FAILURE'
              ? '다른 태그!'
              : status === 'SUCCESS' && !isRandom
                ? '이거다!'
                : '고르는 중...'}
        </span>
        {status == 'WAITING' ||
          (status == 'SUCCESS' && (
            <div className={cx('result', 'result-in-active')}>
              <span>{food.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
Result.defaultProps = {
  activeTags: [],
};
Result.propTypes = {
  activeTags: PropTypes.array.isRequired,
  getRandom: PropTypes.object.isRequired,
  getRandomFood: PropTypes.func.isRequired,
};

export default Result;
