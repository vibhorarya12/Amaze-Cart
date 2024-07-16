// authSaga.js
import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from '../ActionTypes/authTypes';
import { URL } from '../../app/constants';

// Handle the login request
const handleLogin = async ({ phone }) => {
  try {
    const response = await axios.post(`${URL}/user/loginUser`, { phone });
    return response.data;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

// Login saga
function* login(action) {
  const { phone } = action.payload;
  try {
    const res = yield call(handleLogin, { phone });
    console.log("<<<response is", res);
    if (res.error) {
      yield put({ type: LOGIN_ERROR, error: res.message });
    } else {
      yield put({ type: LOGIN_SUCCESS, data: res });
    }
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error: error.message });
  }
}

// Watcher saga
export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
}
