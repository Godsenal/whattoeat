import{
  ADD_ACTIVE_TAG,
  DELETE_ACTIVE_TAG,
} from './ActionTypes';

export function addActiveTag(tag) {
  return {
    type: ADD_ACTIVE_TAG,
    tag
  };
}

export function deleteActiveTag(index) {
  return {
    type: DELETE_ACTIVE_TAG,
    index
  };
}