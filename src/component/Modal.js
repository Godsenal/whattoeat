import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import FaClose from 'react-icons/lib/fa/close';
import styles from '../style/Modal.scss';

const cx = classNames.bind(styles);

export default class Modal extends Component {
  constructor(){
    super();
    this.state = {
      display: 'none',
      show: false,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    /* SCROLL TO TOP WHEN MODAL OPENS AGAIN */
    if(!prevProps.open && this.props.open){
      const el = ReactDOM.findDOMNode(this.content);
      if(el){
        el.scrollTop = 0;
      }
    }
  }
  
  componentWillReceiveProps = (nextProps) => {
    if(!this.props.open && nextProps.open){
      this.setState({
        display: 'block'
      });
      setTimeout(()=>{
        this.setState({
          show: true
        });
      },10);
    }
    else if(this.props.open && !nextProps.open){
      this.setState({
        show: false,
      });
      setTimeout(()=>{
        this.setState({
          display: 'none',
        });
      },300); //transition time
    }
  }
  render() {
    const {display, show} = this.state;
    const {handleToggleModal, header, children, width, height} = this.props;

    return (
      <div style={{display, width, height}} className={cx('modalContainer',show?'modalContainer-active':null)}>
        <div className={cx('modalHeader')}>
          <div><span>{header}</span></div>
        </div>
        <div ref={ref=>this.content=ref} className={cx('modalContent')}>
          {children}
        </div>
        <div className={cx('modalFooter')}>
          <button className={cx('modalAction')} onClick={handleToggleModal}>닫기</button>
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  width: '50%',
  height: '70%'
};
Modal.propTypes ={
  width: PropTypes.string,
  height: PropTypes.string,
  open: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  handleToggleModal: PropTypes.func.isRequired,
};