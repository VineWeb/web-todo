import React from 'react';
import { createStore, applyMiddleware  } from 'redux';
import { composeWithDevTools }  from 'redux-devtools-extension';
import { OPEN_LOGIN_MODAL, OPEN_REGISTER_MODAL, CLOSE_LOGIN_MODAL } from './actionType';
const initialState = {
  login: {
    visible: false,
    isLogin: true
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LOGIN_MODAL:
      return { ...state, login: { isLogin: true, visible: true } };
    case OPEN_REGISTER_MODAL:
      return { ...state, login: { isLogin: false, visible: true } };
    case CLOSE_LOGIN_MODAL:
      return { ...state, login: { isLogin: true, visible: false } };
    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools());

export default store