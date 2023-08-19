describe('Tests', () => {

  it('E2E tests', () => {
    // Start page
    cy.visit('http://localhost:3000/add')

    // Type text in email field
    cy.get('form>div>input').eq(2).type('user')

    // Click submit button
    cy.get('form').contains('Submit').click()

    // Error message for email field should include Please use email format
    cy.get('form>span').eq(2).should("have.text", "Please use email format")

  })

  it('should go to home page', () => {
    // Start page
    cy.visit('http://localhost:3000/add')

    // Look for route with home href
    cy.get('a[href*="home"]').click()

    // Url should have home in pathname"
    cy.url().should('include', '/home')
  })

})

export {}