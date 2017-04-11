import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'
import App from './index'
// import Signup from './Signup'
import Home from './AppR'
// import AddPostComponent from './AddPost'
// import Login from './Login'
// import Detail from './Detail'

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => {
    console.log(state); return state.main.userInfo._id ? state.main.userInfo : false;
  }, // how to get the user state
  failureRedirectPath: '/login',
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})

const AddPost = (location, cb) => {
  // if (global.__FROM_SSR_FLAG__) {
  //   global.__FROM_SSR_FLAG__ = false;
  //   cb(null, require('./AddPost').default);
  // } else {
  require.ensure([], (require) => {
    cb(null, UserIsAuthenticated(require('./AddPost').default));
  }, 'AddPost');
  // }
}

const Login = (location, cb) => {
  // if (global.__FROM_SSR_FLAG__) {
  //   global.__FROM_SSR_FLAG__ = false;
  //   cb(null, require('./Login').default);
  // } else {
  require.ensure([], require => {
    cb(null, require('./Login').default);
  }, 'Login');
  // }
}

const Detail = (location, cb) => {
  // if (global.__FROM_SSR_FLAG__) {
  //   global.__FROM_SSR_FLAG__ = false;
  //   cb(null, require('./Detail').default);
  // } else {
  require.ensure([], require => {
    cb(null, require('./Detail').default);
  }, 'Detail');
  // }
}

const Signup = (location, cb) => {
  // if (global.__FROM_SSR_FLAG__) {
  //   global.__FROM_SSR_FLAG__ = false;
  //   cb(null, require('./Signup').default);
  // } else {
  require.ensure([], require => {
    cb(null, require('./Signup').default);
  }, 'Signup');
  // }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/my/:id" component={Home} />
    <Route path="/add" getComponent={Signup} />
    <Route path="/post" getComponent={AddPost} />
    <Route path="/edit/:id" component={(props) => <AddPost type={'edit'} {...props} />} />
    <Route path="/login" getComponent={Login} />
    <Route path="/detail/:id" getComponent={Detail} />
  </Route>
)
