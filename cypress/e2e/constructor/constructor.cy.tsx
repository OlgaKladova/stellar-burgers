describe('проверка работы конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' })
      .as('getIngredients');
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
    cy.get(`[data-cy=${"643d69a5c3f7b9001cfa0943"}]`).as('ingredient');
  });

  it('добавление ингредиента из списка в конструктор', () => {
    cy.get(`[data-cy=${"constructorIngredient-643d69a5c3f7b9001cfa0943"}]`)
      .should('not.exist');
    cy.get('@ingredient')
      .children('button')
      .click();
    cy.get(`[data-cy=${"constructorIngredient-643d69a5c3f7b9001cfa0943"}]`)
      .should('be.visible')
      .should('include.text', "Супержирный соус");

    cy.get(`[data-cy=${"constructorBun-643d69a5c3f7b9001cfa093d"}]`)
      .should('not.exist');
    cy.get(`[data-cy=${"643d69a5c3f7b9001cfa093d"}]`)
      .children('button')
      .click();
    cy.get(`[data-cy=${"constructorBun-643d69a5c3f7b9001cfa093d"}]`)
      .should('be.visible')
      .should('include.text', "Флюоресцентная булка R2-D3");
  });

  it('открытие и закрытие модального окна с описанием ингредиента', () => {
    cy.get(`[data-cy=${'modal'}]`).should('not.exist');
    cy.get('@ingredient')
      .children('a')
      .click();
    cy.get(`[data-cy=${'modal'}]`)
      .as('modal')
      .should('be.visible')
      .should('include.text', "Супержирный соус");
    
    cy.get('@modal').should('be.visible');
    cy.get(`[data-cy=${'btnCloseModal'}]`)
      .children('svg')
      .click();
    cy.get('@modal').should('not.exist');

    cy.get('@ingredient')
      .children('a')
      .click();
    cy.get('@modal').should('be.visible');
    cy.get(`[data-cy=${'modalOverlay'}]`).click({force: true});
    cy.get('@modal').should('not.exist');
  });

  it('проверка создания заказа', () => {
    cy.setCookie('accessToken', 'Bearer abracadabra123');
    cy.getCookie('accessToken').should('have.property', 'value', 'Bearer abracadabra123');
    localStorage.setItem('refreshToken', 'kakoytorefreshtoken');
    cy.getAllLocalStorage().then((result) => {
      expect(result).to.deep.equal({
        'http://localhost:4000': {
          refreshToken: 'kakoytorefreshtoken',
        },
      })
    });

    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('postOrder');

    cy.get(`[data-cy=${'constructorNotIngredients'}]`)
      .as('notIngredients')
      .should('be.visible');
    cy.get(`[data-cy=${"constructorIngredient-643d69a5c3f7b9001cfa0943"}]`)
      .should('not.exist')
    cy.get('@ingredient')
      .children('button')
      .click();
    cy.get('@notIngredients').should('not.exist');    
    cy.get(`[data-cy=${"constructorIngredient-643d69a5c3f7b9001cfa0943"}]`)
      .as('constructorIngredient')
      .should('be.visible')
      .should('include.text', "Супержирный соус");
    
    cy.get(`[data-cy=${'constructorNotBun'}]`)
      .as('notBun')
      .should('be.visible');
    cy.get(`[data-cy=${"constructorBun-643d69a5c3f7b9001cfa093d"}]`)
      .should('not.exist')
    cy.get(`[data-cy=${"643d69a5c3f7b9001cfa093d"}]`)
      .children('button')
      .click();
    cy.get('@notBun').should('not.exist');  
    cy.get(`[data-cy=${"constructorBun-643d69a5c3f7b9001cfa093d"}]`)
      .as('constructorBun')
      .should('be.visible')
      .should('include.text', "Флюоресцентная булка R2-D3");

    cy.get(`[data-cy=${'modal'}]`)
      .should('not.exist');
    cy.get(`[data-cy=${'buttonOrder'}]`)
      .click();
    cy.wait('@postOrder');
    cy.get(`[data-cy=${'modal'}]`)
      .as('modal')
      .should('be.visible')
      .should('include.text', "76587");
    cy.get(`[data-cy=${'btnCloseModal'}]`)
      .children('svg')
      .click();
    cy.get('@modal').should('not.exist');
    
    cy.get('@constructorBun').should('not.exist');
    cy.get('@notBun').should('be.visible');
    cy.get('@constructorIngredient').should('not.exist');
    cy.get('@notIngredients').should('be.visible');

    cy.clearCookie('accessToken');
    cy.getCookie('accessToken').should('be.null');
    cy.clearLocalStorage('refreshToken').then((ls) => {
      expect(ls.getItem('refreshToken')).to.be.null
    })
  })
}) 