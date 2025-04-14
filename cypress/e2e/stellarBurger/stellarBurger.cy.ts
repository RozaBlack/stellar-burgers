import user from '../../fixtures/user.json'

describe('Проверка доступности приложения', function() {
  it('сервис должен быть доступен по адресу localhost:5173', function() {
      cy.visit('http://localhost:5173'); 
  });
});

describe('Проверка функциональности главной страницы', {
  viewportHeight: 1500,
  viewportWidth: 2000,
}, () => {
  beforeEach(() => {
    cy.setCookie('accessToken', user.accessToken);
    localStorage.setItem('refreshToken', user.refreshToken);

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as("ingredients");
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' }).as("user");
    cy.visit('http://localhost:5173/')

    cy.wait('@ingredients');
    cy.wait('@user');
  })

  afterEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
  })

  describe('Проверка взаимодействия с ингредиентами', () => {

    describe('Проверка добавления ингредиентов в конструктор', () => {
      it('Добавление булки в конструктор', () => {
        cy.get(`[data-cy='constuctorNoBun']`)
          .should('exist');
  
        cy.get(`[data-cy=${"643d69a5c3f7b9001cfa093c"}] button`).click();
  
        cy.get(`[data-cy='consructorBun']`)
          .find('span')
          .contains('Краторная булка N-200i')
          .should('exist');
      })
  
      it('Добавление начинки в конструктор', () => {
        cy.get(`[data-cy='constuctorNoIngredients']`)
          .should('exist');
  
        cy.get(`[data-cy=${"643d69a5c3f7b9001cfa093e"}] button`).click();
  
        cy.get(`[data-cy='consructorIngredients']`)
          .find('span')
          .contains('Филе Люминесцентного тетраодонтимформа')
          .should('exist');
      })
  
      it('Добавление соуса в конструктор', () => {
        cy.get(`[data-cy='constuctorNoIngredients']`)
          .should('exist');
  
        cy.get(`[data-cy=${"643d69a5c3f7b9001cfa0943"}] button`).click();
  
        cy.get(`[data-cy='consructorIngredients']`)
          .find('span')
          .contains('Соус фирменный Space Sauce')
          .should('exist');
      })
    })

    describe('Проверка открытия и закрытия модального окна ингредиента', () => {
      beforeEach(() => {
        cy.get(`[data-cy=${"643d69a5c3f7b9001cfa0949"}]`).click();
      })

      it('Открытие модального окна ингредиента', () => {
        cy.get(`[data-cy='modal'] [data-cy='modalIngredient']`)
          .find('h3')
          .contains('Мини-салат Экзо-Плантаго')
          .should('exist');
      })

      it('Закрытие модального окна ингредиента кликом на крестик', () => {
        cy.get(`[data-cy='modal'] button`).click();
        cy.get(`[data-cy='modal']`)
          .should('not.exist');
      })

      it('Закрытие модального окна ингредиента кликом на оверлей', () => {
        cy.get(`[data-cy='modalOverlay']`).click({force:true});
        cy.get(`[data-cy='modal']`)
          .should('not.exist');
      })

      it('Закрытие модального окна ингредиента кликом на ESC', () => {
        cy.get(`body`).type('{esc}');
        cy.get(`[data-cy='modal']`)
          .should('not.exist');
      })
    })
    
  })

  describe('Проверка создания заказа', () => {

    describe('Проверка кнопки "Оформить заказ"', () => {
      it('Когда булки не выбраны, кнопка "Оформить заказ" не активна', () => {
        cy.get(`[data-cy='constuctorNoBun']`)
          .should('exist');

        cy.get(`[data-cy='orderButton']`)
          .should('be.disabled');
      })

      it('Когда булки выбраны, кнопка "Оформить заказ" активна', () => {
        cy.get(`[data-cy=${"643d69a5c3f7b9001cfa093c"}] button`).click();
        cy.get(`[data-cy='orderButton']`)
          .should('be.enabled');
      })
    })

    describe('Проверка оформления заказа и работы модального окна с подтверждением заказа', () => {
      beforeEach(() => {
        cy.intercept('POST', 'api/orders', { fixture: 'order' }).as(
          'order'
        );

        cy.get(`[data-cy=${"643d69a5c3f7b9001cfa093c"}] button`).click();
        cy.get(`[data-cy=${"643d69a5c3f7b9001cfa093e"}] button`).click();
        cy.get(`[data-cy=${"643d69a5c3f7b9001cfa0949"}] button`).click();
        cy.get(`[data-cy=${"643d69a5c3f7b9001cfa0943"}] button`).click();
        cy.get(`[data-cy='orderButton']`).click();

        cy.wait('@order');

      })
      it('Проверка открытия модального окна заказа с правильным номером', () => {
        cy.get(`[data-cy='modal']`)
          .find('h2')
          .contains('74645')
          .should('exist');
      })

      it('Проверка закрытия модального окна заказа и отчистка конструктора', () => {
        cy.get(`[data-cy='modal'] button`).click();
        cy.get(`[data-cy='modal']`)
          .should('not.exist');

        cy.get(`[data-cy='constuctorNoBun']`)
          .should('exist');
        cy.get(`[data-cy='constuctorNoIngredients']`)
          .should('exist'); 
      })
    })
  })

})