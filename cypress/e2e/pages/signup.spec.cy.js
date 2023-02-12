/* eslint-disable no-undef */
describe('/signup', function () {
  const generateEmail = () => `${Date.now()}@e2etest.com`;
  const validAccount = generateEmail();

  const visitSignUpPage = () => {
    cy.visit('/signup');
    cy.contains('Sign up');
  };

  beforeEach(() => visitSignUpPage());

  const doSignUp = (email, password) => {
    cy.get("[name='firstname']").type('first');
    cy.get("[name='lastname']").type('last');
    cy.get("[name='email']").type(email);
    cy.get("[name='password']").type(password);
    cy.get("[type='submit']").click();
  };

  const signUpUrl = '/signup';
  const signInUrl = '/signin';
  const homeUrl = '/';
  const validPassword = '!2345678';
  const invalidPassword = '1111';

  it('Signs user up with valid credentials', function () {
    doSignUp(validAccount, validPassword);
    cy.url().should('include', homeUrl);
  }); 

  it('Displays error if there is an unfilled input', function () {
    visitSignUpPage();
    cy.get("[type='submit']").click();
    cy.contains('required');
    cy.contains('Please Try again'); 
    cy.url().should('include', signUpUrl);
  });

  it('Displays error if invalid email', function () {
    doSignUp('Not an email', validPassword);
    cy.contains('Please Try again'); 
    cy.url().should('include', signUpUrl);
  });

  it('Displays error if incorrect repeated password', function () {
    doSignUp(validAccount, invalidPassword);
    cy.contains('Please Try again'); 
    cy.url().should('include', signUpUrl);
  });

  it('Redirects to Login', function () {
    visitSignUpPage();
    cy.get("[id='signIn']").click();
    cy.url().should('include', signInUrl);
  });
});
