import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import './css/index.css';
import {BookDBContextProvider} from './bookDataBaseContext'
import App from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <Router>
        <BookDBContextProvider>
            <App />
        </BookDBContextProvider>
    </Router>,
    document.getElementById('root')
);

serviceWorker.unregister();
