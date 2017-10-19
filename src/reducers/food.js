import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  get:{
    status: 'INIT',
    foods: [],
    error: '',
    code: 1,
  },
  getRandom:{
    status: 'INIT',
    food: {},
    isRandom: false,
  },
  getByScroll:{
    status: 'INIT',
    foods: [],
    size: 15,
    isLast: false
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
  getBySearch:{
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
  update:{
    status: 'INIT',
    food: {},
    error: '',
    code: 1,
  },
};

export default function food(state,action){
  if(typeof state === 'undefined'){
    return initialState;
  }
  switch (action.type) {
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
  case types.GET_RANDOM_FOOD:
    return update(state,{
      getRandom: {
        status: {$set: 'WAITING'},
        food: {$set: {}},
        isRandom:{$set:false}
      }
    });
  case types.GET_RANDOM_FOOD_SUCCESS:
    return update(state,{
      getRandom: {
        status: {$set: 'SUCCESS'},
        food: {$set: action.food},
        isRandom: {$set: action.isRandom}
      }
    });
  case types.GET_RANDOM_FOOD_FAILURE:
    return update(state,{
      getRandom: {
        status: {$set: 'FAILURE'},
        error: {$set: action.error},
        code: {$set: action.code}
      }
    });
  case types.GET_RANDOM_FOOD_CLEAR:
    return update(state,{
      getRandom: {
        status: {$set: 'INIT'},
        food: {$set: {}},
        isRandom: {$set: false}
      }
    });
  case types.GET_FOODS_BY_SCROLL:
    return update(state,{
      getByScroll:{
        status: {$set: 'WAITING'},
      }
    });
  case types.GET_FOODS_BY_SCROLL_SUCCESS:
    if(action.isInitial){
      return update(state,{
        getByScroll:{
          status: {$set: 'SUCCESS'},
          foods: {$set: action.foods},
          isLast: {$set: action.foods < 15}
        }
      });
    }
    else{
      return update(state,{
        getByScroll:{
          status: {$set: 'SUCCESS'},
          foods: {$push: action.foods},
          isLast: {$set: action.foods < 15}
        }
      });
    }
    
  case types.GET_FOODS_BY_SCROLL_FAILURE:
    return update(state,{
      getByScroll:{
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
  case types.GET_FOODS_BY_SEARCH:
    return update(state,{
      getBySearch: {
        status: {$set: 'WAITING'}
      }
    });
  case types.GET_FOODS_BY_SEARCH_SUCCESS:
    return update(state,{
      getBySearch: {
        status: {$set: 'SUCCESS'},
        foods: {$set: action.foods}
      }
    });
  case types.GET_FOODS_BY_SEARCH_FAILURE:
    return update(state,{
      getBySearch: {
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
  case types.UPDATE_FOOD:
    return update(state,{
      update: {
        status: {$set: 'WAITING'}
      }
    });
  case types.UPDATE_FOOD_SUCCESS:
    var index = -1;
    for(var i = 0; i< state.getByScroll.foods.length; i++){
      if(state.getByScroll.foods[i]._id === action.food._id){
        index = i;
        break;
      }
    }
    if(index >= 0){
      return update(state,{
        update: {
          status: {$set: 'SUCCESS'},
          food: {$set: action.food},
        },
        getByScroll: {
          foods:{
            [index]: {$set: action.food}
          }
        }
      });
    }
    else{
      return update(state,{
        update: {
          status: {$set: 'SUCCESS'},
          food: {$set: action.food},
        },
      });
    }
    
  case types.UPDATE_FOOD_FAILURE:
    return update(state,{
      update: {
        status: {$set: 'FAILURE'},
        error: {$set: action.error},
        code: {$set: action.code}
      }
    });
  default:
    return state;
  }
}