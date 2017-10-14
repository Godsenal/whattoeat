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
  }
  handleStart(){
    var match = [];
    const {activeTags} = this.props;
    for(let i=0; i<data.foods.length; i++){
      if(arrayContains(activeTags, data.foods[i].tags)){
        match.push(data.foods[i].name);
      }
    }
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
    let random = i==MAX_RANDOM - 1?Math.floor(Math.random() * (match.length - 1)) : i % match.length;
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
    const {activeTags, foodResult} = this.props;
    const {status, name} = foodResult;
    return (
      <div className={cx('container')}>
        <div 
          className={cx('startButton',status=='WAITING'||status=='SUCCESS'?'startButton-in-active':null)}
          onClick={status=='WAITING'||status=='SUCCESS'?null:this.handleStart}>
          <span>{status=='WAITING'?'고르는 중...':status=='FAILURE'?'다른 태그!':status==='INIT'?'골라보자!':'이거다!'}</span>
          {status=='WAITING'||status=='SUCCESS'?
            <div className={cx('result','result-in-active')}>
              <span>{name}</span>
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
};

export default Result;