import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./js/store/index";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<Provider store={store}><App /></Provider>, 
    document.getElementById('root'));

serviceWorker.unregister();
