import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  activeTags: [],
  get:{
    status: 'INIT',
    tags: [],
  },
  getRandom:{
    status: 'INIT',
    tags: [],
  },
  getSuggest:{
    status: 'INIT',
    tags: [],
  },
  post:{
    status: 'INIT',
    isSaved: false,
  }
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
  case types.GET_TAGS:
    return update(state,{
      get:{
        status: {$set: 'WAITING'}
      }
    });
  case types.GET_TAGS_SUCCESS:
    return update(state,{
      get:{
        status: {$set: 'SUCCESS'},
        tags: {$set: action.tags}
      }
    });
  case types.GET_TAGS_FAILURE:
    return update(state,{
      get:{
        status: {$set: 'FAILURE'},
        error: {$set: action.error},
        code: {$set: action.code}
      }
    });
  case types.GET_RANDOM_TAGS:
    return update(state,{
      getRandom:{
        status: {$set: 'WAITING'}
      }
    });
  case types.GET_RANDOM_TAGS_SUCCESS:
    return update(state,{
      getRandom:{
        status: {$set: 'SUCCESS'},
        tags: {$set: action.tags}
      }
    });
  case types.GET_RANDOM_TAGS_FAILURE:
    return update(state,{
      getRandom:{
        status: {$set: 'FAILURE'},
        error: {$set: action.error},
        code: {$set: action.code}
      }
    });
  case types.GET_SUGGEST_TAGS:
    return update(state,{
      getSuggest:{
        status: {$set: 'WAITING'}
      }
    });
  case types.GET_SUGGEST_TAGS_SUCCESS:
    return update(state,{
      getSuggest:{
        status: {$set: 'SUCCESS'},
        tags: {$set: action.tags}
      }
    });
  case types.GET_SUGGEST_TAGS_FAILURE:
    return update(state,{
      getSuggest:{
        status: {$set: 'FAILURE'},
        error: {$set: action.error},
        code: {$set: action.code}
      }
    });
  case types.POST_TAGS:
    return update(state,{
      post:{
        status: {$set: 'WAITING'}
      }
    });
  case types.POST_TAGS_SUCCESS:
    return update(state,{
      post:{
        status: {$set: 'SUCCESS'},
        isSaved: {$set: action.isSaved}
      }
    });
  case types.POST_TAGS_FAILURE:
    return update(state,{
      post:{
        status: {$set: 'FAILURE'},
        error: {$set: action.error},
        code: {$set: action.code}
      }
    });
  default:
    return state;
  }
}