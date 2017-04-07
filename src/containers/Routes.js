import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'
import App from './index'
import Signup from './Signup'
import Home from './AppR'
import AddPost from './AddPost'
import Login from './Login'
import Detail from './Detail'

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => {
    console.log(state); return state.main.userInfo._id ? state.main.userInfo : false;
  }, // how to get the user state
  failureRedirectPath: '/login',
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/my/:id" component={Home} />
    <Route path="/add" component={Signup} />
    <Route path="/post" component={UserIsAuthenticated(AddPost)} />
    <Route path="/edit/:id" component={(props) => <AddPost type={'edit'} {...props} />} />
    <Route path="/login" component={Login} />
    <Route path="/detail/:id" component={Detail} />
  </Route>
)
