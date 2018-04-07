import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import {findCurrentUser} from './actions/user';

import rootReducer from './reducers/rootReducer';
import Root from './components/Root';

import { AUTHENTICATE_USER } from './constants/actionTypes';
import { AUTHENTICATION_TOKEN, CURRENT_USER } from './constants/systemTypes';

import registerServiceWorker from './registerServiceWorker';

let store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

const token = localStorage.getItem(AUTHENTICATION_TOKEN);
if(token){ store.dispatch({ type: AUTHENTICATE_USER }) }

const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER))
if(currentUser){
    store.dispatch(findCurrentUser(() => {}));
}

// const sessionToken = sessionStorage.getItem(AUTHENTICATION_TOKEN);
// if(sessionToken){ store.dispatch({ type: AUTHENTICATE_USER }) }

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
);

registerServiceWorker();
