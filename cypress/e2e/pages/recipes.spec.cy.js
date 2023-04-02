/* eslint-disable no-undef */
import {
  getElementByDataTestId,
  getElementByType,
  getElementByName,
} from '../../cypressUtils';

const SIGN_IN_URL = '/signin';
const SEARCH_URL = '/search';
const RECIPES_URL = '/recipes';
const MY_RECIPE_URL = '/myrecipe';

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

const visitRecipes = () => {
  cy.visit(RECIPES_URL);
};

const visitMyRecipe = () => {
  cy.visit(MY_RECIPE_URL);
};

before(() => {
  visitSignInPage();
  cy.get("[name='email']").type(validEmail);
  cy.get("[name='password']").type(validPassword);
  cy.get(getElementByType(SUBMIT)).click();
});

describe('/recipes', () => {
  it("Able to search recipes with query 'onion'", () => {
    visitRecipes();
    cy.get(getElementByName('query')).type('onion');
    cy.get(getElementByDataTestId('SearchIcon'))
      .click()
      .wait(1000)
      .then(() => {
        cy.get("[data-testid='recipeTitle']")
          .first()
          .contains('Charred spring onions');
      });
  });

  it("Able to search recipes with multiple queries 'onion' & 'garlic'", () => {
    visitRecipes();
    cy.get(getElementByName('query')).type('onion, garlic');
    cy.get(getElementByDataTestId('SearchIcon'))
      .click()
      .wait(1000)
      .then(() => {
        cy.get("[data-testid='recipeTitle']")
          .first()
          .contains('How to Make Homemade Re-fried Beans');
      });
  });

  it("Able to search recipes with 'onion' and then research recipes with multiple queries 'onion' & 'garlic'", () => {
    visitRecipes();
    cy.get(getElementByName('query')).type('onion');
    cy.get(getElementByDataTestId('SearchIcon'))
      .click()
      .wait(1000)
      .then(() => {
        cy.get("[data-testid='recipeTitle']")
          .first()
          .contains('Charred spring onions');

        cy.get(getElementByName('query')).clear().type('onion, garlic');
        cy.get(getElementByDataTestId('SearchIcon'))
          .click()
          .wait(1000)
          .then(() => {
            cy.get("[data-testid='recipeTitle']")
              .first()
              .contains('How to Make Homemade Re-fried Beans');
          });
      });
  });

  it("Able to search recipes with query 'onion' and see detail of recipe", () => {
    visitRecipes();
    cy.get(getElementByName('query')).type('onion');

    cy.get(getElementByDataTestId('SearchIcon'))
      .click()
      .wait(1000)
      .then(() => {
        let newUrl = '';
        cy.window().then((win) => {
          cy.stub(win, 'open')
            .as('windowOpen')
            .callsFake((url) => {
              newUrl = url;
            });
        });

        cy.get("[data-testid='seeDetailButton'")
          .first()
          .click()
          .wait(1000)
          .then(() => {
            cy.get('@windowOpen').should('be.called');
          });
      });
  });

  it("Able to search recipes with query 'onion' and add to my recipe", () => {
    visitRecipes();
    cy.get(getElementByName('query')).type('onion');
    cy.get(getElementByDataTestId('SearchIcon'))
      .click()
      .wait(1000)
      .then(() => {
        cy.get("[data-testid='addRecipeButton']")
          .first()
          .click()
          .wait(1000)
          .then(() => {
            visitMyRecipe();
            cy.get("[data-testid='recipeTitle']").contains(
              'Charred spring onions'
            );
          });
      });
  });

  it('Able to search recipes with my fridge items', () => {
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
        cy.get("[name='ingredient']").type('garlic');
        cy.get("[data-testid='search']").click();
        cy.get("[data-testid='searchedResults']")
          .children()
          .first()
          .find('[type=button]')
          .first()
          .click()
          .wait(1000)
          .then(() => {
            visitRecipes();
            cy.get('[type=button]').click().wait(1000);
            cy.get('input')
              .first()
              .invoke('attr', 'placeholder')
              .should('contain', 'onion, garlic');
            cy.get("[data-testid='recipeTitle']")
              .first()
              .contains('How to Make Homemade Re-fried Beans');

            visitSearch();
            cy.get("[data-testid='removeButton']").first().click().wait(500);
            visitSearch();
            cy.get("[data-testid='removeButton']").first().click().wait(500);
          });
      });
  });

  it('Able to search recipes with my fridge items after updating my fridge items', () => {
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
        cy.get("[name='ingredient']").type('garlic');
        cy.get("[data-testid='search']").click();
        cy.get("[data-testid='searchedResults']")
          .children()
          .first()
          .find('[type=button]')
          .first()
          .click()
          .wait(1000)
          .then(() => {
            visitRecipes();
            cy.get('[type=button]').click().wait(1000);
            cy.get('input')
              .first()
              .invoke('attr', 'placeholder')
              .should('contain', 'onion, garlic');
            cy.get("[data-testid='recipeTitle']")
              .first()
              .contains('How to Make Homemade Re-fried Beans');
            visitSearch();
            cy.url().should(includeString, SEARCH_URL);
            cy.get("[name='ingredient']").type('pasta');
            cy.get("[data-testid='search']").click();
            cy.get("[data-testid='searchedResults']")
              .children()
              .first()
              .find('[type=button]')
              .first()
              .click()
              .wait(1000)
              .then(() => {
                visitRecipes();
                cy.get('[type=button]').click().wait(1000);
                cy.get('input')
                  .first()
                  .invoke('attr', 'placeholder')
                  .should('contain', 'onion, garlic, pasta');

                visitSearch();
                cy.get("[data-testid='removeButton']")
                  .first()
                  .click()
                  .wait(500);
                visitSearch();
                cy.get("[data-testid='removeButton']")
                  .first()
                  .click()
                  .wait(500);
                visitSearch();
                cy.get("[data-testid='removeButton']")
                  .first()
                  .click()
                  .wait(500);
              });
          });
      });
  });

  it('Able to search recipes with my fridge items and then search with new query text', () => {
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
        cy.get("[name='ingredient']").type('garlic');
        cy.get("[data-testid='search']").click();
        cy.get("[data-testid='searchedResults']")
          .children()
          .first()
          .find('[type=button]')
          .first()
          .click()
          .wait(1000)
          .then(() => {
            visitRecipes();
            cy.get('[type=button]').click().wait(1000);
            cy.get('input')
              .first()
              .invoke('attr', 'placeholder')
              .should('contain', 'onion, garlic');
            cy.get("[data-testid='recipeTitle']")
              .first()
              .contains('How to Make Homemade Re-fried Beans');

            cy.get(getElementByName('query')).type('apple');
            cy.get(getElementByDataTestId('SearchIcon'))
              .click()
              .wait(1000)
              .then(() => {
                cy.get("[data-testid='recipeTitle']").contains(
                  'Apple Ginger Kombucha Cocktail'
                );

                visitSearch();
                cy.get("[data-testid='removeButton']")
                  .first()
                  .click()
                  .wait(500);
                visitSearch();
                cy.get("[data-testid='removeButton']")
                  .first()
                  .click()
                  .wait(500);
              });
          });
      });
  });
});
