import React from 'react';
import ReactDom from 'react-dom';

import App from './App';



var mountNode = document.getElementById('app');
ReactDom.render(<App />, mountNode);