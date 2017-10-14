import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  isMobile: window.innerWidth<1000?true:false,
  screenHeight: window.innerHeight,
  screenWidth: window.innerWidth
};

export default function environment(state, action){
  if(typeof state === 'undefined'){
    return initialState;
  }
  switch (action.type) {
  case types.CHANGE_IS_MOBILE:
    return update(state,{
      isMobile: {$set: action.isMobile}
    });
  case types.CHANGE_WIDTH_AND_HEIGHT:
    return update(state,{
      screenHeight: {$set: action.screenHeight},
      screenWidth: {$set: action.screenWidth}
    }); 
  default:
    return state;
  }
}