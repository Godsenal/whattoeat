import {
  GET_RANDOM_FOOD,
  GET_RANDOM_FOOD_SUCCESS,
  GET_RANDOM_FOOD_FAILURE,
  GET_FOODS,
  GET_FOODS_SUCCESS,
  GET_FOODS_FAILURE,
  GET_FOODS_LIST,
  GET_FOODS_LIST_SUCCESS,
  GET_FOODS_LIST_FAILURE,
  CLEAR_FOODS_LIST,
  GET_FOOD_BY_NAME,
  GET_FOOD_BY_NAME_SUCCESS,
  GET_FOOD_BY_NAME_FAILURE,
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
export function getRandomFood(tags) {
  return {
    type: GET_RANDOM_FOOD,
    tags,
  };
}
export function getRandomFoodSuccess(data) {
  return {
    type: GET_RANDOM_FOOD_SUCCESS,
    ...data,
  };
}
export function getRandomFoodFailure(error) {
  return {
    type: GET_RANDOM_FOOD_FAILURE,
    ...error,
  };
}
export function clearFoodsList() {
  return {
    type: CLEAR_FOODS_LIST,
  };
}
export function getFoods() {
  return {
    type: GET_FOODS,
  };
}
export function getFoodsSuccess(data) {
  return {
    type: GET_FOODS_SUCCESS,
    ...data,
  };
}
export function getFoodsFailure(error) {
  return {
    type: GET_FOODS_FAILURE,
    ...error,
  };
}
export function getFoodsList(payload) {
  return {
    type: GET_FOODS_LIST,
    payload,
  };
}
export function getFoodsListSuccess(data) {
  return {
    type: GET_FOODS_LIST_SUCCESS,
    ...data,
  };
}
export function getFoodsListFailure(error) {
  return {
    type: GET_FOODS_LIST_FAILURE,
    ...error,
  };
}
export function getFoodByName(name) {
  return {
    type: GET_FOOD_BY_NAME,
    name,
  };
}
export function getFoodByNameSuccess(data) {
  return {
    type: GET_FOOD_BY_NAME_SUCCESS,
    ...data,
  };
}
export function getFoodByNameFailure(error) {
  return {
    type: GET_FOOD_BY_NAME_FAILURE,
    ...error,
  };
}
export function postFoods(foods) {
  return {
    type: POST_FOODS,
    foods,
  };
}
export function postFoodsSuccess(data) {
  return {
    type: POST_FOODS_SUCCESS,
    ...data,
  };
}
export function postFoodsFailure(error) {
  return {
    type: POST_FOODS_FAILURE,
    ...error,
  };
}

export function updateFood(food) {
  return {
    type: UPDATE_FOOD,
    food,
  };
}
export function updateFoodSuccess(data) {
  return {
    type: UPDATE_FOOD_SUCCESS,
    ...data,
  };
}
export function updateFoodFailure(error) {
  return {
    type: UPDATE_FOOD_FAILURE,
    ...error,
  };
}
