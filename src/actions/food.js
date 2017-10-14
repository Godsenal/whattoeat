import {
  SET_FOOD_RESULT,
} from './ActionTypes';

export function setFoodResult(status,name='') {
  return{
    type: SET_FOOD_RESULT,
    status,
    name,
  };
}