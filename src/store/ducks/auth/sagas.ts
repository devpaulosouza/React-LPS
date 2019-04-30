import { call, put, takeEvery } from 'redux-saga/effects';
import { firebase } from '../../../firebase';
import { authSuccess, authFailure } from './actions';
import { AuthTypes } from './types';

function* login(action) {
  try {
    const { payload } = action;

    const data = yield call(firebase.auth.signInWithEmailAndPassword, payload.email, payload.password);

    console.log(data);
    yield put(authSuccess(data.user));
  } catch (err) {
    yield put(authFailure(err));
  }
}

export function* watchLogin() {
  yield takeEvery(AuthTypes.AUTHENTICATE_REQUEST, login);
}
