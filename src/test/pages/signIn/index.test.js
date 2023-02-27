import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignIn from '../../../../pages/signin';
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom/extend-expect';
import { AuthContextProvider } from '../../../context/AuthContext'

beforeEach(async () => {
  await act(async () => {
    render(
      <AuthContextProvider>
        <SignIn />
      </AuthContextProvider>
    );
  });
});

test('Both unfilled input field validation is showing two Required error messages.', async () => {
  const submitButton = screen.getByRole('button', {name:/Sign in/i});
  await act(() => {
    userEvent.click(submitButton);
  })

  await waitFor(() => {
    const items = screen.getAllByText(/required/i)
    expect(items).toHaveLength(2);
  });
});

test('Invalid input field validation is showing error message', async () => {
  const email = screen.getByRole('textbox', {name:/email/i})
  const submitButton = screen.getByRole('button', {name:/Sign in/i});

  await userEvent.type(email, 'nonuser.com');
  await act(() => {
    userEvent.click(submitButton);
  })

  await waitFor(() => {
    const items = screen.getAllByText(/Invalid email address/i)
    expect(items).toHaveLength(1);
  });
});

test('Submitting with the value of not registered email or invalid password is showing toast with the error message', async () => {
  const email = screen.getByRole('textbox', {name:/email/i})
  const password = screen.getByLabelText(/password/i) 
  /*
    https://github.com/testing-library/dom-testing-library/issues/567
    how to access password type input
  */

  const submitButton = screen.getByRole('button', {name:/Sign in/i});


  await userEvent.type(email, 'nonuser@test.com');
  await userEvent.type(password, '123456789*');
  await userEvent.click(submitButton);

  expect(screen.getByDisplayValue('nonuser@test.com')).toBeInTheDocument();
  expect(screen.getByDisplayValue('123456789*')).toBeInTheDocument();


  const items = await screen.findAllByText(/Please Try again/i)
  expect(items).toHaveLength(1);
});

test('Unfilled input prevents the user from proceeding', async () => {
  const email = screen.getByRole('textbox', {name:/email/i})
  const submitButton = screen.getByRole('button', {name:/Sign in/i});

  await userEvent.type(email, 'nonuser@test.com');
  await userEvent.click(submitButton);

  const items = await screen.findAllByText('Required')
  expect(items).toHaveLength(1);
});

test('Proceed without error and redirection with valid email and password', async () => {

  const email = screen.getByRole('textbox', {name:/email/i})
  const password = screen.getByLabelText(/password/i) 
  /*
    https://github.com/testing-library/dom-testing-library/issues/567
    how to access password type input
  */

  const submitButton = screen.getByRole('button', {name:/Sign in/i});


  await userEvent.type(email, 'user@test.com');
  await userEvent.type(password, '123456789*');
  await userEvent.click(submitButton);

  const items = await screen.findAllByText(/Please Try again/i)
  expect(items).toHaveLength(1);
});

test("Redirect when click 'Forgot your password' button", () =>
  expect(screen.getByText('Forgot password?')).toHaveAttribute(
    'href',
    '/signin/forgotpassword'
  ));

test("Redirect when click 'No account yet? Sign up' button", () =>
  expect(screen.getByText('No account yet? Sign up')).toHaveAttribute(
    'href',
    '/signup'
  ));
