import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUp from '../../../../pages/signup';
import { AuthContextProvider } from '../../../context/AuthContext'

beforeEach(() => {
  render(
      <SignUp />
  );
});

test('Check if unfilled input prevents user from proceeding', async () => {
  const firstName = screen.getByTestId('firstName');
  const lastName = screen.getByTestId('lastName');
  const email = screen.getByTestId('email');
  const submitButton = screen.getByTestId('submitButton');

  userEvent.type(firstName, 'yerin');
  userEvent.type(lastName, 'cha');
  userEvent.type(email, 'user@test.com');

  await waitFor(() => {
    userEvent.click(submitButton);
  });
  const items = await screen.findAllByText('Please Try again')
  expect(items).toHaveLength(1);
});

test('Check if input field validation is showing error message', async () => {
  const submitButton = screen.getByTestId('submitButton');
  await waitFor(() => {
    userEvent.click(submitButton);
  });
  const items = await screen.findAllByText('required')
  expect(items).toHaveLength(4);
});

test('Check if redirection after successful signup is handled', async () => {
  const firstName = screen.getByTestId('firstName');
  const lastName = screen.getByTestId('lastName');
  const email = screen.getByTestId('email');
  const password = screen.getByTestId('password');
  const submitButton = screen.getByTestId('submitButton');

  userEvent.type(firstName, 'yerin');
  userEvent.type(lastName, 'cha');
  userEvent.type(email, 'user@test.com');
  userEvent.type(password, '123456789*');
  await waitFor(() => {
    userEvent.click(submitButton);
  });

  const alertElement = screen.queryByText('Please Try again');
  expect(alertElement).toBeNull();
});
