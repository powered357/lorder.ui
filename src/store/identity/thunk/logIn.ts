import { push } from 'react-router-redux';
import { Dispatch } from 'redux';

import { loadInitialData, logInPatch } from '../actions';

export const logIn = (data: { username: string; password: string }) => async (dispatch: Dispatch) => {
  await dispatch(logInPatch(data));
  dispatch(push('/'));
  await dispatch(loadInitialData() as any);
};