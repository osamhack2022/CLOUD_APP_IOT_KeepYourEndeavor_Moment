import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css'
import * as serviceWorker from './serviceWorker';

import {BrowserRouter } from 'react-router-dom';


ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
        , 
    document.getElementById('root')
);

