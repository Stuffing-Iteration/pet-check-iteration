import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, screen, getByLabelText} from '@testing-library/react';
import '@testing-library/jest-dom';

import React from 'react';
import {  MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../client/App';
import store from '../client/ReducersAndStore/store';


// const server = setupServer(
//     rest.get('/greeting', (req, res, ctx) => {
//       return res(ctx.json({greeting: 'hello there'}))
//     }),
//   )

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

describe('Application Page Displays', function() {

  // Login Page
  test('Login Page Rendering', async function() {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    )
  
    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent('Login')
    const username = screen.getByLabelText('Name:');
    expect(username).toBeInTheDocument();
    const password = screen.getByLabelText('Password:');
    expect(password).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toHaveValue('LOGIN');
  });

    // Signup Page
    test('Signup Page Rendering', async function() {
      render(
        <MemoryRouter initialEntries={['/signup']}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      )
    
      expect(screen.getByRole('heading')).toHaveTextContent(/signup/i)
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText('Password:')).toBeInTheDocument();
      expect(screen.getByLabelText('Confirm Password:')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveValue('SIGNUP');
    });

    // Invalid Page
    test('Invlaid Page Rendering', async function() {
      render(
        <MemoryRouter initialEntries={['/broken/link']}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      )
    
      expect(screen.getByRole('heading')).toHaveTextContent(/page\ not\ found/i)
    });
})
