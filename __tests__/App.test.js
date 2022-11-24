import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';

import React from 'react';
import {  MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../client/App';
import store from '../client/ReducersAndStore/store';

describe('Application Page Displays', function() {

  // Login Page
  test('Login Page Rendering', async function() {
    await render(
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
      await render(
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
    test('Invalid Page Rendering', async function() {
      await render(
        <MemoryRouter initialEntries={['/broken/link']}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      )
    
      expect(screen.getByRole('heading')).toHaveTextContent(/page\ not\ found/i)
    });


    describe('Show user page on authentication', function() {
      const server = setupServer(
          rest.get('http://localhost:3000/api/auth/', (req, res, ctx) => {
            const data = {
              username: 'taylor',
              userId: 10,
            };
            return res(ctx.status(200), ctx.json(data))
          })
        )

      beforeAll(() => server.listen())
      afterEach(() => server.resetHandlers())
      afterAll(() => server.close())

      test('User Page Rendering', async function() {
        await render(
          <MemoryRouter initialEntries={['/pets/10']}>
            <Provider store={store}>
              <App />
            </Provider>
          </MemoryRouter>
        )
      
        expect(screen.getByRole('heading')).toHaveTextContent(/page\ not\ found/i)
      });

    })



})


