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
  
  it('Add to My Fridge list when click Add to List button', () => {
    visitSearch();
    cy.url().should(includeString, SEARCH_URL)
    cy.get("[name='ingredient']").type('onion');
    cy.get("[data-testid='search']").click();
    cy.get("[data-testid='searchedResults']").children().first().find("[type=button]").click().wait(1000).then(() => {
      visitSearch();
      cy.get("[data-testid='myItem']").contains('onion');
      cy.get("[data-testid='removeButton']").click().wait(1000);
    });
  });

  it('Do not add to My Fridge list when click Add to List button which is already in my fridge', () => {
    visitSearch();
    cy.url().should(includeString, SEARCH_URL)
    cy.get("[name='ingredient']").type('onion');
    cy.get("[data-testid='search']").click();
    cy.get("[data-testid='searchedResults']").children().first().find("[type=button]").click().wait(1000).then(() => {
      visitSearch();
      cy.get("[data-testid='myItem']").contains('onion');

      cy.get("[name='ingredient']").type('onion');
      cy.get("[data-testid='search']").click();
      cy.get("[data-testid='searchedResults']").children().first().find("[type=button]").click().wait(1000).then(() => {
        cy.get("[data-testid='myItem']").should('have.length', 1);
        cy.get("[data-testid='removeButton']").click();
      });
    });
  });

  it('Update quantity from searched list and add to my fridge list', () => {
    visitSearch();
    cy.url().should(includeString, SEARCH_URL)
    cy.get("[name='ingredient']").type('onion');
    cy.get("[data-testid='search']").click().wait(1000);

    cy.get("[data-testid='searchedResults']").children().first().find("input").first().clear();
    cy.get("[data-testid='searchedResults']").children().first().find("input").first().type(2);

    cy.get("[data-testid='searchedResults']").children().first().find("[type=button]").click().wait(1000).then(() => {
      visitSearch();
      cy.get("[data-testid='myItem']").contains('onion');
      cy.get("[data-testid='myItem']").contains('2');
    });
  });

  it('Update expiration from searched list and add to my fridge list', () => {
    visitSearch();
    cy.url().should(includeString, SEARCH_URL)
    cy.get("[name='ingredient']").type('onion');
    cy.get("[data-testid='search']").click().wait(1000);

    cy.get("[data-testid='searchedResults']").children().first().find("input").eq(1).type('{backspace}4');

    cy.get("body").click(0,0);

    cy.get("[data-testid='searchedResults']").children().first().find("[type=button]").click().wait(1000).then(() => {
      visitSearch();
      cy.get("[data-testid='myItem']").contains('2024');
      cy.get("[data-testid='removeButton']").click();
    });
  });

  it('Remove ingredient from My Fridge list', () => {
    visitSearch();
    cy.url().should(includeString, SEARCH_URL)
    cy.get("[data-testid='myItem']").contains('onion');
    cy.get("[data-testid='removeButton']").click().wait(1000).then(() => {
      visitSearch();
      cy.get("[data-testid='myItem']").should('not.exist');
    });
  });

  it('Update quantity from My Fridge list', () => {
    visitSearch();
    cy.url().should(includeString, SEARCH_URL)
    cy.get("[name='ingredient']").type('onion');
    cy.get("[data-testid='search']").click();
    cy.get("[data-testid='searchedResults']").children().first().find("[type=button]").click().wait(1000).then(() => {
      visitSearch();
      cy.get("[data-testid='myItem']").contains('onion');
      cy.get("[data-testid='quantityInput']").clear();
      cy.get("[data-testid='quantityInput']").type(2);
      cy.get("[data-testid='saveButton']").click().wait(1000).then(() => {
        visitSearch();
        cy.get("[data-testid='myItem']").contains('20');
        cy.get("[data-testid='removeButton']").click();
      });
    });
  });

  xit('Update expiration date from My Fridge List', async () => {

  });
});
