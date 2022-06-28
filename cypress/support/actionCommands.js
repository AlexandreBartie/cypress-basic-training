//
// -- Action Commands --
//

Cypress.Commands.add('Go', (url) => {
    cy.visit(url)
})

Cypress.Commands.add('Find', (element, content) => {

    if (HasArg(element) && HasArg(content))
        cy.contains(element,content)
       
})

Cypress.Commands.add('Element', (element, content) => {

    if (HasArg(element))

        if (HasArg(content))
            cy.Find(element,content)
        else
            cy.get(element)
       
})

Cypress.Commands.add('Text', (text, element, content) => {

    if (IsFull(text))
        cy.Element(element, content).clear().type(text, { delay: 4} )
})

Cypress.Commands.add('Combo', (value, element, content) => {

    if (IsFull(value) || !IsString(value) )
        cy.Element(element, content).select(value)
})

Cypress.Commands.add('Radio', (value, element) => {

    const element_ext = element + '[value="' + value + '"]'

    if (IsFull(value) || !IsString(value) )
    {

        cy.Element(element_ext).check()

    }

})

Cypress.Commands.add('Option', (selected, element, content) => {
    
    if (selected)
        cy.Element(element, content).check()
    else
        cy.Element(element, content).uncheck()
})

Cypress.Commands.add('Click', (element, content) => {

    cy.Element(element, content).click() 

})

function HasArg(arg) {

    return (typeof arg !== 'undefined')

}

function IsString(arg) {

    return (typeof arg === 'string')

}

function IsFull(text) {

    return (text != "")

}

