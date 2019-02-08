import { fork, take, put, call, all, delay, spawn } from 'redux-saga/effects';
import * as types from '../actions/ActionTypes';
import * as actions from '../actions/food';
import * as api from '../api/food';
import { postTags } from '../api/tag';

const MAX_RANDOM = 15;
function* handleGetFoods() {
  while (true) {
    yield take(types.GET_FOODS);
    const { res, err } = yield call(api.getFoods);
    if (res && !err) {
      yield put(actions.getFoodsSuccess(res.data));
    } else {
      yield put(actions.getFoodsFailure(err.response.data));
    }
  }
}
function* handleGetFoodsList() {
  while (true) {
    const action = yield take(types.GET_FOODS_LIST);
    const { res, err } = yield call(api.getFoodsList, action.payload);
    if (res && !err) {
      yield put(
        actions.getFoodsListSuccess({
          ...res.data,
          isMore: action.payload.isMore,
        }),
      );
    } else {
      yield put(actions.getFoodsListFailure(err.response.data));
    }
  }
}
function* handleGetFoodByName() {
  while (true) {
    const action = yield take(types.GET_FOOD_BY_NAME);
    const { res, err } = yield call(api.getFoodByName, action.name);
    if (res && !err) {
      yield put(actions.getFoodByNameSuccess(res.data));
    } else {
      yield put(actions.getFoodByNameFailure(err.response.data));
    }
  }
}

function* handlePostTags(foods) {
  const tags = foods.reduce((acc, food) => {
    return [...acc, ...food.tags.map(tag => ({ name: tag.trim() }))];
  }, []);
  yield call(postTags, tags);
}
function* handlePostFoods() {
  while (true) {
    const action = yield take(types.POST_FOODS);
    const { res, err } = yield call(api.postFoods, action.foods);

    if (res && !err) {
      yield put(actions.postFoodsSuccess(res.data));
      yield spawn(handlePostTags, action.foods); // 새 Food에 맞는 Tags 추가
    } else {
      yield put(actions.postFoodsFailure(err.response.data));
    }
  }
}
function* handleUpdateFood() {
  while (true) {
    const action = yield take(types.UPDATE_FOOD);

    const { res, err } = yield call(api.updateFood, action.food);
    if (res && !err) {
      yield put(actions.updateFoodSuccess(res.data));
      yield spawn(handlePostTags, [action.food]); // 수정된 Food에 맞는 Tags 추가
    } else {
      yield put(actions.updateFoodFailure(err.response.data));
    }
  }
}
function* generateFood(foods) {
  if (!foods || foods.length == 0) {
    yield put(actions.getRandomFoodFailure());
  } else if (foods.length == 1) {
    yield put(actions.getRandomFoodSuccess({ food: foods[0] }));
  } else {
    for (var i = 0; i < MAX_RANDOM; i++) {
      const isRandom = i == MAX_RANDOM - 1 ? false : true;
      const random =
        i == MAX_RANDOM - 1
          ? Math.floor(Math.random() * foods.length)
          : i % foods.length;
      yield delay(150);
      yield put(
        actions.getRandomFoodSuccess({ food: foods[random], isRandom }),
      );
    }
  }
}
function* handleGetRandomFood() {
  while (true) {
    const action = yield take(types.GET_RANDOM_FOOD);
    const { res, err } = yield call(api.getFoodsList, { tags: action.tags });
    if (res && !err) {
      yield fork(generateFood, res.data.foods);
    } else {
      yield put(actions.getRandomFoodFailure());
    }
  }
}
export default function* rootSaga() {
  yield all([
    fork(handleGetRandomFood),
    fork(handleGetFoods),
    fork(handleGetFoodsList),
    fork(handleGetFoodByName),
    fork(handlePostFoods),
    fork(handleUpdateFood),
  ]);
}
