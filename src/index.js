import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore,combineReducers} from 'redux'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import stores from './redux/stores.js';
const store = stores;
function renderPage(){
    ReactDOM.render(
        <Provider store = {store}>
            <App />
        </Provider>, document.getElementById('root'));
}
renderPage();
store.subscribe(renderPage);
serviceWorker.unregister();
