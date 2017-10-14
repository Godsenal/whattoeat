import { take, put,  fork,  all } from 'redux-saga/effects';
import * as types from '../actions/ActionTypes';
import { changeWidthAndHeight, changeIsMobile } from '../actions/environment';

function* handleInitEnvironment() {
  while(true){
    //Wait for INIT_ENVIRONMENT ACTION  - TAKE
    const action = yield take(types.INIT_ENVIRONMENT);

    let isMobile = false;
    if(window.innerWidth < 800){
      isMobile = true;
    }
    //Dispatch Action - PUT
    yield put(changeIsMobile(isMobile));
    yield put(changeWidthAndHeight(window.innerWidth, window.innerHeight));

  }
}
export default function* rootSaga() {
  yield all([
    fork(handleInitEnvironment),
  ]);
}