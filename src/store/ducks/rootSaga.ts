import { all, fork } from 'redux-saga/effects';
import { watchLogin, watchRegister } from './auth/sagas';

export default function* rootSaga() {
  return yield all([fork(watchLogin), fork(watchRegister)]);
}
