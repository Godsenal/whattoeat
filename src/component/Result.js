import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../style/Result.scss';

const cx = classNames.bind(styles);

class Result extends Component {

  componentWillReceiveProps = (nextProps) => {
    if(this.props.activeTags !== nextProps.activeTags){
      this.props.getRandomFoodClear();
    }
  }
  
  handleStart = () => {
    this.props.getRandomFood(this.props.activeTags);
  }
  render() {
    const {getRandom} = this.props;
    const {status, food, isRandom} = getRandom;
    return (
      <div className={cx('container')}>
        <div 
          className={cx('startButton',status=='WAITING'||status=='SUCCESS'?'startButton-in-active':null)}
          onClick={status=='WAITING'||status=='SUCCESS'?null:this.handleStart}>
          <span>{status==='INIT'?'골라보자!':status=='FAILURE'?'다른 태그!':status==='SUCCESS'&&!isRandom?'이거다!':'고르는 중...'}</span>
          {status=='WAITING'||status=='SUCCESS'?
            <div className={cx('result','result-in-active')}>
              <span>{food.name}</span>
            </div>
            :null
          }
        </div>
      </div>
    );
  }
}

Result.defaultProps = {
  activeTags: [],
};
Result.propTypes = {
  activeTags: PropTypes.array.isRequired,
  getRandom: PropTypes.object.isRequired,

  getByTags: PropTypes.object.isRequired,
  getRandomFood: PropTypes.func.isRequired,
  getRandomFoodClear: PropTypes.func.isRequired,
  getFoodsByTags: PropTypes.func.isRequired,
};

export default Result;