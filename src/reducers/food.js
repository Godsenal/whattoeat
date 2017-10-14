import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  result:{
    status: 'INIT',
    name: '',
  }
};

export default function food(state,action){
  if(typeof state === 'undefined'){
    return initialState;
  }
  switch (action.type) {
  case types.SET_FOOD_RESULT:
    return update(state,{
      result: {
        status: {$set: action.status},
        name: {$set: action.name},
      }
    });
  
  default:
    return state;
  }
}