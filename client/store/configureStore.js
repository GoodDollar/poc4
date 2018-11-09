import { combineReducers,applyMiddleware } from "redux";
import { createStore, compose } from 'redux';
import allReducers from '../allReducers'
import thunk from 'redux-thunk';


export default function configureStore(initialState){
  const store = createStore(
    allReducers,
      applyMiddleware(thunk),
      initialState,
      window.devToolsExtension ? window.devToolsExtension() : undefined
      
  )
  console.log(store.getState())

  return store;
}