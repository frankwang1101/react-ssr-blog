import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Routes from './Routes'
import configurate from './configure'

const init = window.__APP_INITIAL_STATE__;
const store = configurate(init)
const history = syncHistoryWithStore(browserHistory, store)
render(<Provider store={store}><Router routes={Routes} history={history} /></Provider>, document.getElementById('root'))

