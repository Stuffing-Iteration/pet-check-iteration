import * as types from './actionTypes';

export const loginActionCreator = (username, id) => ({
    type: types.LOG_IN,
    payload: {
      info : username,
      id: id
    }
  });
