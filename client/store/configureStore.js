import { combineReducers } from "redux";
import { createStore, compose } from 'redux';
import allReducers from '../allReducers'

export default function configureStore(initialState){
  const store = createStore(
    (
      allReducers,
      undefined,
      compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    )
  )
  return store;
}