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

  // Test Pagination
  it("Able to search recipes with query 'onion' and see pagination component", () => {
    visitRecipes();
    cy.get(getElementByName('query')).type('onion');
    cy.get(getElementByDataTestId('SearchIcon'))
      .click()
      .wait(1000)
      .then(() => {
        cy.get('.ant-list-pagination').should('have.length', 1);
      });
  });

  it("Able to search recipes with query 'onion' and pagination defaultly show with page 1", () => {
    visitRecipes();
    cy.get(getElementByName('query')).type('onion');
    cy.get(getElementByDataTestId('SearchIcon'))
      .click()
      .wait(1000)
      .then(() => {
        cy.get('.ant-pagination-item')
          .first()
          .then(($el) => {
            let classNames = $el[0].className.split(' ');
            expect(classNames).to.contain('ant-pagination-item-1');
            expect(classNames).to.contain('ant-pagination-item-active');
          });
      });
  });

  it("Able to search recipes with query 'onion' and prev button shows but disabled", () => {
    visitRecipes();
    cy.get(getElementByName('query')).type('onion');
    cy.get(getElementByDataTestId('SearchIcon'))
      .click()
      .wait(1000)
      .then(() => {
        cy.get('.ant-pagination-prev').should('have.length', 1);
        cy.get('.ant-pagination-prev')
          .first()
          .then(($el) => {
            let classNames = $el[0].className.split(' ');
            expect(classNames).to.contain('ant-pagination-disabled');
          });
      });
  });

  it("Able to search recipes with query 'onion' and next button shows and enabled", () => {
    visitRecipes();
    cy.get(getElementByName('query')).type('onion');
    cy.get(getElementByDataTestId('SearchIcon'))
      .click()
      .wait(1000)
      .then(() => {
        cy.get('.ant-pagination-next').should('have.length', 1);
        cy.get('.ant-pagination-next')
          .first()
          .then(($el) => {
            let classNames = $el[0].className.split(' ');
            expect(classNames).to.not.contain('ant-pagination-disabled');
          });
      });
  });

  it("Able to search recipes with query 'onion' and pagination shows from page 1 to page 9 (Page 1,2,3,4,5, '...', and 9)", () => {
    visitRecipes();
    cy.get(getElementByName('query')).type('onion');
    cy.get(getElementByDataTestId('SearchIcon'))
      .click()
      .wait(1000)
      .then(() => {
        // Check Page buttons - '1', '2', '3', '4', '5', '9'
        cy.get('.ant-pagination-item').should('have.length', 6);

        let page = 1;

        cy.get('.ant-pagination-item').each(($el) => {
          cy.wrap($el.attr('title')).should('eq', `${page}`);
          page++;
          if (page === 6) {
            page = 9;
          }
        });

        // Check '...' button
        cy.get('.ant-pagination-jump-next').should('have.length', 1);
      });
  });

  it("Able to search recipes with query 'onion' and click page 2 and check item updated", () => {
    visitRecipes();
    cy.get(getElementByName('query')).type('onion');
    cy.get(getElementByDataTestId('SearchIcon'))
      .click()
      .wait(1000)
      .then(() => {
        let page1Recipes = [];
        cy.get("[data-testid='recipeTitle']")
          .each(($el) => {
            page1Recipes.push($el.text());
          })
          .then(() => {
            // Move to Page 2
            cy.get('.ant-pagination-item')
              .eq(1)
              .click()
              .wait(500)
              .then(() => {
                let page2Recipes = [];
                cy.get("[data-testid='recipeTitle']")
                  .each(($el) => {
                    page2Recipes.push($el.text());
                  })
                  .then(() => {
                    const intersection = page1Recipes.filter((x) =>
                      page2Recipes.includes(x)
                    );
                    expect(intersection).to.have.length(0);
                  });
              });
          });
      });
  });

  it("Able to search recipes with query 'onion' and click page 9 and check item updated", () => {
    visitRecipes();
    cy.get(getElementByName('query')).type('onion');
    cy.get(getElementByDataTestId('SearchIcon'))
      .click()
      .wait(1000)
      .then(() => {
        let page1Recipes = [];
        cy.get("[data-testid='recipeTitle']")
          .each(($el) => {
            page1Recipes.push($el.text());
          })
          .then(() => {
            // Move to Page 9
            cy.get('.ant-pagination-item')
              .eq(5)
              .click()
              .wait(500)
              .then(() => {
                let page9Recipes = [];
                cy.get("[data-testid='recipeTitle']")
                  .each(($el) => {
                    page9Recipes.push($el.text());
                  })
                  .then(() => {
                    const intersection = page1Recipes.filter((x) =>
                      page9Recipes.includes(x)
                    );
                    expect(intersection).to.have.length(0);
                  });
              });
          });
      });
  });

  it("Able to search recipes with query 'onion' and from page 2 to click page 3 and check item updated", () => {
    visitRecipes();
    cy.get(getElementByName('query')).type('onion');
    cy.get(getElementByDataTestId('SearchIcon'))
      .click()
      .wait(1000)
      .then(() => {
        // Move 2 Page 2
        cy.get('.ant-pagination-item')
          .eq(1)
          .click()
          .wait(500)
          .then(() => {
            let page2Recipes = [];
            cy.get("[data-testid='recipeTitle']")
              .each(($el) => {
                page2Recipes.push($el.text());
              })
              .then(() => {
                // Move to Page 3
                cy.get('.ant-pagination-item')
                  .eq(2)
                  .click()
                  .wait(500)
                  .then(() => {
                    let page3Recipes = [];
                    cy.get("[data-testid='recipeTitle']")
                      .each(($el) => {
                        page3Recipes.push($el.text());
                      })
                      .then(() => {
                        const intersection = page2Recipes.filter((x) =>
                          page3Recipes.includes(x)
                        );
                        expect(intersection).to.have.length(0);
                      });
                  });
              });
          });
      });
  });

  it("Able to search recipes with query 'onion' and click next button and check item updated with page 2", () => {
    visitRecipes();
    cy.get(getElementByName('query')).type('onion');
    cy.get(getElementByDataTestId('SearchIcon'))
      .click()
      .wait(1000)
      .then(() => {
        let page1Recipes = [];
        cy.get("[data-testid='recipeTitle']")
          .each(($el) => {
            page1Recipes.push($el.text());
          })
          .then(() => {
            // Move to Page 2 with click Next button
            cy.get('.ant-pagination-next')
              .first()
              .click()
              .wait(500)
              .then(() => {
                // Check Page 2 button become active state
                cy.get('.ant-pagination-item')
                  .eq(1)
                  .then(($el) => {
                    let classNames = $el[0].className.split(' ');
                    expect(classNames).to.contain('ant-pagination-item-2');
                    expect(classNames).to.contain('ant-pagination-item-active');
                  });

                let page2Recipes = [];
                cy.get("[data-testid='recipeTitle']")
                  .each(($el) => {
                    page2Recipes.push($el.text());
                  })
                  .then(() => {
                    const intersection = page1Recipes.filter((x) =>
                      page2Recipes.includes(x)
                    );
                    expect(intersection).to.have.length(0);
                  });
              });
          });
      });
  });

  it("Able to search recipes with query 'onion' and from page 2 to click next button and check item updated with page 3", () => {
    visitRecipes();
    cy.get(getElementByName('query')).type('onion');
    cy.get(getElementByDataTestId('SearchIcon'))
      .click()
      .wait(1000)
      .then(() => {
        // Move 2 Page 2
        cy.get('.ant-pagination-item')
          .eq(1)
          .click()
          .wait(500)
          .then(() => {
            let page2Recipes = [];
            cy.get("[data-testid='recipeTitle']")
              .each(($el) => {
                page2Recipes.push($el.text());
              })
              .then(() => {
                // Move to Page 3
                cy.get('.ant-pagination-next')
                  .first()
                  .click()
                  .wait(500)
                  .then(() => {
                    // Check Page 3 button become active state
                    cy.get('.ant-pagination-item')
                      .eq(2)
                      .then(($el) => {
                        let classNames = $el[0].className.split(' ');
                        expect(classNames).to.contain('ant-pagination-item-3');
                        expect(classNames).to.contain(
                          'ant-pagination-item-active'
                        );
                      });

                    let page3Recipes = [];
                    cy.get("[data-testid='recipeTitle']")
                      .each(($el) => {
                        page3Recipes.push($el.text());
                      })
                      .then(() => {
                        const intersection = page2Recipes.filter((x) =>
                          page3Recipes.includes(x)
                        );
                        expect(intersection).to.have.length(0);
                      });
                  });
              });
          });
      });
  });

  it("Able to search recipes with query 'onion' and from page 9 and click page 8 and check item updated", () => {
    visitRecipes();
    cy.get(getElementByName('query')).type('onion');
    cy.get(getElementByDataTestId('SearchIcon'))
      .click()
      .wait(1000)
      .then(() => {
        // Move to Page 9
        cy.get('.ant-pagination-item')
          .eq(5)
          .click()
          .wait(500)
          .then(() => {
            let page9Recipes = [];
            cy.get("[data-testid='recipeTitle']")
              .each(($el) => {
                page9Recipes.push($el.text());
              })
              .then(() => {
                // Move to Page 8
                cy.get('.ant-pagination-item')
                  .eq(4)
                  .click()
                  .wait(500)
                  .then(() => {
                    let page8Recipes = [];
                    cy.get("[data-testid='recipeTitle']")
                      .each(($el) => {
                        page8Recipes.push($el.text());
                      })
                      .then(() => {
                        // Check Page 8 button become active state
                        cy.get('.ant-pagination-item')
                          .eq(4)
                          .then(($el) => {
                            let classNames = $el[0].className.split(' ');
                            expect(classNames).to.contain(
                              'ant-pagination-item-8'
                            );
                            expect(classNames).to.contain(
                              'ant-pagination-item-active'
                            );
                          });

                        const intersection = page9Recipes.filter((x) =>
                          page8Recipes.includes(x)
                        );
                        expect(intersection).to.have.length(0);
                      });
                  });
              });
          });
      });
  });

  it("Able to search recipes with query 'onion' and from page 9 and click page 7 and check item updated", () => {
    visitRecipes();
    cy.get(getElementByName('query')).type('onion');
    cy.get(getElementByDataTestId('SearchIcon'))
      .click()
      .wait(1000)
      .then(() => {
        // Move to Page 9
        cy.get('.ant-pagination-item')
          .eq(5)
          .click()
          .wait(500)
          .then(() => {
            let page9Recipes = [];
            cy.get("[data-testid='recipeTitle']")
              .each(($el) => {
                page9Recipes.push($el.text());
              })
              .then(() => {
                // Move to Page 7
                cy.get('.ant-pagination-item')
                  .eq(3)
                  .click()
                  .wait(500)
                  .then(() => {
                    let page7Recipes = [];
                    cy.get("[data-testid='recipeTitle']")
                      .each(($el) => {
                        page7Recipes.push($el.text());
                      })
                      .then(() => {
                        // Check Page 7 button become active state
                        cy.get('.ant-pagination-item')
                          .eq(3)
                          .then(($el) => {
                            let classNames = $el[0].className.split(' ');
                            expect(classNames).to.contain(
                              'ant-pagination-item-7'
                            );
                            expect(classNames).to.contain(
                              'ant-pagination-item-active'
                            );
                          });

                        const intersection = page9Recipes.filter((x) =>
                          page7Recipes.includes(x)
                        );
                        expect(intersection).to.have.length(0);
                      });
                  });
              });
          });
      });
  });

  it("Able to search recipes with query 'onion' and from page 9 and click page 1 and check item updated", () => {
    visitRecipes();
    cy.get(getElementByName('query')).type('onion');
    cy.get(getElementByDataTestId('SearchIcon'))
      .click()
      .wait(1000)
      .then(() => {
        // Move to Page 9
        cy.get('.ant-pagination-item')
          .eq(5)
          .click()
          .wait(500)
          .then(() => {
            let page9Recipes = [];
            cy.get("[data-testid='recipeTitle']")
              .each(($el) => {
                page9Recipes.push($el.text());
              })
              .then(() => {
                // Move to Page 1
                cy.get('.ant-pagination-item')
                  .eq(0)
                  .click()
                  .wait(500)
                  .then(() => {
                    let page1Recipes = [];
                    cy.get("[data-testid='recipeTitle']")
                      .each(($el) => {
                        page1Recipes.push($el.text());
                      })
                      .then(() => {
                        // Check Page 1 button become active state
                        cy.get('.ant-pagination-item')
                          .eq(0)
                          .then(($el) => {
                            let classNames = $el[0].className.split(' ');
                            expect(classNames).to.contain(
                              'ant-pagination-item-1'
                            );
                            expect(classNames).to.contain(
                              'ant-pagination-item-active'
                            );
                          });

                        const intersection = page9Recipes.filter((x) =>
                          page1Recipes.includes(x)
                        );
                        expect(intersection).to.have.length(0);
                      });
                  });
              });
          });
      });
  });

  it("Able to search recipes with query 'onion' and from page 9 and click prev button and check item updated with page 8", () => {
    visitRecipes();
    cy.get(getElementByName('query')).type('onion');
    cy.get(getElementByDataTestId('SearchIcon'))
      .click()
      .wait(1000)
      .then(() => {
        // Move to Page 9
        cy.get('.ant-pagination-item')
          .eq(5)
          .click()
          .wait(500)
          .then(() => {
            let page9Recipes = [];
            cy.get("[data-testid='recipeTitle']")
              .each(($el) => {
                page9Recipes.push($el.text());
              })
              .then(() => {
                // Move to Page 8 with click prev button
                cy.get('.ant-pagination-prev')
                  .first()
                  .click()
                  .wait(500)
                  .then(() => {
                    let page8Recipes = [];
                    cy.get("[data-testid='recipeTitle']")
                      .each(($el) => {
                        page8Recipes.push($el.text());
                      })
                      .then(() => {
                        // Check Page 8 button become active state
                        cy.get('.ant-pagination-item')
                          .eq(4)
                          .then(($el) => {
                            let classNames = $el[0].className.split(' ');
                            expect(classNames).to.contain(
                              'ant-pagination-item-8'
                            );
                            expect(classNames).to.contain(
                              'ant-pagination-item-active'
                            );
                          });

                        const intersection = page9Recipes.filter((x) =>
                          page8Recipes.includes(x)
                        );
                        expect(intersection).to.have.length(0);
                      });
                  });
              });
          });
      });
  });

  it("Able to search recipes with query 'onion' and from page 8 and click prev button and check item updated with page 7", () => {
    visitRecipes();
    cy.get(getElementByName('query')).type('onion');
    cy.get(getElementByDataTestId('SearchIcon'))
      .click()
      .wait(1000)
      .then(() => {
        // Move to Page 9
        cy.get('.ant-pagination-item')
          .eq(5)
          .click()
          .wait(500)
          .then(() => {
            // Move to Page 8
            cy.get('.ant-pagination-item')
              .eq(4)
              .click()
              .wait(500)
              .then(() => {
                let page8Recipes = [];
                cy.get("[data-testid='recipeTitle']")
                  .each(($el) => {
                    page8Recipes.push($el.text());
                  })
                  .then(() => {
                    // Move to Page 7 with click prev button
                    cy.get('.ant-pagination-prev')
                      .first()
                      .click()
                      .wait(500)
                      .then(() => {
                        let page7Recipes = [];
                        cy.get("[data-testid='recipeTitle']")
                          .each(($el) => {
                            page7Recipes.push($el.text());
                          })
                          .then(() => {
                            // Check Page 7 button become active state
                            cy.get('.ant-pagination-item')
                              .eq(3)
                              .then(($el) => {
                                let classNames = $el[0].className.split(' ');
                                expect(classNames).to.contain(
                                  'ant-pagination-item-7'
                                );
                                expect(classNames).to.contain(
                                  'ant-pagination-item-active'
                                );
                              });

                            const intersection = page8Recipes.filter((x) =>
                              page7Recipes.includes(x)
                            );
                            expect(intersection).to.have.length(0);
                          });
                      });
                  });
              });
          });
      });
  });
});
