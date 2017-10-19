import {delay} from 'redux-saga';
import { fork, take, put, call, all, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/ActionTypes';
import * as actions from '../actions/food';
import * as api from '../api/food';
import {postTags} from '../api/tag';

const MAX_RANDOM = 15;
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
function* handlePostTags(foods){
  yield foods.map(food => {
    var tagArr = food.tags.map((tag)=>{
      return {name:tag.trim()};
    });
    return call(postTags, tagArr);
  });
}
function* handlePostFoods(){
  while(true){
    const action = yield take(types.POST_FOODS);
    
    const {res, err} = yield call(api.postFoods,action.foods);
    
    if(res && !err){
      yield put(actions.postFoodsSuccess(res.data));
      yield fork(handlePostTags,action.foods); // 새 Food에 맞는 Tags 추가
    }
    else{
      yield put(actions.postFoodsFailure(err.response.data));
    }
  }
}
function* handleUpdateFood(){
  while(true){
    const action = yield take(types.UPDATE_FOOD);
    
    const {res, err} = yield call(api.updateFood, action.food);
    if(res && !err){
      yield put(actions.updateFoodSuccess(res.data));
      yield fork(handlePostTags,[action.food]); // 수정된 Food에 맞는 Tags 추가
    }
    else{
      yield put(actions.updateFoodFailure(err.response.data));
    }
  }
}
function* generateFood(foods){
  if(foods.length == 0){
    yield put(actions.getRandomFoodFailure());
  }
  else if(foods.length ==1){
    yield put(actions.getRandomFoodSuccess({food:foods[0]}));
  }
  else{
    for(var i=0; i<MAX_RANDOM; i++){
      let isRandom = i==MAX_RANDOM - 1?false:true;
      let random = i==MAX_RANDOM - 1?Math.floor(Math.random() * (foods.length)) : i % foods.length;
      yield call(delay,150);
      yield put(actions.getRandomFoodSuccess({food:foods[random],isRandom}));
    }
  }
}
function* handleGetRandomFood(){
  while(true){
    const action = yield take(types.GET_RANDOM_FOOD);
    const {res, err} = yield call(api.getFoodsByTags, action.tags);
    if(res && !err){
      yield fork(generateFood,res.data.foods);
    }
    else{
      yield put(actions.getRandomFoodFailure());
    }
  }
}
function* handleGetFoodsBySroll(){
  while(true){
    const action = yield take(types.GET_FOODS_BY_SCROLL);
    const {res, err} = yield call(api.getFoodsByScroll, action.isInitial, action.id);
    if(res && !err){
      yield put(actions.getFoodsByScrollSuccess({...res.data,isInitial: action.isInitial}));
    }
    else{
      yield put(actions.getFoodsByScrollFailure(err.response.data));
    }
  }
}
function* handleGetFoodsBySearch(){
  while(true){
    const action = yield take(types.GET_FOODS_BY_SEARCH);
    const {res, err} = yield call(api.getFoodsBySearch, action.name);
    if(res && !err){
      yield put(actions.getFoodsBySearchSuccess(res.data));
    }
    else{
      yield put(actions.getFoodsBySearchFailure(err.response.data));
    }
  }
}
export default function* rootSaga() {
  yield all([
    fork(handleGetRandomFood),
    fork(handleGetFoods),
    fork(handleGetFoodsBySroll),
    fork(handleGetFoodByName),
    fork(handleGetFoodsByTag),
    fork(handleGetFoodsByTags),
    fork(handleGetFoodsBySearch),
    fork(handlePostFoods),
    fork(handleUpdateFood),
  ]);
}