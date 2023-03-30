describe('Shopping Cart', () => {
    // Helper function to log in a user
    const login = () => {
      cy.visit('http://localhost:3000');
  
      cy.get('#login-link').click()
    // cy.get('#login-link').trigger('click')click()
    cy.get('[data-testid="email-input"]')
      .type(Cypress.env('test_user_email'))
      .should('have.value', Cypress.env('test_user_email'));

    cy.get('[data-testid="password-input"]')
      .type(Cypress.env('test_user_password'))
      .should('have.value', Cypress.env('test_user_password'));

    // Click the login button
    cy.get('#login-button').click();

    // Check if the user's name or other identifying element is visible on the page
    cy.get('#user-display-message', { timeout: 5000 }).should('contain', 'Welcome, user who is logged in.'); // Replace 'Test User' with the expected display name

    it('should display the signout link when user is logged in', () => {
      cy.get('#signout-button').contains('Sign out').should('be.visible');
    });
    };
  
    // Helper function to add an item to the cart
    const addItemToCart = () => {
      cy.get('[data-testid="product-card"]:first')
        .find('[data-testid="add-to-cart-button"]')
        .click();
    };
  
    beforeEach(() => {
      login();
    });
  
    it('should add an item to the cart', () => {
      addItemToCart();
      cy.get('[data-testid="cart-item-count"]').should('contain', '1');
    });
  
    it('should remove an item from the cart', () => {
      addItemToCart();
      cy.get('[data-testid="cart-link"]').click();
      cy.get('[data-testid="remove-item-button"]').click();
      cy.get('[data-testid="cart-item"]').should('not.exist');
    });
  
    it('should display the cart page when the cart link is clicked', () => {
      cy.get('[data-testid="cart-link"]').click();
      cy.get('[data-testid="cart-page"]').should('be.visible');
    });
  
    it('should display an empty cart message when the cart is empty', () => {
      cy.get('[data-testid="cart-link"]').click();
      cy.get('[data-testid="empty-cart-message"]').should('be.visible');
    });
  });
  