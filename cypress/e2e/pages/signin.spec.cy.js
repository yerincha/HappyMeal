/* eslint-disable no-undef */
import { getElementById, getElementByType } from "../../cypressUtils";

const SIGN_IN_URL = "/signin";
const SIGN_UP_URL = "/signup";
const HOME_URL = "/";
const FORGOT_PASSWORD_URL = "/forgotpassword";

const visitSignInPage = () => {
  cy.visit(SIGN_IN_URL);
};

const generateRandomEmail = () =>
  `${Math.random().toString(36).substr(2, 11)}@unregistered.test`;

const generateRandomPassword = () =>
  `${Math.random().toString(36).substr(2, 4)}rdpwd*`;

const REDIRECT_SIGN_UP_BUTTON = "redirectSignUpButton";
const REDIRECT_FORGOT_PASSWORD_BUTTON = "redirectForgotPassword";
const SUBMIT = "submit";

const includeString = "include";

const validEmail = "test@gmail.com";
const validPassword = "123456789*";

beforeEach(() => {
  visitSignInPage();
});

describe("/signin", () => {
  it("Registered user login test", () => {
    cy.get("[name='email']").type(validEmail);
    cy.get("[name='password']").type(validPassword);
    cy.get(getElementByType(SUBMIT)).click();
    cy.url().should(includeString, HOME_URL);
  });

  it("Unregistered user login test", () => {
    cy.get("[name='email']").type(generateRandomEmail());
    cy.get("[name='password']").type(validPassword);
    cy.get(getElementByType(SUBMIT)).click();
    cy.url().should(includeString, SIGN_IN_URL);
  });

  it("Wrong password test", () => {
    cy.get("[name='email']").type(validEmail);
    cy.get("[name='password']").type(generateRandomPassword());
    cy.get(getElementByType(SUBMIT)).click();
    cy.url().should(includeString, SIGN_IN_URL);
  });

  it("sign up redirect test", () => {
    cy.get(getElementById(REDIRECT_SIGN_UP_BUTTON)).click();
    cy.url().should(includeString, SIGN_UP_URL);
  });

  it("forgot password redirect test", async () => {
    cy.get("[name='email']").type(validEmail);
    cy.get("[name='password']").type(generateRandomPassword());
    cy.get(getElementByType(SUBMIT)).click();
    cy.get(getElementById(REDIRECT_FORGOT_PASSWORD_BUTTON)).click();
    cy.url().should(includeString, FORGOT_PASSWORD_URL);
  });
});
