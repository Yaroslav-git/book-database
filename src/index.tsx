import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import './css/index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from './store/reducers';
import App from './App';
import {IUser} from './component/interfaces'
import * as serviceWorker from './serviceWorker';

interface IRootState {
    user: IUser
}

/**
 * По умолчанию статус входа пользователя отрицательный,
 * если в localStorage есть id сессии - добавляется в поле sessionId
 */
let preloadedState: IRootState = {
    user: {
        loggedIn: false,
        userName: '',
        sessionId: 'sessionId' in window.localStorage ? (window.localStorage.getItem('sessionId') || '') : '',
        action: {
            type: '',
            status: '',
            message: ''
        }
    }
};

const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root')
);

serviceWorker.unregister();
