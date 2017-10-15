import {delay} from 'redux-saga';
import { fork, take, put, call, all } from 'redux-saga/effects';
import * as types from '../actions/ActionTypes';
import * as actions from '../actions/tag';
import * as api from '../api/tag';

function* handleGetTags(){
  while(true){
    yield take(types.GET_TAGS);
    const {res, err} = yield call(api.getTags);
    if(res && !err){
      yield put(actions.getTagsSuccess(res.data));
    }
    else{
      yield put(actions.getTagsFailure(err.response.data));
    }
  }
}
function* handleGetRandomTags(){
  while(true){
    const action = yield take(types.GET_RANDOM_TAGS);
    const {res, err} = yield call(api.getRandomTags, action.size);
    if(res && !err){
      yield put(actions.getRandomTagsSuccess(res.data));
    }
    else{
      yield put(actions.getRandomTagsFailure(err.response.data));
    }
  }
}

function* runRequestSuggest(word) {
  const { res, err } = yield call(api.getSuggestTags, word);
  if (res && !err) {
    yield put(actions.getSuggestTagsSuccess( res.data));
  } else {
    yield put(actions.getSuggestTagsFailure( err.response.data ));
  }
}

function createLazily(msec = 100) {
  let ongoing;
  return function* (task, ...args) {
    if (ongoing && ongoing.isRunning()) {
      ongoing.cancel();
    }
    ongoing = yield fork(function* () {
      yield call(delay, msec);
      yield fork(task, ...args);
    });
  };
}

function* handleGetSuggestTags() {
  //const lazily = createLazily();
  while (true) {
    const action = yield take(types.GET_SUGGEST_TAGS);
    yield fork( runRequestSuggest, action.word);
  }
}

function* handlePostTags(){
  while(true){
    const action = yield take(types.POST_TAGS);
    const {res, err} = yield call(api.postTags, action.tags);
    if(res && !err){
      yield put(actions.postTagsSuccess(res.data));
    }
    else{
      yield put(actions.postTagsFailure(err.response.data));
    }
  }
}

export default function* rootSaga() {
  yield all([
    fork(handleGetTags),
    fork(handleGetRandomTags),
    fork(handleGetSuggestTags),
    fork(handlePostTags)
  ]);
}