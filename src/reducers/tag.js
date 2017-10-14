import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  activeTags: [],
};

export default function tag(state, action){
  if(typeof state === 'undefined'){
    return initialState;
  }
  switch (action.type) {
  case types.ADD_ACTIVE_TAG:
    return update(state,{
      activeTags: {$push: [action.tag]}
    });
  case types.DELETE_ACTIVE_TAG:
    return update(state,{
      activeTags: {$splice: [[action.index,1]]}
    });
  default:
    return state;
  }
}