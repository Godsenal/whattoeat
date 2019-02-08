import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import usePrevious from '../hooks/usePrevious';
import styles from '../style/Modal.scss';

const cx = classNames.bind(styles);

function Modal({
  show = false,
  toggleModal,
  header = '',
  width = '50%',
  height = '70%',
  children,
}) {
  const containerEl = useRef(null);
  const prevShow = usePrevious(show);

  useEffect(() => {
    if (prevShow !== show) {
      containerEl.current.scrollTop = 0;
    }
  }, [show]);
  return (
    <div
      style={{ width, height }}
      className={cx('modalContainer', show ? 'modalContainer-active' : null)}
    >
      <div className={cx('modalHeader')}>
        <div>
          <span>{header}</span>
        </div>
      </div>
      <div ref={containerEl} className={cx('modalContent')}>
        {show && children}
      </div>
      <div className={cx('modalFooter')}>
        <button className={cx('modalAction')} onClick={toggleModal}>
          닫기
        </button>
      </div>
    </div>
  );
}
Modal.propTypes = {
  show: PropTypes.bool,
  toggleModal: PropTypes.func.isRequired,
  header: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node,
};
export default Modal;
