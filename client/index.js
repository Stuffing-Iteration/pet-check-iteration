import React from 'react';
import ReactDom from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// ReactDom.render(<App />, mountNode);

const mountNode = document.getElementById('root');
const root = createRoot(mountNode);

root.render(
    
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)
  