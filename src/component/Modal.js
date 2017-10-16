import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import FaClose from 'react-icons/lib/fa/close';
import styles from '../style/Modal.scss';

const cx = classNames.bind(styles);
const blockStyle = {
  display: 'block'
};
const endStyle = {
  display: 'none'
};
export default class Modal extends Component {
  constructor(){
    super();
    this.state = {
      block: false,
    };
  }
  
  render() {
    const {block} = this.state;
    const {open, handleToggleModal} = this.props;
    return (
      <div style={!block&&!open?endStyle:blockStyle} className={cx('modalContainer',open?'modalContainer-active':null)} onTransitionEnd={()=>this.setState({block:false})}>
        <div className={cx('modalInnerContainer')}>
          <div className={cx('modalHeader')}>
            <div><span>Title</span></div>
            <a onClick={handleToggleModal}><FaClose /></a>
          </div>
          <div className={cx('modalContent')}>
            
          </div>
          <div className={cx('modalFooter')}>
            <h1>I am Footer</h1>
          </div>
        </div> 
      </div>
    );
  }
}

Modal.defaultProps = {

};
Modal.propTypes ={
  open: PropTypes.bool.isRequired,
  handleToggleModal: PropTypes.func.isRequired,
};