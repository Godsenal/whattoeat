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
    const {handleToggleModal, header, children} = this.props;

    return (
      <div style={{display}} className={cx('modalContainer',show?'modalContainer-active':null)}>
        <div className={cx('modalHeader')}>
          <div><span>{header}</span></div>
          <a><FaClose onClick={handleToggleModal}/></a>
        </div>
        <div ref={ref=>this.content=ref} className={cx('modalContent')}>
          {children}
        </div>
        <div className={cx('modalFooter')}>
          <div>I am Footer</div>
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {

};
Modal.propTypes ={
  open: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  handleToggleModal: PropTypes.func.isRequired,
};