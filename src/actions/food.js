import {
  GET_RANDOM_FOOD,
  GET_RANDOM_FOOD_SUCCESS,
  GET_RANDOM_FOOD_FAILURE,
  GET_RANDOM_FOOD_CLEAR,
  GET_FOODS,
  GET_FOODS_SUCCESS,
  GET_FOODS_FAILURE,
  GET_FOODS_BY_SCROLL,
  GET_FOODS_BY_SCROLL_SUCCESS,
  GET_FOODS_BY_SCROLL_FAILURE,
  GET_FOOD_BY_NAME,
  GET_FOOD_BY_NAME_SUCCESS,
  GET_FOOD_BY_NAME_FAILURE,
  GET_FOODS_BY_TAG,
  GET_FOODS_BY_TAG_SUCCESS,
  GET_FOODS_BY_TAG_FAILURE,
  GET_FOODS_BY_TAGS,
  GET_FOODS_BY_TAGS_SUCCESS,
  GET_FOODS_BY_TAGS_FAILURE,
  GET_FOODS_BY_SEARCH,
  GET_FOODS_BY_SEARCH_SUCCESS,
  GET_FOODS_BY_SEARCH_FAILURE,
  POST_FOODS,
  POST_FOODS_SUCCESS,
  POST_FOODS_FAILURE,
  UPDATE_FOOD,
  UPDATE_FOOD_SUCCESS,
  UPDATE_FOOD_FAILURE,
} from './ActionTypes';
/*
function action(type, payload = {}) {
  return {type, ...payload}
}
*/
export function getRandomFood(tags){
  return{
    type: GET_RANDOM_FOOD,
    tags
  };
}
export function getRandomFoodSuccess(data){
  return{
    type:GET_RANDOM_FOOD_SUCCESS,
    ...data
  }
}
export function getRandomFoodFailure(error){
  return{
    type:GET_RANDOM_FOOD_FAILURE,
    ...error
  }
}
export function getRandomFoodClear(){
  return{
    type:GET_RANDOM_FOOD_CLEAR
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
export function getFoodsByScroll(isInitial = false, id = 0){
  return{
    type: GET_FOODS_BY_SCROLL,
    isInitial,
    id
  };
}
export function getFoodsByScrollSuccess(data){
  return{
    type: GET_FOODS_BY_SCROLL_SUCCESS,
    ...data
  };
}
export function getFoodsByScrollFailure(error){
  return{
    type: GET_FOODS_BY_SCROLL_FAILURE,
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

export function getFoodsBySearch(name){
  return{
    type: GET_FOODS_BY_SEARCH,
    name
  };
}
export function getFoodsBySearchSuccess(data){
  return{
    type:GET_FOODS_BY_SEARCH_SUCCESS,
    ...data
  };
}
export function getFoodsBySearchFailure(error){
  return{
    type: GET_FOODS_BY_SEARCH_FAILURE,
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

export function updateFood(food){
  return{
    type: UPDATE_FOOD,
    food
  };
}
export function updateFoodSuccess(data){
  return{
    type: UPDATE_FOOD_SUCCESS,
    ...data
  };
}
export function updateFoodFailure(error){
  return{
    type: UPDATE_FOOD_FAILURE,
    ...error
  };
}