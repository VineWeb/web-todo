import React from 'react';
import { createStore, applyMiddleware  } from 'redux';
import { composeWithDevTools }  from 'redux-devtools-extension';
import { OPEN_LOGIN_MODAL, OPEN_REGISTER_MODAL, CLOSE_LOGIN_MODAL, ADD_TODO, UPDATE_TODO, CLOSE_ADD_TODO_MODAL, IS_LOGINED, EXIT_LOGIN } from './actionType';
const initialState = {
  count: 0,
  isLoginStatus: localStorage.getItem('token') ? true : false,
  login: {
    visible: false,
    isLogin: true,
  },
  home: {
    visible: false,
    isAdd: true
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LOGIN_MODAL:
      return { ...state, ...state.login, login: { isLogin: true, visible: true } };
    case OPEN_REGISTER_MODAL:
      return { ...state, ...state.login, login: { isLogin: false, visible: true } };
    case CLOSE_LOGIN_MODAL:
      return { ...state, ...state.login, login: { isLogin: true, visible: false } };
    case ADD_TODO:
      return { ...state, home: { visible: true, isAdd: true } };
    case UPDATE_TODO:
      return { ...state, home: { visible: true, isAdd: false } };
    case CLOSE_ADD_TODO_MODAL:
      return { ...state, home: { visible: false, isAdd: true } };
    case IS_LOGINED:
      return { ...state, ...state.login, isLoginStatus: true };
    case EXIT_LOGIN:
      return { ...state, ...state.login, isLoginStatus: false };
    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools());

export default store