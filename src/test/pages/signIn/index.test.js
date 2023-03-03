import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignIn from '../../../../pages/signin';
import { act } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { AuthContextProvider } from '../../../context/AuthContext'
import { useRouter } from 'next/router'

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-router-dom', () => {
  return {
    Redirect: jest.fn(({ to }) => `Redirected to ${to}`),
  };
});

let pushMock = jest.fn();
let replaceMock = jest.fn();
  

beforeEach(async () => {
  await act(async () => {
    pushMock = jest.fn();
    replaceMock = jest.fn();

    useRouter.mockReturnValue({
      push: pushMock,
      replace: replaceMock,
      pathname: "/",
    });

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

  await act(() => {
    userEvent.type(email, 'nonuser.com');
    userEvent.click(submitButton);
  })

  await waitFor(() => {
    const items = screen.getAllByText(/Invalid email address/i)
    expect(items).toHaveLength(1);
  });
});

test('Submitting with the value of not registered email or invalid password is showing toast with the error message', async () => {
  const email = screen.getByRole('textbox', {name:/email/i});
  const password = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', {name:/Sign in/i});

  await act(async () => {
    await userEvent.type(email, 'nonuser@test.com');
    await userEvent.type(password, '123456789*');
    userEvent.click(submitButton);
  });

  await waitFor(() => {
    const items = screen.getAllByText(/Please Try again/i)
    expect(items).toHaveLength(1);
  })
});

test('Unfilled input prevents the user from proceeding', async () => {
  const email = screen.getByRole('textbox', {name:/email/i})
  const submitButton = screen.getByRole('button', {name:/Sign in/i});

  await act(async () => {
    await userEvent.type(email, 'nonuser@test.com');
    userEvent.click(submitButton);
  });

  await waitFor(() => {
    const items = screen.getAllByText('Required')
    expect(items).toHaveLength(1);
  })
});

test('Proceed without error and redirection with valid email and password', async () => {
  const email = screen.getByRole('textbox', {name:/email/i});
  const password = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', {name:/Sign in/i});

  await act(async () => {
    await userEvent.type(email, 'user@test.com');
    await userEvent.type(password, '123456789*');
    userEvent.click(submitButton);
  });

  await waitFor(() => {
    expect(screen.getByDisplayValue('user@test.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123456789*')).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledWith("/");
  })
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
