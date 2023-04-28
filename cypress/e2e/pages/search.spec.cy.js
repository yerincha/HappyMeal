/* eslint-disable no-undef */
import { getElementById, getElementByType } from '../../cypressUtils';
const SIGN_IN_URL = '/signin';
const SEARCH_URL = '/search';
const HOME_URL = '/';
const SUBMIT = 'submit';

const validEmail = 'jim2@gg.com';
const validPassword = 'qwe123!@#';

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
    cy.url().should(includeString, SEARCH_URL);
    cy.get("[name='ingredient']").type('onion');
    cy.get("[data-testid='search']").click();
    cy.get("[data-testid='searchedResults']").contains('onion');
    cy.get("[data-testid='searchedResults']")
      .find("[data-testid='searchedItem']")
      .should('have.length', 10);
  });

  it('Add to My Fridge list when click Add to List button', () => {
    visitSearch();
    cy.url().should(includeString, SEARCH_URL);
    cy.get("[name='ingredient']").type('onion');
    cy.get("[data-testid='search']").click();
    cy.get("[data-testid='searchedResults']")
      .children()
      .first()
      .find('[type=button]')
      .first()
      .click()
      .wait(1000)
      .then(() => {
        visitSearch();
        cy.get("[data-testid='myItem']").contains('onion');
        cy.get("[data-testid='removeButton']").first().click().wait(1000);
      });
  });

  it('Do not add to My Fridge list when click Add to List button which is already in my fridge', () => {
    visitSearch();
    cy.url().should(includeString, SEARCH_URL);
    cy.get("[name='ingredient']").type('onion');
    cy.get("[data-testid='search']").click();
    cy.get("[data-testid='searchedResults']")
      .children()
      .first()
      .find('[type=button]')
      .first()
      .click()
      .wait(1000)
      .then(() => {
        visitSearch();
        cy.get("[data-testid='myItem']").contains('onion');

        cy.get("[name='ingredient']").type('onion');
        cy.get("[data-testid='search']").click();
        cy.get("[data-testid='searchedResults']")
          .children()
          .first()
          .find('[type=button]')
          .first()
          .click()
          .wait(1000)
          .then(() => {
            // cy.get("[data-testid='myItem']").should('have.length', 3);
            cy.get("[data-testid='removeButton']").first().click();
          });
      });
  });

  it('Update quantity from searched list and add to my fridge list', () => {
    visitSearch();
    cy.url().should(includeString, SEARCH_URL);
    cy.get("[name='ingredient']").type('onion');
    cy.get("[data-testid='search']").click().wait(1000);

    cy.get("[data-testid='searchedResults']")
      .children()
      .first()
      .find('input')
      .first()
      .clear();
    cy.get("[data-testid='searchedResults']")
      .children()
      .first()
      .find('input')
      .first()
      .type(2);

    cy.get("[data-testid='searchedResults']")
      .children()
      .first()
      .find('[type=button]')
      .first()
      .click()
      .wait(1000)
      .then(() => {
        visitSearch();
        cy.get("[data-testid='myItem']").contains('onion');
        cy.get("[data-testid='myItemQuantity']")
          .invoke('val')
          // .should('eq', '1');
      });
  });

  it('Update expiration from searched list and add to my fridge list', () => {
    visitSearch();
    cy.url().should(includeString, SEARCH_URL);
    cy.get("[name='ingredient']").type('onion');
    cy.get("[data-testid='search']").click().wait(1000);

    cy.get("[data-testid='myItemDate']").first().click();
    cy.get('.ant-picker-cell-inner').contains('10').click();
    cy.get("[data-testid='myItemDate']")
      .invoke('val')
      .should('eq', '2023/04/10');

    cy.get('body').click(0, 0);

    cy.get("[data-testid='searchedResults']")
      .children()
      .first()
      .find('[type=button]')
      .first()
      .click()
      .wait(1000)
      .then(() => {
        visitSearch();
        cy.get("[data-testid='myItemDate']")
          .invoke('val')
          .should('eq', '2023/04/10');
        cy.get("[data-testid='removeButton']").click();
      });
  });

  it('Remove ingredient from My Fridge list', () => {
    visitSearch();
    cy.url().should(includeString, SEARCH_URL);

    cy.get("[name='ingredient']").type('onion');
    cy.get("[data-testid='search']").click();
    cy.get("[data-testid='searchedResults']")
      .children()
      .first()
      .find('[type=button]')
      .first()
      .click()
      .wait(1000)
      .then(() => {
        visitSearch();
        cy.get("[data-testid='myItem']").contains('onion');
        cy.get("[data-testid='removeButton']")
          .click()
          .wait(1000)
          .then(() => {
            visitSearch();
            cy.get("[data-testid='myItem']").should('not.exist');
          });
      });
  });

  it('Update quantity from My Fridge list', () => {
    visitSearch();
    cy.url().should(includeString, SEARCH_URL);
    cy.get("[name='ingredient']").type('onion');
    cy.get("[data-testid='search']").click();
    cy.get("[data-testid='searchedResults']")
      .children()
      .first()
      .find('[type=button]')
      .first()
      .click()
      .wait(1000)
      .then(() => {
        visitSearch();
        cy.get("[data-testid='myItem']").contains('onion');
        cy.get("[data-testid='myItemQuantity']").clear();
        cy.get("[data-testid='myItemQuantity']").type(2);
        cy.get("[data-testid='saveButton']")
          .click()
          .wait(1000)
          .then(() => {
            visitSearch();
            cy.get("[data-testid='myItemQuantity']")
              .invoke('val')
              .should('eq', '2');
            cy.get("[data-testid='removeButton']").click();
          });
      });
  });

  it('Update expiration date from My Fridge List', async () => {
    visitSearch();
    cy.url().should(includeString, SEARCH_URL);
    cy.get("[name='ingredient']").type('onion');
    cy.get("[data-testid='search']").click().wait(1000);

    cy.get('body').click(0, 0);

    cy.get("[data-testid='searchedResults']")
      .children()
      .first()
      .find('[type=button]')
      .first()
      .click()
      .wait(1000)
      .then(() => {
        visitSearch();

        cy.get("[data-testid='myItemDate']").first().click();
        cy.get('.ant-picker-cell-inner').contains('10').click();
        cy.get("[data-testid='myItemDate']")
          .invoke('val')
          .should('eq', '2023/04/23');

        cy.get("[data-testid='saveButton']")
          .click()
          .wait(1000)
          .then(() => {
            visitSearch();
            cy.get("[data-testid='myItemDate']")
              .invoke('val')
              .should('eq', '2023/04/10');
            cy.get("[data-testid='removeButton']").click();
          });
      });
  });
});
