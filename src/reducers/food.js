import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  get:{
    status: 'INIT',
    foods: [],
    error: '',
    code: 1,
  },
  getByName:{
    status: 'INIT',
    food: '',
    error: '',
    code: 1,
  },
  getByTag:{
    status: 'INIT',
    foods: [],
    error: '',
    code: 1,
  },
  getByTags:{
    status: 'INIT',
    foods: [],
    error: '',
    code: 1,
  },
  post:{
    status: 'INIT',
    isSaved: false,
    error: '',
    code: 1,
  },
  result:{
    status: 'INIT',
    food: {},
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
        food: {$set: action.food},
      }
    });
  case types.GET_FOODS:
    return update(state,{
      get: {
        status: {$set: 'WAITING'},
      }
    });
  case types.GET_FOODS_SUCCESS:
    return update(state,{
      get: {
        status: {$set: 'SUCCESS'},
        foods: {$set: action.foods}
      }
    });
  case types.GET_FOODS_FAILURE:
    return update(state,{
      get: {
        status: {$set: 'FAILURE'},
        error: {$set: action.error},
        code: {$set: action.code}
      }
    });
  case types.GET_FOOD_BY_NAME:
    return update(state,{
      getByName: {
        status: {$set: 'WAITING'}
      }
    });
  case types.GET_FOOD_BY_NAME_SUCCESS:
    return update(state,{
      getByName: {
        status: {$set: 'SUCCESS'},
        food: {$set: action.food}
      }
    });
  case types.GET_FOOD_BY_NAME_FAILURE:
    return update(state,{
      getByName: {
        status: {$set: 'FAILURE'},
        error: {$set: action.error},
        code: {$set: action.code}
      }
    });
  case types.GET_FOODS_BY_TAG:
    return update(state,{
      getByTag: {
        status: {$set: 'WAITING'}
      }
    });
  case types.GET_FOODS_BY_TAG_SUCCESS:
    return update(state,{
      getByTag: {
        status: {$set: 'SUCCESS'},
        foods: {$set: action.foods}
      }
    });
  case types.GET_FOODS_BY_TAG_FAILURE:
    return update(state,{
      getByTag: {
        status: {$set: 'WAITING'},
        error: {$set: action.error},
        code: {$set: action.code}
      }
    });
  case types.GET_FOODS_BY_TAGS:
    return update(state,{
      getByTags: {
        status: {$set: 'WAITING'}
      }
    });
  case types.GET_FOODS_BY_TAGS_SUCCESS:
    return update(state,{
      getByTags: {
        status: {$set: 'SUCCESS'},
        foods: {$set: action.foods}
      }
    });
  case types.GET_FOODS_BY_TAGS_FAILURE:
    return update(state,{
      getByTags: {
        status: {$set: 'FAILURE'},
        error: {$set: action.error},
        code: {$set: action.code}
      }
    });
  case types.POST_FOODS:
    return update(state,{
      post: {
        status: {$set: 'WAITING'}
      }
    });
  case types.POST_FOODS_SUCCESS:
    return update(state,{
      post: {
        status: {$set: 'SUCCESS'},
        isSaved: {$set: action.isSaved}
      }
    });
  case types.POST_FOODS_FAILURE:
    return update(state,{
      post: {
        status: {$set: 'FAILURE'},
        error: {$set: action.error},
        code: {$set: action.code}
      }
    });
  default:
    return state;
  }
}