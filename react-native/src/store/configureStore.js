//@flow
import thunk from 'redux-thunk'
import { createStore } from 'redux'
import { applyMiddleware } from 'redux'
import allReducers from '../allReducers'

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