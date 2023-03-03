import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUp from '../../../../pages/signup';
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
        <SignUp />
      </AuthContextProvider>
    );
  });
});

test('Check if input field validation is showing error message', async () => {
  const submitButton = screen.getByTestId('submitButton');
  await act(() => {
    userEvent.click(submitButton);
  })

  await waitFor(() => {
    const items = screen.getAllByText(/required/i)
    expect(items).toHaveLength(4);
  });
});

test('Check if unfilled input prevents user from proceeding', async () => {
  const firstName = screen.getByRole('textbox', {name:/First Name/i});
  const lastName = screen.getByRole('textbox', {name:/Last Name/i});
  const email = screen.getByRole('textbox', {name:"Email"});
  const submitButton = screen.getByTestId('submitButton');

  await act(() => {
    userEvent.type(firstName, 'yerin');
    userEvent.type(lastName, 'cha');
    userEvent.type(email, 'user@test.com');
    userEvent.click(submitButton);
  })

  await waitFor(() => {
    const reqItems = screen.getAllByText(/required/i);
    expect(reqItems).toHaveLength(1);
    
    const alertElement = screen.getAllByText('Please Try again');
    expect(alertElement).toHaveLength(1);
  });
});

test('Check if redirection after successful signup is handled', async () => {
  const firstName = screen.getByRole('textbox', {name:/First Name/i});
  const lastName = screen.getByRole('textbox', {name:/Last Name/i});
  const email = screen.getByRole('textbox', {name:"Email"});
  const password = screen.getByLabelText(/password/i);
  const submitButton = screen.getByTestId('submitButton');

  await act(() => {
    userEvent.type(firstName, 'yerin');
    userEvent.type(lastName, 'cha');
    userEvent.type(email, 'user@test.com');
    userEvent.type(password, '123456789*');
    userEvent.click(submitButton);
  })

  await waitFor(() => {
    const alertElement = screen.queryByText('Please Try again');
    expect(alertElement).toBeNull();
  });
});