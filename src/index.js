import React from 'react';
import ReactDOM from 'react-dom';

import "bootstrap/dist/css/bootstrap.min.css";

import $ from 'jquery';
window.$ = $;

import AppView from './AppView';

ReactDOM.render(<AppView/>, document.getElementById('root'));