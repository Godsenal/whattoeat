import {
  SET_FOOD_RESULT,
  GET_FOODS,
  GET_FOODS_SUCCESS,
  GET_FOODS_FAILURE,
  GET_FOOD_BY_NAME,
  GET_FOOD_BY_NAME_SUCCESS,
  GET_FOOD_BY_NAME_FAILURE,
  GET_FOODS_BY_TAG,
  GET_FOODS_BY_TAG_SUCCESS,
  GET_FOODS_BY_TAG_FAILURE,
  GET_FOODS_BY_TAGS,
  GET_FOODS_BY_TAGS_SUCCESS,
  GET_FOODS_BY_TAGS_FAILURE,
  POST_FOODS,
  POST_FOODS_SUCCESS,
  POST_FOODS_FAILURE
} from './ActionTypes';
/*
function action(type, payload = {}) {
  return {type, ...payload}
}
*/
export function setFoodResult(status,name='') {
  return{
    type: SET_FOOD_RESULT,
    status,
    name,
  };
}

export function getFoods(){
  return{
    type: GET_FOODS,
  };
}
export function getFoodsSuccess(data){
  return{
    type: GET_FOODS_SUCCESS,
    ...data
  };
}
export function getFoodsFailure(error){
  return{
    type: GET_FOODS_FAILURE,
    ...error
  };
}

export function getFoodByName(name){
  return{
    type: GET_FOOD_BY_NAME,
    name
  };
}
export function getFoodByNameSuccess(data){
  return{
    type: GET_FOOD_BY_NAME_SUCCESS,
    ...data
  };
}
export function getFoodByNameFailure(error){
  return{
    type: GET_FOOD_BY_NAME_FAILURE,
    ...error
  };
}

export function getFoodsByTag(tag){
  return{
    type: GET_FOODS_BY_TAG,
    tag
  };
}
export function getFoodsByTagSuccess(data){
  return{
    type: GET_FOODS_BY_TAG_SUCCESS,
    ...data
  };
}
export function getFoodsByTagFailure(error){
  return{
    type: GET_FOODS_BY_TAG_FAILURE,
    ...error
  };
}

export function getFoodsByTags(tags){
  return{
    type: GET_FOODS_BY_TAGS,
    tags
  };
}
export function getFoodsByTagsSuccess(data){
  return{
    type: GET_FOODS_BY_TAGS_SUCCESS,
    ...data
  };
}
export function getFoodsByTagsFailure(error){
  return{
    type: GET_FOODS_BY_TAGS_FAILURE,
    ...error
  };
}

export function postFoods(foods){
  return{
    type: POST_FOODS,
    foods
  };
}
export function postFoodsSuccess(data){
  return{
    type: POST_FOODS_SUCCESS,
    ...data
  };
}
export function postFoodsFailure(error){
  return{
    type: POST_FOODS_FAILURE,
    ...error
  };
}