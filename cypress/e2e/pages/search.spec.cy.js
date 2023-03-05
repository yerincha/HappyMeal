/* eslint-disable no-undef */
import { getElementById, getElementByType } from '../../cypressUtils';
const SIGN_IN_URL = '/signin';
const SEARCH_URL = '/search';
const HOME_URL = '/';
const SUBMIT = "submit";

const validEmail = "jim2@gg.com";
const validPassword = "qwe123!@#";

const includeString = 'include';
const visitSignInPage = () => {
  cy.visit(SIGN_IN_URL);
};

const visitSearch = () => {
  cy.visit(SEARCH_URL);
};

before(() => {
  cy.visit('/signin');
  cy.get("[name='email']").type(validEmail);
  cy.get("[name='password']").type(validPassword);
  cy.get(getElementByType(SUBMIT)).click();
  cy.url().should(includeString, HOME_URL);

});

describe('/search', () => {
  it('Able to search with query of ingredients', () => {
    visitSearch();
    cy.url().should(includeString, SEARCH_URL)
    cy.get("[name='ingredient']").type('onion');
    cy.get("[data-testid='search']").click();
    cy.get("[data-testid='searchedResults']").contains('onion');
    cy.get("[data-testid='searchedResults']").find("[data-testid='searchedItem']").should('have.length', 10);
  });
  
  xit('Add to My Fridge list when click Add to List button', () => {
    visitSearch();
    cy.url().should(includeString, SEARCH_URL)
    cy.get("[data-testid='searchedItem']").contains('onion powder');
    cy.get("[data-testid='search']").click();
    cy.get("[data-testid='searchedResults']").contains('onion');

  });

  xit('Update quantity from searched list', () => {
    visitSearch();
    cy.url().should(includeString, SEARCH_URL)
    cy.get("[name='ingredient']").type('onion');
    cy.get("[data-testid='search']").click();
    cy.get("[data-testid='searchedResults']").contains('onion');
    cy.get("[data-testid='quantity']".type(2))
  });


  xit('Remove ingredient from My Fridge list', () => {
  });

  xit('Update quantity from My Fridge list', () => {

  });

  xit('Update expiration date from My Fridge List', async () => {

  });
});
