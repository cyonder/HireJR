import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';
import Root from './components/Root';

import { AUTHENTICATE_USER, FIND_CURRENT_USER } from './constants/actionTypes';
import { AUTHENTICATION_TOKEN, CURRENT_USER } from './constants/config';

import registerServiceWorker from './registerServiceWorker';

let store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Get the token, if the token exist, auto authenticate the user
const token = localStorage.getItem(AUTHENTICATION_TOKEN);
if(token){ store.dispatch({ type: AUTHENTICATE_USER }) }

const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER))
if(currentUser){
    store.dispatch({
        type: FIND_CURRENT_USER,
        payload: currentUser
    })
}

// const sessionToken = sessionStorage.getItem(AUTHENTICATION_TOKEN);
// if(sessionToken){ store.dispatch({ type: AUTHENTICATE_USER }) }

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
);

registerServiceWorker();
