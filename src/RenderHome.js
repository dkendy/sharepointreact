import 'babel-polyfill';
import React ,{ Component } from 'react';
import ReactDOM from 'react-dom'; 
import Home from './components/Home';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import createSagaMiddleware from 'redux-saga'; 
import { watchInitHome } from "./store/sagas";
 
import reducer from './store/reducers/home';
 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const _createSagaMiddleware = createSagaMiddleware();
  
const store = createStore(reducer,composeEnhancers(applyMiddleware(_createSagaMiddleware)));
 
_createSagaMiddleware.run(watchInitHome);

const app = (    
                     
                 <Provider store={store}> 
                    <Home />
                </Provider>
                                  
            );

 
$(document).ready(function () {
    //Do not execute jsom until sp.js file has loaded.
    ExecuteOrDelayUntilScriptLoaded( ReactDOM.render(app, document.getElementById('root')), "sp.js");
});
registerServiceWorker();