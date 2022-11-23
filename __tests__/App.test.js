import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import React from 'react';
import {  MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../client/App.js';
import store from '../client/ReducersAndStore/store';


const server = setupServer(
    rest.get('/greeting', (req, res, ctx) => {
      return res(ctx.json({greeting: 'hello there'}))
    }),
  )

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Application Front Page Testing
test('Full App Rendering', async function() {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  )

  expect(screen.getByRole('heading')).toBeInTheDocument();
  expect(screen.getByText(/name/i)).toBeInTheDocument();
  expect(screen.getByText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
});