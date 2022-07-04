
Cypress.Commands.add('ScreenShot', (name, element) => {

    if (HasArg(element))
        cy.get(element).screenshot(name)
    else
        cy.screenshot(name)

})

function HasArg(arg) {

    return (typeof arg !== 'undefined')

}