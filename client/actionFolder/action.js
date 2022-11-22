import * as types from './actionTypes';

export const loginActionCreator = (userInfo) => ({
    type: types.LOG_IN,
    payload: {
      info : userInfo
    }
  });
