import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import data from '../tempData.json';
import styles from '../style/Result.scss';

const cx = classNames.bind(styles);
const MAX_RANDOM = 15;
function arrayContains(needle, haystack){
  for(var i = 0; i < needle.length; i++){
    if(haystack.indexOf(needle[i]) === -1)
      return false;
  }
  return true;
}

class Result extends Component {
  constructor(){
    super();
    this.handleStart = this.handleStart.bind(this);
    this.setRandom = this.setRandom.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.activeTags !== nextProps.activeTags){

      if(this.intervalIds){
        for(var i=0; i<this.intervalIds.length; i++){
          clearInterval(this.intervalIds[i]);
        }
      }
      this.props.setFoodResult('INIT');
    }
    if(this.props.getByTags.status==='WAITING' 
      && nextProps.getByTags.status ==='SUCCESS'){
      this.handleGetRandom(nextProps.getByTags.foods);
    }
  }
  handleStart(){
    this.props.getFoodsByTags(this.props.activeTags);
  }
  renderRandom(){
    const {getByTags} = this.props;
    var match = getByTags.foods;
    if(match.length === 0){
      return <span>다른 태그!</span>;
    }
    else if(match.length <= 1){
      this.props.setFoodResult('SUCCESS',match[0]);
      return;
    }
  }
  handleGetRandom(foods){
    var match = foods;
    if(match.length === 0){
      this.props.setFoodResult('FAILURE');
      return ;
    }
    else if(match.length <= 1){
      this.props.setFoodResult('SUCCESS',match[0]);
      return;
    }
    for(let i=0; i< MAX_RANDOM; i++){
      this.setRandom(match,i);
    }
  }
  setRandom(match,i){
    let status = i==MAX_RANDOM - 1?'SUCCESS':'WAITING';
    let random = i==MAX_RANDOM - 1?Math.floor(Math.random() * (match.length)) : i % match.length;
    console.log(random);
    let intervalId = setTimeout(()=> {
      this.props.setFoodResult(status,match[random]);
    }, 200 * i);

    if(this.intervalIds){
      this.intervalIds = [...this.intervalIds,intervalId];
    }
    else{
      this.intervalIds = [this.intervalId];
    }
    
  }
  render() {
    const {foodResult} = this.props;
    const {status, food} = foodResult;
    return (
      <div className={cx('container')}>
        <div 
          className={cx('startButton',status=='WAITING'||status=='SUCCESS'?'startButton-in-active':null)}
          onClick={status=='WAITING'||status=='SUCCESS'?null:this.handleStart}>
          <span>{status=='WAITING'?'고르는 중...':status=='FAILURE'?'다른 태그!':status==='INIT'?'골라보자!':'이거다!'}</span>
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
  setFoodResult: PropTypes.func.isRequired,
  foodResult: PropTypes.object.isRequired,
  getByTags: PropTypes.object.isRequired,

  getFoodsByTags: PropTypes.func.isRequired,
};

export default Result;