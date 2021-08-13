/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable jest/expect-expect */

context('Click', () => {
  beforeEach(() => {
    cy.viewport(800, 600)
    cy.visit('/cypress/fixtures/click.html')
  })

  it('allows clicking links in popovers', () => {
    cy.findByTitle('See Footnote 1').click()
    cy.get('.littlefoot__popover').should('not.have.class', 'is-scrollable')
    cy.get('.littlefoot__content').should('not.have.attr', 'tabindex')
    cy.findAllByText('a link').first().click()
    cy.findByText('OK')
  })

  it('reveals popover content that is not scrollable when short', () => {
    cy.findByTitle('See Footnote 1').click()
    cy.get('.littlefoot__popover').should('not.have.class', 'is-scrollable')
    cy.get('.littlefoot__content').should('not.have.attr', 'tabindex')
  })
})
