//@flow
import thunk from 'redux-thunk';
import allReducers from '../allReducers'
import { createStore } from 'redux';
import { applyMiddleware } from "redux";

export default function configureStore(initialState) {
  const store = createStore(
    allReducers,
      applyMiddleware(thunk),
      initialState,
      window.devToolsExtension ? window.devToolsExtension() : undefined
      
  )
  console.log(store.getState())

  return store;
}