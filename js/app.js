// Reduxified app (that is, app with Redux "Provider" container around it)
// Actual app is in components/JukandoitApp

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
//import createLogger from 'redux-logger'

import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

import appReducer from './reducer'
import JukandoitApp from './components/JukandoitApp'

import {loadDirectoryRequest} from './actions/filelist';
import config from '../config';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  appReducer
  , applyMiddleware(thunkMiddleware)
  , applyMiddleware(sagaMiddleware)
//  , applyMiddleware(thunkMiddleware, createLogger())
);

sagaMiddleware.run(sagas);

export default class JukandoitReduxApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <JukandoitApp />
      </Provider>
    );
  }
}

// -----------------
// Load directory on bootup.

store.dispatch(loadDirectoryRequest(config.startDirectory || ''));
