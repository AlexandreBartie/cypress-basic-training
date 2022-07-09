//
// -- Assert Commands --
//

Cypress.Commands.add('Assert_ElementIsVisible', (element, content) => {
    cy.Element(element, content).should('be.visible')
})

Cypress.Commands.add('Assert_ElementIsHide', (element, content) => {
    cy.Element(element, content).should('not.be.visible')
})

Cypress.Commands.add('Assert_ElementHasValue', (value, element, content) => {
    cy.Element(element, content).should('have.value', value)
})

Cypress.Commands.add('Assert_ElementIsEmpty', (element, content) => {
    cy.Element(element, content).should('have.value', '')
})

Cypress.Commands.add('Assert_ElementNoEmpty', (element, content) => {
    cy.Element(element, content).should('not.have.value', '')
})

Cypress.Commands.add('Assert_FindText', (value, element, content) => {
    cy.Element(element, content).contains(value).should('be.visible')
})

Cypress.Commands.add('Assert_ElementFade', (seconds, element, content) => {

    // Check 1 second before to Hide
    
    cy.Timer(seconds-1)

    cy.Assert_ElementIsVisible(element, content)

    // Check exact time to Hide
    
    cy.Timer(1)

    cy.Assert_ElementIsHide(element, content)

})

Cypress.Commands.add('Assert_FindTextFade', (seconds, value, element, content) => {

    cy.Assert_FindText(value, element, content)

    //cy.Assert_ElementFade(seconds, element, content)

})

// -- Assert Pages --

Cypress.Commands.add('Assert_PageTitle', (text) => {
    cy.title().should(text)
})

// -- Assert Sintaxe --

Cypress.Commands.add('Assert_ErrorScript', () => {
    cy.assert.text('Error Script')
})