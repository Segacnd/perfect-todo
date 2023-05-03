import '@testing-library/cypress/add-commands';

describe('render something', () => {
  it('render correctly', () => {
    cy.visit('/');
    cy.findByTestId('authTitle').should('exist');
    cy.findByTestId('email').should('exist').type('Segabelka@yandex.ru');
    cy.findByTestId('password').should('exist').type('Baklajan111');
    cy.findByTestId('button').should('exist').click();
  });
});
