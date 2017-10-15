import{
  ADD_ACTIVE_TAG,
  DELETE_ACTIVE_TAG,
  GET_TAGS,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
  GET_RANDOM_TAGS,
  GET_RANDOM_TAGS_SUCCESS,
  GET_RANDOM_TAGS_FAILURE,
  GET_SUGGEST_TAGS,
  GET_SUGGEST_TAGS_SUCCESS,
  GET_SUGGEST_TAGS_FAILURE,
  POST_TAGS,
  POST_TAGS_SUCCESS,
  POST_TAGS_FAILURE
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

export function getTags(){
  return{
    type: GET_TAGS
  };
}
export function getTagsSuccess(data){
  return{
    type: GET_TAGS_SUCCESS,
    ...data
  };
}
export function getTagsFailure(error){
  return{
    type: GET_TAGS_FAILURE,
    ...error
  };
}

export function getRandomTags(size){
  return{
    type: GET_RANDOM_TAGS,
    size
  };
}
export function getRandomTagsSuccess(data){
  return{
    type: GET_RANDOM_TAGS_SUCCESS,
    ...data
  };
}
export function getRandomTagsFailure(error){
  return{
    type: GET_RANDOM_TAGS_FAILURE,
    ...error
  };
}

export function getSuggestTags(word){
  return{
    type: GET_SUGGEST_TAGS,
    word
  };
}
export function getSuggestTagsSuccess(data){
  return{
    type: GET_SUGGEST_TAGS_SUCCESS,
    ...data
  };
}
export function getSuggestTagsFailure(error){
  return{
    type: GET_SUGGEST_TAGS_FAILURE,
    ...error
  };
}

export function postTags(tags){
  return{
    type: POST_TAGS,
    tags
  };
}
export function postTagsSuccess(data){
  return{
    type: POST_TAGS_SUCCESS,
    ...data
  };
}
export function postTagsFailure(error){
  return{
    type: POST_TAGS_FAILURE,
    ...error
  };
}