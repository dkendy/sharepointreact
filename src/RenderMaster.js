import 'babel-polyfill';
import React ,{ Component } from 'react';
import ReactDOM from 'react-dom'; 
import Master from './components/Master';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import createSagaMiddleware from 'redux-saga'; 
import { watchInitMaster } from "./store/sagas";
 
//import thunk from 'redux-thunk';
import reducer from './store/reducers/master';
import { GOPAGE_ANIVERSARIANTES_MASTER } from './store/actions/actionsTypes';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const _createSagaMiddleware = createSagaMiddleware();                                                    
 
const store = createStore(reducer,composeEnhancers(applyMiddleware(_createSagaMiddleware)));
 

 
_createSagaMiddleware.run(watchInitMaster);

const app = (
             
                        <Provider store={store}> 
                        <Master />
                        </Provider>
                                    
            );

$(document).ready(function () {  
    //Do not execute jsom until sp.js file has loaded.
 
    ExecuteOrDelayUntilScriptLoaded( ReactDOM.render(app, document.getElementById('rootMaster')), "sp.js");
});
 
 

registerServiceWorker();
 