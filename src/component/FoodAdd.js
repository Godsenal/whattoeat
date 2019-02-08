import React, {
  useReducer,
  useContext,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import notifier from '../utils/notifier';

import { FaRegTimesCircle, FaBeer, FaTags } from 'react-icons/fa';
import WindowContext from '../contexts/window';
import { Modal, TagFinder } from './';

import styles from '../style/FoodAdd.scss';
const cx = classNames.bind(styles);

function FoodAdd({ post, postFoods }) {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      tags: [],
      show: false,
    },
  );
  const { size } = useContext(WindowContext);
  const isMobile = useMemo(() => size.width < 800, [size.width]);
  const inputEl = useRef();
  const { isValid, tags, show } = state;
  useEffect(() => {
    if (post.status === 'SUCCESS') {
      notifier.notify({
        message: '성공적으로 등록되었습니다.',
        type: 'success',
      });
    } else if (post.status === 'FAILURE') {
      notifier.notify({
        message: '등록에 실패하였습니다. 다시 시도해주세요.',
        type: 'error',
      });
    }
  }, [post.status]);
  const addTag = candidate => {
    if (state.tags.some(tag => tag === candidate)) {
      return notifier.notify({
        message: '이미 있는 태그입니다.',
        type: 'error',
      });
    }
    setState({
      tags: [...tags, candidate],
    });
  };
  const deleteTag = index => () => {
    setState({
      tags: tags.filter((_, i) => i !== index),
    });
  };
  const addFood = () => {
    const value = inputEl.current.value;
    if (!value || !value.trim()) {
      notifier.notify({
        type: 'error',
        message: '음식 이름을 입력해주세요!',
      });
      return;
    }
    if (!tags.length) {
      notifier.notify({
        type: 'error',
        message: '적어도 한 가지 이상의 태그를 골라주세요!',
      });
      return;
    }
    postFoods([{ name: value.trim(), tags }]);
  };
  const toggleModal = () => {
    setState({
      show: !show,
    });
  };
  return (
    <div>
      <div className={cx('foodAddButton')}>
        <a onClick={toggleModal}>음식 추가!</a>
      </div>
      <Modal
        show={show}
        header={'음식 추가'}
        width={isMobile ? '90%' : '50%'}
        toggleModal={toggleModal}
      >
        <div className={cx('foodAddContainer')}>
          <div>
            <span>
              <FaBeer /> 음식명
            </span>
            <input
              className={cx(
                'foodAddInput',
                !isValid ? 'foodAddInputError' : null,
              )}
              ref={inputEl}
            />
          </div>

          <div style={{ marginTop: 20 }}>
            <span>
              <FaTags /> 태그 추가
            </span>
            <TagFinder isAdd={true} handleAddTag={addTag} />
            <div className={cx('foodAddTags')}>
              {tags.map((tag, index) => {
                return (
                  <span key={index} className={cx('foodAddTag')}>
                    {tag}
                    <span onClick={deleteTag(index)}>
                      <FaRegTimesCircle />
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
          <div className={cx('foodAddConfirm')} onClick={addFood}>
            추가!
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default FoodAdd;

FoodAdd.propTypes = {
  isMobile: PropTypes.bool,
  post: PropTypes.object.isRequired,
  postFoods: PropTypes.func.isRequired,
};
