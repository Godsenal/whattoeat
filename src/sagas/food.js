import { fork, take, put, call, all } from 'redux-saga/effects';
import * as types from '../actions/ActionTypes';
import * as actions from '../actions/food';
import * as api from '../api/food';

function* handleGetFoods(){
  while(true){
    yield take(types.GET_FOODS);
    const {res, err} = yield call(api.getFoods);
    if(res && !err){
      yield put(actions.getFoodsSuccess(res.data));
    }
    else{
      yield put(actions.getFoodsFailure(err.response.data));
    }
  }
}
function* handleGetFoodByName(){
  while(true){
    const action = yield take(types.GET_FOOD_BY_NAME);
    const {res, err} = yield call(api.getFoodByName, action.name);
    if(res && !err){
      yield put(actions.getFoodByNameSuccess(res.data));
    }
    else{
      yield put(actions.getFoodByNameFailure(err.response.data));
    }
  }
}
function* handleGetFoodsByTags(){
  while(true){
    const action = yield take(types.GET_FOODS_BY_TAGS);
    const {res, err} = yield call(api.getFoodsByTags, action.tags);
    if(res && !err){
      yield put(actions.getFoodsByTagsSuccess(res.data));
    }
    else{
      yield put(actions.getFoodsByTagsFailure(err.response.data));
    }
  }
}

function* handleGetFoodsByTag(){
  while(true){
    const action = yield take(types.GET_FOODS_BY_TAG);
    const {res, err} = yield call(api.getFoodsByTag, action.tag);
    if(res && !err){
      yield put(actions.getFoodsByTagSuccess(res.data));
    }
    else{
      yield put(actions.getFoodsByTagFailure(err.response.data));
    }
  }
}

function* handlePostFoods(){
  while(true){
    const action = yield take(types.POST_FOODS);
    const {res, err} = yield call(api.postFoods,action.foods);
    if(res && !err){
      yield put(actions.postFoodsSuccess(res.data));
    }
    else{
      yield put(actions.postFoodsFailure(err.response.data));
    }
  }
}
export default function* rootSaga() {
  yield all([
    fork(handleGetFoods),
    fork(handleGetFoodByName),
    fork(handleGetFoodsByTag),
    fork(handleGetFoodsByTags),
    fork(handlePostFoods)
  ]);
}