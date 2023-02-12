// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import ForgotPassword from '../../../../pages/signin/forgotpassword';
// import { AuthContextProvider } from '../../../context/AuthContext'
// import '@testing-library/jest-dom/extend-expect';

// beforeEach(() => {
//   render(
//       <AuthContextProvider>
//         <ForgotPassword />
//       </AuthContextProvider>
//   );
// });

// test("Send Email Button is disabled and showing 'Required' error message when the input field is unfilled.", async () => {
//     const email = screen.getByRole('textbox', {name:/email/i})
//     const submitButton = screen.getByRole('button', {name:/Reset/i});

//     await userEvent.type(email, '{tab}');

//     expect(submitButton).toBeDisabled;

//     const items = await screen.findAllByText(/Required/i)
//     expect(items).toHaveLength(1);
// });

// test("Send Email Button is disabled and showing 'Invalid email address' error message when the input field is invalid.", async () => {
//     const email = screen.getByRole('textbox', {name:/email/i})
//     const submitButton = screen.getByRole('button', {name:/Reset/i});

//     await userEvent.type(email, 'aa{tab}');

//     expect(submitButton).toBeDisabled;

//     expect(screen.getByDisplayValue('aa')).toBeInTheDocument();

//     const items = await screen.findAllByText(/Invalid email/i)
//     expect(items).toHaveLength(1);
// });

// test("Proceed without error with the valid email address", async () => {
//     const email = screen.getByRole('textbox', {name:/email/i})
//     const submitButton = screen.getByRole('button', {name:/Reset/i});

//     await userEvent.type(email, 'user@test.com');
//     await userEvent.click(submitButton);

//     // TODO: Checking redirecting to sign in page
//     // expect(screen.getByText("Sign Up for free")).toHaveAttribute(
//     //     "href",
//     //     "/signin"
//     //   );
// });

// // TODO: Checking is this valid test case
// xtest("Redirect when click 'Sign Up for free' button", () =>
//   expect(screen.getByText("Sign Up for free")).toHaveAttribute(
//     "href",
//     "/signup"
//   ));
