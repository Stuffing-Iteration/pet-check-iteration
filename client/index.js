import React from 'react';
import ReactDom from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';

// ReactDom.render(<App />, mountNode);

const mountNode = document.getElementById('root');
const root = createRoot(mountNode);

root.render(<App />)
  