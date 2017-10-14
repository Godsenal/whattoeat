import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

import FaAngleDoubleDown from 'react-icons/lib/fa/angle-double-down';
import { Header, TagList, Result } from '../component';
import {addActiveTag, deleteActiveTag } from '../actions/tag';
import {setFoodResult} from '../actions/food';
import {initEnvironment} from '../actions/environment';
import styles from '../style/App.scss';

const cx = classNames.bind(styles);

class App extends Component{
  constructor(){
    super();
    this.handleResetTag = this.handleResetTag.bind(this);
  }
  componentDidMount() {
    window.addEventListener('resize', this.props.initEnvironment);
  }
  componentWillUnmount() {
    window.removeEventListener('resize',this.props.initEnvironment);
  }
  handleResetTag(){
    this.props.setFoodResult('INIT');
  }
  render(){
    const {environment, tag, food, addActiveTag, deleteActiveTag, setFoodResult} = this.props;
    const {screenWidth, screenHeight, isMobile} = environment;
    const {activeTags} = tag;
    const foodResult = food.result;
    return(
      <div className={cx('mainContainer')}>
        <Header />
        <div className={cx('tagListContainer',foodResult.status !== 'INIT' && foodResult.status !== 'FAILURE'?'tagList-inactive':null)}>
          <TagList 
            isMobile={isMobile}
            activeTags={activeTags}
            addActiveTag={addActiveTag}
            deleteActiveTag={deleteActiveTag}/>
        </div>
        {
          foodResult.status == 'SUCCESS'?
            <div className={cx('resetTagButton')} onClick={this.handleResetTag}>
              <FaAngleDoubleDown />
            </div>:null
        }
        <Result 
          activeTags={activeTags}
          foodResult={foodResult}
          setFoodResult={setFoodResult}/>
      </div>
    );
  }
  
}
App.defaultProps = {
  environment : {},
  tag: {},
  food: {},
  setFoodResult: ()=>{console.log('App props error.');},
  addActiveTag: ()=>{console.log('App props error.');},
  deleteActiveTag: ()=>{console.log('App props error.');},
  initEnvironment : ()=>{console.log('init Environment props error.');}
};
App.propTypes = {
  tag: PropTypes.object.isRequired,
  food: PropTypes.object.isRequired,
  setFoodResult: PropTypes.func.isRequired,
  addActiveTag: PropTypes.func.isRequired,
  deleteActiveTag: PropTypes.func.isRequired,
  environment : PropTypes.object.isRequired,
  initEnvironment : PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    environment: state.environment,
    tag: state.tag,
    food: state.food,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    initEnvironment : () => {
      return dispatch(initEnvironment());
    },
    addActiveTag : (tag) => {
      return dispatch(addActiveTag(tag));
    },
    deleteActiveTag : (index) => {
      return dispatch(deleteActiveTag(index));
    },
    setFoodResult : (status, name) => {
      return dispatch(setFoodResult(status, name));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
