// Reduxified app (that is, app with Redux "Provider" container around it)
// Actual app is in components/JukandoitApp

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import thunkMiddleware from 'redux-thunk'
//import createLogger from 'redux-logger'

import appReducer from './reducer'
import JukandoitApp from './components/JukandoitApp'

import {loadDirectory} from './actions/filelist';

const store = createStore(
  appReducer
  , applyMiddleware(thunkMiddleware)
//  , applyMiddleware(thunkMiddleware, createLogger())
);

export default class JukandoitReduxApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <JukandoitApp />
      </Provider>
    );
  }
}

store.dispatch(loadDirectory('/'));
