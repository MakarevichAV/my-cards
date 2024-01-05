import * as actionTypes from './actionTypes';

export const loginSuccess = (user) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: actionTypes.LOGIN_FAILURE,
  payload: error,
});

export const registerSuccess = (user) => ({
  type: actionTypes.REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: actionTypes.REGISTER_FAILURE,
  payload: error,
});