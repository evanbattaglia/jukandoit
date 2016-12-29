// Reduxified app (that is, app with Redux "Provider" container around it)
// Actual app is in components/JukandoitApp

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

//import createLogger from 'redux-logger'

import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

import appReducer from './reducer'
import JukandoitApp from './components/JukandoitApp'
import soundUpdateFromState from './sound_subscriber';

import {loadDirectoryRequest} from './actions/filelist';
import config from '../config';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  appReducer
  , applyMiddleware(sagaMiddleware)
//  , applyMiddleware(sagaMiddleware, createLogger())
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

//
store.subscribe(() => soundUpdateFromState(store.getState()));

// -----------------
// Load directory on bootup.

store.dispatch(loadDirectoryRequest(config.startDirectory || ''));
