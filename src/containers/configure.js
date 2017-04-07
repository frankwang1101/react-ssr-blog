import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'
import * as reducers from '../reducers/reducers'

export default (init) => {
  const store = createStore(combineReducers(
    {
      ...reducers,
      routing: routerReducer
    }
  ), init, applyMiddleware(thunk, routerMiddleware(browserHistory)));
  return store
}
