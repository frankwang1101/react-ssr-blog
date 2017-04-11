import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import template from './template';
import routes from './containers/Routes'
import { Provider } from 'react-redux';
import configuration from './containers/configure'
import fs from 'fs'
import path from 'path'
import routeApp from './route/serverRouter'
import * as JwtUtil from './utils/jwtUtil'

import { Router, Route, match, RouterContext } from 'react-router'

const server = express();

server.use('/assets', express.static('../dist/assets'));

routeApp(server);

server.get('*', (req, res) => {

  const isMobile = false;
  const initialState = { main: { isMobile, postInfo: { list: [] }, userInfo: {}, detailInfo: { post: {}, comments: [] } } };

  // const appString = renderToString(<App {...initialState} />);
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      let store = configuration(initialState)
      let state = store.getState()
      let apps = renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>);
      const main = JSON.parse(fs.readFileSync(path.join(__dirname, '../webpack-assets.json'))).javascript.main;
      let injectScriptPath = main;
      res.status(200).send(template({
        body: apps,
        title: 'Hello World from the server',
        initialState: JSON.stringify(state),
        isSsr: true,
        path: injectScriptPath
      }))
    } else {
      res.status(404).send('Not found')
    }
  })

});



server.listen(8080);
console.log('listening');
