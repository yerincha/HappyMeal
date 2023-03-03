import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ForgotPassword from '../../../../pages/signin/forgotpassword';
import { AuthContextProvider } from '../../../context/AuthContext';
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom/extend-expect';
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
        <ForgotPassword />
      </AuthContextProvider>
    );
  });
});

test("Send Email Button is disabled and showing 'Required' error message when the input field is unfilled.", async () => {
  let email;
  let submitButton;
  await act(() => {
    email = screen.getByRole('textbox', {name:/email/i})
    submitButton = screen.getByRole('button', {name:/Reset/i});   

    userEvent.type(email, '{tab}');
  })
  
  await waitFor(() => {
    expect(submitButton).toBeDisabled;
    const items = screen.getAllByText(/Required/i)
    expect(items).toHaveLength(1);
  });
});

test("Send Email Button is disabled and showing 'Invalid email address' error message when the input field is invalid.", async () => {
  let email = screen.getByRole('textbox', {name:/email/i});
  let submitButton = screen.getByRole('button', {name:/Reset/i});
  await act(async () => {
    await userEvent.type(email, 'aa{tab}');
  })

  await waitFor(() => {
    expect(submitButton).toBeDisabled;

    expect(screen.getByDisplayValue('aa')).toBeInTheDocument();


    const items = screen.getAllByText(/Invalid email/i)
    expect(items).toHaveLength(1);
  })
});

test("Proceed without error with the valid email address", async () => {
  let email;
  let submitButton;
  await act(() => {
    email = screen.getByRole('textbox', {name:/email/i})
    submitButton = screen.getByRole('button', {name:/Reset/i});   

    userEvent.type(email, 'user@test.com');
  })

  await waitFor(() => {
    expect(submitButton).toBeEnabled;
    expect(screen.getByDisplayValue('user@test.com')).toBeInTheDocument();
  })

  await act(() => {
    userEvent.click(submitButton);
  })

  await waitFor(() => {
    expect(replaceMock).toHaveBeenCalledWith("/signin");
  })
});

test("Redirect when click 'Sign Up for free' button", async () => {
  expect(screen.getByText('No account yet? Sign up').closest('a')).toHaveAttribute('href', '/signup')
});
