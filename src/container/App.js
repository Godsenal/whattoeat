import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

import { Header} from '../component';
import { TagPage, ResultPage } from './';
import {initEnvironment} from '../actions/environment';
import styles from '../style/App.scss';
const cx = classNames.bind(styles);

class App extends Component{
  constructor(){
    super();
  }
  componentDidMount() {
    window.addEventListener('resize', this.props.initEnvironment);
  }
  componentWillUnmount() {
    window.removeEventListener('resize',this.props.initEnvironment);
  }
  render(){
    const {environment} = this.props;
    const {screenWidth, screenHeight, isMobile} = environment;
    return(
      <div className={cx('mainContainer')}>
        <Header />
        <TagPage 
          isMobile={isMobile}/>
        <ResultPage
          isMobile={isMobile}/>
      </div>
    );
  }
  
}
App.defaultProps = {
  environment : {},
  initEnvironment : ()=>{console.log('init Environment props error.');}
};
App.propTypes = {
  environment : PropTypes.object.isRequired,
  initEnvironment : PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    environment: state.environment,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    initEnvironment : () => {
      return dispatch(initEnvironment());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
