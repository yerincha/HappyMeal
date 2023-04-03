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

describe('/myrecipe', () => {
  // Test - Recipe Collection
  it("Able to see Recipe collection view'", () => {
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

  it("Able to see detail page when click see detail button of recipe'", () => {
    visitMyRecipe();

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

  it("Able to delete recipe from my recipe collection'", () => {
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
            cy.get("[data-testid='deleteButton'")
              .first()
              .click()
              .wait(1000)
              .then(() => {
                visitMyRecipe();
                cy.get("[data-testid='recipeTitle']").should('not.exist');
              });
          });
      });
  });

  it("Able to see Recipe collection view after refreshing page'", () => {
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

            // Refresh and check
            visitMyRecipe();
            cy.get("[data-testid='recipeTitle']").contains(
              'Charred spring onions'
            );
          });
      });
  });

  it("Able to see 'Already in my recipe' button if the recipe is already existed in my collection", () => {
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
            visitRecipes();
            cy.get(getElementByName('query')).type('onion');
            cy.get(getElementByDataTestId('SearchIcon'))
              .click()
              .wait(1000)
              .then(() => {
                cy.get("[data-testid='addRecipeButton']")
                  .first()
                  .contains('Already In My Recipe');
              });
          });
      });
  });

  // Test - Tried Recipe
  it("Able to make recipe 'Tried' with clicking tried button", () => {
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
            cy.get(getElementByDataTestId('triedButton'))
              .first()
              .click()
              .wait(1000)
              .then(() => {
                cy.get("[data-testid='myRatingTitle']").contains('My Rating');
                cy.get("[data-testid='deleteButton'").first().click().wait(500);
              });
          });
      });
  });

  it("Able to see saved 'Tried' state after refreshing", () => {
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
            cy.get(getElementByDataTestId('triedButton'))
              .first()
              .click()
              .wait(1000)
              .then(() => {
                cy.get("[data-testid='myRatingTitle']").contains('My Rating');

                visitMyRecipe();
                cy.get("[data-testid='myRatingTitle']").contains('My Rating');
                cy.get("[data-testid='deleteButton'").first().click().wait(500);
              });
          });
      });
  });

  it("Able to make the recipe back to 'To Try'", () => {
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
            cy.get(getElementByDataTestId('triedButton'))
              .first()
              .click()
              .wait(1000)
              .then(() => {
                cy.get("[data-testid='myRatingTitle']").contains('My Rating');

                cy.get(getElementByDataTestId('triedButton'))
                  .first()
                  .click()
                  .wait(1000)
                  .then(() => {
                    cy.get("[data-testid='myRatingTitle']").should('not.exist');
                    cy.get("[data-testid='deleteButton'")
                      .first()
                      .click()
                      .wait(500);
                  });
              });
          });
      });
  });

  it("Able to see 'To Try' state Recipe collection after refreshing page'", () => {
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
            cy.get(getElementByDataTestId('triedButton'))
              .first()
              .click()
              .wait(1000)
              .then(() => {
                cy.get("[data-testid='myRatingTitle']").contains('My Rating');

                cy.get(getElementByDataTestId('triedButton'))
                  .first()
                  .click()
                  .wait(1000)
                  .then(() => {
                    cy.get("[data-testid='myRatingTitle']").should('not.exist');

                    visitMyRecipe();
                    cy.get("[data-testid='myRatingTitle']").should('not.exist');

                    cy.get("[data-testid='deleteButton'")
                      .first()
                      .click()
                      .wait(500);
                  });
              });
          });
      });
  });

  // Test - Rating Recipe
  it("Able to see start ratings for 'Tried' recipe", () => {
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
            cy.get(getElementByDataTestId('triedButton'))
              .first()
              .click()
              .wait(1000)
              .then(() => {
                cy.get("[data-testid='myRatingTitle']").contains('My Rating');

                cy.get("[class='ant-rate-star ant-rate-star-zero']").should(
                  'exist'
                );

                cy.get("[data-testid='deleteButton'").first().click().wait(500);
              });
          });
      });
  });

  it("Able to click star button to rate for 'Tried' recipe", () => {
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
            cy.get(getElementByDataTestId('triedButton'))
              .first()
              .click()
              .wait(1000)
              .then(() => {
                cy.get("[data-testid='myRatingTitle']").contains('My Rating');

                cy.get("[class='ant-rate-star-second']")
                  .eq(3)
                  .click()
                  .wait(1000)
                  .then(() => {
                    visitMyRecipe();
                    cy.get("[class='ant-rate-star ant-rate-star-full']").should(
                      'have.length',
                      4
                    );
                    cy.get("[data-testid='deleteButton'")
                      .first()
                      .click()
                      .wait(500);
                  });
              });
          });
      });
  });

  it('Able to see the star figure shows the same score as the actual rating', () => {
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
            cy.get(getElementByDataTestId('triedButton'))
              .first()
              .click()
              .wait(1000)
              .then(() => {
                cy.get("[data-testid='myRatingTitle']").contains('My Rating');

                cy.get("[class='ant-rate-star-first']")
                  .eq(2)
                  .click()
                  .wait(1000)
                  .then(() => {
                    visitMyRecipe();
                    cy.get("[class='ant-rate-star ant-rate-star-full']").should(
                      'have.length',
                      2
                    );
                    cy.get(
                      "[class='ant-rate-star ant-rate-star-half ant-rate-star-active']"
                    ).should('have.length', 1);
                    cy.get("[data-testid='deleteButton'")
                      .first()
                      .click()
                      .wait(500);
                  });
              });
          });
      });
  });

  it('Able to change rating even though its rating is already saved', () => {
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
            cy.get(getElementByDataTestId('triedButton'))
              .first()
              .click()
              .wait(1000)
              .then(() => {
                cy.get("[data-testid='myRatingTitle']").contains('My Rating');

                cy.get("[class='ant-rate-star-first']")
                  .eq(2)
                  .click()
                  .wait(1000)
                  .then(() => {
                    visitMyRecipe();
                    cy.get("[class='ant-rate-star ant-rate-star-full']").should(
                      'have.length',
                      2
                    );
                    cy.get(
                      "[class='ant-rate-star ant-rate-star-half ant-rate-star-active']"
                    ).should('have.length', 1);

                    cy.get("[class='ant-rate-star-second']")
                      .eq(3)
                      .click()
                      .wait(1000)
                      .then(() => {
                        visitMyRecipe();
                        cy.get(
                          "[class='ant-rate-star ant-rate-star-full']"
                        ).should('have.length', 4);
                        cy.get("[data-testid='deleteButton'")
                          .first()
                          .click()
                          .wait(500);
                      });
                  });
              });
          });
      });
  });

  it('Able to see the same ratings when refreshing', () => {
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
            cy.get(getElementByDataTestId('triedButton'))
              .first()
              .click()
              .wait(1000)
              .then(() => {
                cy.get("[data-testid='myRatingTitle']").contains('My Rating');

                cy.get("[class='ant-rate-star-first']")
                  .eq(2)
                  .click()
                  .wait(1000)
                  .then(() => {
                    visitMyRecipe();
                    cy.get("[class='ant-rate-star ant-rate-star-full']").should(
                      'have.length',
                      2
                    );
                    cy.get(
                      "[class='ant-rate-star ant-rate-star-half ant-rate-star-active']"
                    ).should('have.length', 1);

                    cy.get("[class='ant-rate-star-second']")
                      .eq(3)
                      .click()
                      .wait(1000)
                      .then(() => {
                        visitMyRecipe();

                        // Refresh
                        visitMyRecipe();
                        cy.get(
                          "[class='ant-rate-star ant-rate-star-full']"
                        ).should('have.length', 4);
                        cy.get("[data-testid='deleteButton'")
                          .first()
                          .click()
                          .wait(500);
                      });
                  });
              });
          });
      });
  });

  it('Able to reset and disabled the rating when toggling the recipe to be tried', () => {
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
            cy.get(getElementByDataTestId('triedButton'))
              .first()
              .click()
              .wait(1000)
              .then(() => {
                cy.get("[data-testid='myRatingTitle']").contains('My Rating');

                cy.get("[class='ant-rate-star-first']")
                  .eq(2)
                  .click()
                  .wait(1000)
                  .then(() => {
                    visitMyRecipe();
                    cy.get("[class='ant-rate-star ant-rate-star-full']").should(
                      'have.length',
                      2
                    );
                    cy.get(
                      "[class='ant-rate-star ant-rate-star-half ant-rate-star-active']"
                    ).should('have.length', 1);

                    cy.get(getElementByDataTestId('triedButton'))
                      .first()
                      .click()
                      .wait(1000)
                      .then(() => {
                        cy.get("[data-testid='myRatingTitle']").should(
                          'not.exist'
                        );
                        cy.get("[data-testid='ant-rate-star-first']").should(
                          'not.exist'
                        );
                        cy.get("[data-testid='deleteButton'")
                          .first()
                          .click()
                          .wait(500);
                      });
                  });
              });
          });
      });
  });
});
