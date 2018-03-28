import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';
import Root from './components/Root';

import { AUTHENTICATE_USER } from './constants/actionTypes';
import { AUTHENTICATION_TOKEN } from './constants/config';

import registerServiceWorker from './registerServiceWorker';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

let persistor = persistStore(store);

// Get the token, if the token exist, auto authenticate the user
const token = localStorage.getItem(AUTHENTICATION_TOKEN);
if(token){ store.dispatch({ type: AUTHENTICATE_USER }) }

// const sessionToken = sessionStorage.getItem(AUTHENTICATION_TOKEN);
// if(sessionToken){ store.dispatch({ type: AUTHENTICATE_USER }) }

ReactDOM.render(
    <Root store={store} persistor={persistor}/>,
    document.getElementById('root')
);

registerServiceWorker();
