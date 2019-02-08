import React, { useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { Modal, FoodEdit, FoodInfoList, FoodInfoSearch } from '.';
import styles from '../style/FoodInfo.scss';
const cx = classNames.bind(styles);

const initialState = {
  open: false,
  search: '',
  editOpen: false,
  editFood: {},
};

function FoodInfo({
  isMobile,
  getList,
  getFoodsList,
  update,
  updateFood,
  ...props
}) {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState,
  );
  const { search, open, editOpen, editFood } = state;

  const setSearch = useCallback(val => setState({ search: val }), []);
  const toggleModal = useCallback(() => {
    if (!open) {
      getFoodsList({ limit: 15 });
    }
    setState({
      ...initialState,
      open: !open,
    });
  }, [open]);
  const toggleEditModal = useCallback(
    () => setState({ editOpen: false, editFood: {} }),
    [],
  );
  const handleFoodClick = useCallback(
    food => setState({ editOpen: true, editFood: food }),
    [],
  );

  return (
    <div>
      <div className={cx('foodInfoButton')}>
        <a onClick={toggleModal}>어떤 음식?</a>
      </div>
      <Modal
        show={open}
        header={'음식 정보'}
        width={isMobile ? '90%' : '50%'}
        toggleModal={toggleModal}
      >
        <FoodInfoSearch
          search={search}
          setSearch={setSearch}
          getFoodsList={getFoodsList}
        />
        <FoodInfoList
          {...props}
          search={search}
          getList={getList}
          getFoodsList={getFoodsList}
          handleFoodClick={handleFoodClick}
        />
      </Modal>
      <Modal
        show={editOpen}
        header={'음식 수정'}
        width={isMobile ? '80%' : '40%'}
        height={'60%'}
        toggleModal={toggleEditModal}
      >
        <FoodEdit
          open={editOpen}
          food={editFood}
          update={update}
          updateFood={updateFood}
          handleToggleModal={toggleEditModal}
        />
      </Modal>
    </div>
  );
}

FoodInfo.propTypes = {
  isMobile: PropTypes.bool,
  getList: PropTypes.object.isRequired,
  update: PropTypes.object.isRequired,

  updateFood: PropTypes.func.isRequired,
  getFoodsList: PropTypes.func.isRequired,
};

export default FoodInfo;
