Cypress.Commands.add('SetClock', (text, element, content) => {

    cy.clock()

})

Cypress.Commands.add('Timer', (seconds) => {

    cy.tick(seconds * 1000)

})