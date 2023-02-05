/* eslint-disable no-undef */
import { getElementById, getElementByType } from "../../cypressUtils";

const forgotPasswordUrl = "/signin/forgotpassword";
const signupUrl = "/signup";

const validEmail = "test@sequences.app";
const invalidEmail = "test";

const EMAIL = "email";
const SEND_EMAIL = "sendEmail";
const FORM_ERROR_MESSAGE = "formErrorMessage";
const REDIRECT_SIGN_UP_BUTTON = "redirectSignUpButton";
const SUBMIT = "submit";

const visitForgotPassword = () => {
  cy.visit(forgotPasswordUrl);
};

beforeEach(() => {
  visitForgotPassword();
});

describe("/forgotpassword", () => {
  it("valid email send email test", () => {
    cy.get(getElementById(EMAIL)).type(validEmail);
    cy.get(getElementByType(SUBMIT)).click();
    cy.get(getElementById(SEND_EMAIL)).should("be.visible");
  });

  it("unfilled email input error message test", () => {
    cy.get(getElementById(EMAIL)).click();
    cy.get("body").click();
    cy.get(getElementById(SEND_EMAIL)).should("be.disabled");
    cy.contains("Required");
  });

  it("invalid email error message test", () => {
    cy.get(getElementById(EMAIL)).type(invalidEmail);
    cy.get("body").click();
    cy.contains("Invalid email");
    cy.get(getElementById(SEND_EMAIL)).should("be.disabled");
  });
});
