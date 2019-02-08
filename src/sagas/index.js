import { fork, all } from 'redux-saga/effects';

import 'regenerator-runtime/runtime';
import food from './food';
import tag from './tag';

export default function* rootSaga() {
  yield all([fork(food), fork(tag)]);
}
