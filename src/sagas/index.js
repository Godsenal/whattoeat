import { fork, all } from 'redux-saga/effects';
import environment from './environment';
import food from './food';
import tag from './tag';

export default function* rootSaga() {
  yield all([
    fork(environment),
    fork(food),
    fork(tag)
  ]);
}