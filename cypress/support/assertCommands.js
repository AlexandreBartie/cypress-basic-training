//
// -- Assert Commands --
//

Cypress.Commands.add('Assert_ElementIsVisible', (element, content) => {
    cy.Element(element, content).should('be.visible')
})

Cypress.Commands.add('Assert_ElementValue', (value, element, content) => {
    cy.Element(element, content).should('have.value', value)
})

Cypress.Commands.add('Assert_ElementIsEmpty', (element, content) => {
    cy.Element(element, content).should('have.value', '')
})

Cypress.Commands.add('Assert_ElementNoEmpty', (element, content) => {
    cy.Element(element, content).should('not.have.value', '')
})

Cypress.Commands.add('Assert_FindText', (value, element, content) => {
    cy.Element(element, content).contains(value)//.should('be.visible')
})

// -- Assert Pages --

Cypress.Commands.add('Assert_PageTitle', (text) => {
    cy.title().should(text)
})

// -- Assert Sintaxe --

Cypress.Commands.add('Assert_ErrorScript', () => {
    cy.assert.text('Error Script')
})