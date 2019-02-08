import tag from './tag';
import food from './food';

import { combineReducers } from 'redux';

const appReducers = combineReducers({
  tag,
  food,
});
/*
const rootReducer = (state, action) => {
  if (action.type === 'AUTH_SIGNOUT') { //reducer가 이걸 거치게 만들어서 signout할 때 state를 모두 없애도록 함.
    state = undefined;
  }

  return appReducers(state, action);
};
*/
export default appReducers;
