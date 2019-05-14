import { call, put, takeEvery } from 'redux-saga/effects';
import { firebase } from '../../../firebase';
import { AuthTypes, User } from './types';
import {
  authSuccess,
  authFailure,
  registerFailure,
  registerSuccess,
  logoutFailure,
  logoutSuccess,
} from './actions';

function* login(action) {
  try {
    const { payload } = action;

    if (!payload.email && !payload.password) {
      // código temporário que vai se tornar permanente para manter a sessão
      const jUser = yield localStorage.getItem('user');
      const user: User = yield JSON.parse(jUser);

      if (user) {
        yield put(authSuccess(user));
        return;
      }
    } else {
      const data = yield call(
        firebase.auth.signInWithEmailAndPassword,
        payload.email,
        payload.password,
      );

      // salva a sessão do usuário
      const jUser = { email: payload.email };
      localStorage.setItem('user', JSON.stringify(jUser));

      yield put(authSuccess(data.user));
    }
  } catch (err) {
    yield put(authFailure(err.code));
  }
}

function* register(action) {
  try {
    const { payload } = action;

    const data = yield call(
      firebase.auth.createUserWithEmailAndPassword,
      payload.email,
      payload.password,
    );
    yield put(registerSuccess(data.user));
  } catch (err) {
    yield put(registerFailure(err.code));
  }
}

function* logout(action) {
  try {
    yield localStorage.removeItem('user');

    yield call(firebase.auth.signOut);
    yield put(logoutSuccess());
  } catch (err) {
    yield put(logoutFailure(err));
  }
}

export function* watchLogin() {
  yield takeEvery(AuthTypes.AUTHENTICATE_REQUEST, login);
}

export function* watchRegister() {
  yield takeEvery(AuthTypes.REGISTER_REQUEST, register);
}

export function* watchLogout() {
  yield takeEvery(AuthTypes.LOGOUT_REQUEST, logout);
}
