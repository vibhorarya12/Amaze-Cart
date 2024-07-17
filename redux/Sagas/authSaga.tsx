// authSaga.js
import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from '../ActionTypes/authTypes';
import { URL } from '../../app/constants';
import { AuthServices } from '../ApiServices';
import { AuthTypes } from '../ActionTypes';


function* login(action) {
  const { phone } = action.payload;
  try {
    const res = yield call(AuthServices.handleLogin, { phone });
    console.log("<<<response is", res);
    if (res.error) {
      yield put({ type: AuthTypes.LOGIN_ERROR, error: res.message });
    } else {
      yield put({ type:AuthTypes.LOGIN_SUCCESS, data: res });
    }
  } catch (error) {
    yield put({ type: AuthTypes.LOGIN_ERROR, error: error.message });
  }
}

function* register(action){
  try {
    const res = yield call(AuthServices.handleRegister, action.payload);
    console.log("<<< register response is", res);
    if (res.error) {
      yield put({ type: AuthTypes.REGISTER_ERROR, error: res.message });
    } else {
      yield put({ type:AuthTypes.REGISTER_SUCCESS, data: res });
    }
  } catch (error) {
    yield put({ type: AuthTypes.REGISTER_ERROR, error: error.message });
  }
}



export default function* authSaga() {
  yield takeLatest(AuthTypes.LOGIN_REQUEST, login);
  yield takeLatest(AuthTypes.REGISTER_REQUEST,register);
}
