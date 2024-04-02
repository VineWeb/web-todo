import { createStore } from 'redux';

const SET_NAME = 'SET_NAME'

export const setName = (name: string) => ({
  type: SET_NAME,
  payload: name
})

// initial state 
const initialState = {
  name: '张三'
}

// Reducer
const reducer = (state = initialState, action: { type: string; payload: any}) => {
  switch (action.type) {
    case SET_NAME: 
      return { ...state, name: action.payload  };
    default: 
    return state
  }
}

export const store = createStore(reducer)