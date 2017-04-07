import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import template from './template';
import routes from './containers/Routes'
import { Provider } from 'react-redux';
import configuration from './app/configure'
import parser from 'body-parser'

import { Router,Route,match, RouterContext } from 'react-router'

const server = express();

server.use('/assets', express.static('assets'));

server.get('*', (req, res) => {

  const isMobile = false;
  const initialState = { isMobile };
  // const appString = renderToString(<App {...initialState} />);
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      let store = configuration(initialState)
      let state = store.getState()

      let apps = renderToString(<Provider store={store}><RouterContext {...renderProps} isMobile={true} /></Provider>);
    
      res.status(200).send(template({
        body: apps,
        title: 'Hello World from the server',
        initialState: JSON.stringify(state)
      }))
    } else {
      res.status(404).send('Not found')
    }
  })

  
  // res.send(template({
  //   body: appString,
  //   title: 'Hello World from the server',
  //   initialState: JSON.stringify(initialState)
  // }));
});

var par = parser.text();

 server.post('/reg',par,(req,res) => {
    var param = JSON.parse(req.body);
    console.log(param);
    res.send({msg:'gotcha!',success:true})
  })

server.listen(8080);
console.log('listening');
