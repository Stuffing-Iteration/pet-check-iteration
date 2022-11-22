import React from 'react';
import ReactDom from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './ReducersAndStore/store';
import { Provider } from 'react-redux';
// ReactDom.render(<App />, mountNode);

const mountNode = document.getElementById('root');
const root = createRoot(mountNode);

root.render(
    <Provider store={store}>
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
    </Provider>
)
  