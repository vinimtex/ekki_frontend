import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { store } from './store';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
