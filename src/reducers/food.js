import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  get: {
    status: 'INIT',
    foods: [],
    error: '',
    code: 1,
  },
  getList: {
    status: 'INIT',
    foods: [],
    error: '',
    code: 1,
    isLast: false,
  },
  getRandom: {
    status: 'INIT',
    food: {},
    isRandom: false,
    error: '',
    code: 1,
  },
  post: {
    status: 'INIT',
    isSaved: false,
    error: '',
    code: 1,
  },
  update: {
    status: 'INIT',
    food: {},
    error: '',
    code: 1,
  },
};

export default function food(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
  case types.GET_FOODS:
    return update(state, {
      get: {
        status: { $set: 'WAITING' },
      },
    });
  case types.GET_FOODS_SUCCESS:
    return update(state, {
      get: {
        status: { $set: 'SUCCESS' },
        foods: { $set: action.foods },
      },
    });
  case types.GET_FOODS_FAILURE:
    return update(state, {
      get: {
        status: { $set: 'FAILURE' },
        error: { $set: action.error },
        code: { $set: action.code },
      },
    });
  case types.GET_FOODS_LIST: {
    return {
      ...state,
      getList: {
        ...state.getList,
        status: 'WAITING',
      },
    };
  }
  case types.GET_FOODS_LIST_SUCCESS: {
    return {
      ...state,
      getList: {
        ...state.getList,
        foods: action.isMore
          ? [...state.getList.foods, ...action.foods]
          : action.foods,
        status: 'SUCCESS',
      },
    };
  }
  case types.GET_FOODS_LIST_FAILURE: {
    return {
      ...state,
      getList: {
        ...state.getList,
        error: action.error,
        status: 'FAILURE',
      },
    };
  }
  case types.CLEAR_FOODS_LIST:
    return update(state, {
      getList: {
        status: { $set: 'INIT' },
        foods: [],
      },
      getRandom: {
        status: { $set: 'INIT' },
        food: { $set: {} },
        isRandom: { $set: false },
      },
    });
  case types.GET_RANDOM_FOOD:
    return update(state, {
      getRandom: {
        status: { $set: 'WAITING' },
        food: { $set: {} },
        isRandom: { $set: false },
      },
    });
  case types.GET_RANDOM_FOOD_SUCCESS:
    return update(state, {
      getRandom: {
        status: { $set: 'SUCCESS' },
        food: { $set: action.food },
        isRandom: { $set: action.isRandom },
      },
    });
  case types.GET_RANDOM_FOOD_FAILURE:
    return update(state, {
      getRandom: {
        status: { $set: 'FAILURE' },
        error: { $set: action.error },
        code: { $set: action.code },
      },
    });
  case types.GET_FOOD_BY_NAME:
    return update(state, {
      getByName: {
        status: { $set: 'WAITING' },
      },
    });
  case types.GET_FOOD_BY_NAME_SUCCESS:
    return update(state, {
      getByName: {
        status: { $set: 'SUCCESS' },
        food: { $set: action.food },
      },
    });
  case types.GET_FOOD_BY_NAME_FAILURE:
    return update(state, {
      getByName: {
        status: { $set: 'FAILURE' },
        error: { $set: action.error },
        code: { $set: action.code },
      },
    });
  case types.POST_FOODS:
    return update(state, {
      post: {
        status: { $set: 'WAITING' },
      },
    });
  case types.POST_FOODS_SUCCESS:
    return update(state, {
      post: {
        status: { $set: 'SUCCESS' },
        isSaved: { $set: action.isSaved },
      },
    });
  case types.POST_FOODS_FAILURE:
    return update(state, {
      post: {
        status: { $set: 'FAILURE' },
        error: { $set: action.error },
        code: { $set: action.code },
      },
    });
  case types.UPDATE_FOOD:
    return update(state, {
      update: {
        status: { $set: 'WAITING' },
      },
    });
  case types.UPDATE_FOOD_SUCCESS: {
    let index = -1;
    for (let i = 0; i < state.getList.foods.length; i++) {
      if (state.getList.foods[i]._id === action.food._id) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      state = update(state, {
        getList: {
          foods: {
            [index]: { $set: action.food },
          },
        },
      });
    }
    return update(state, {
      update: {
        status: { $set: 'SUCCESS' },
        food: { $set: action.food },
      },
    });
  }
  case types.UPDATE_FOOD_FAILURE:
    return update(state, {
      update: {
        status: { $set: 'FAILURE' },
        error: { $set: action.error },
        code: { $set: action.code },
      },
    });
  default:
    return state;
  }
}
