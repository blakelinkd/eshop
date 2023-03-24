describe('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Logs in the test user', () => {
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

  });

  it('should display the correct page title', () => {
    cy.title().should('eq', 'My Next.js Landing Page');
  });

  it('should display the navbar', () => {
    cy.get('nav').should('be.visible');
  });

  it('should display the home page content', () => {
    cy.get('section').should('be.visible');
  });

  it('should display the popular items section', () => {
    cy.get('section.container').should('be.visible');
  });

  it('should display the newsletter section', () => {
    cy.get('section.bg-gray-800').should('be.visible');
  });

  it('should display the footer', () => {
    cy.get('footer').should('be.visible');
  });

  it('should display the login link when user is not logged in', () => {
    cy.get('span').contains('Login').should('be.visible');
  });

  it('should display the signup link when user is not logged in', () => {
    cy.get('span').contains('SignUp').should('be.visible');
  });



  it('should display the login page when login link is clicked', () => {
    cy.get('span').contains('Login').click();
    cy.get('form').should('be.visible');
  });

  it('should display the signup page when signup link is clicked', () => {
    cy.get('span').contains('SignUp').click();
    cy.get('form').should('be.visible');
  });

  it('should display the Login link when signout link is clicked', () => {
    cy.get('#login-link').contains('Login').should('be.visible')
  });

  it('should only show the login form when the Login link is clicked', () => {
    cy.get('#login-link').click()
    cy.contains('Login').should('be.visible')
    cy.contains('SignUp').should('not.be.visible')
  })



})