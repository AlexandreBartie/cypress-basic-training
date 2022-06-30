//
// -- Action Commands --
//

const text_delay = 0


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
        cy.Element(element, content).clear().type(text, { delay: text_delay} )
})

Cypress.Commands.add('Combo', (value, element, content) => {

    if (IsFull(value) || !IsString(value) )
        cy.Element(element, content).select(value)
})

Cypress.Commands.add('Radio', (value, element) => {

    const element_ext = element + '[value="' + value + '"]'

    if (IsFull(value) || !IsString(value) )
        cy.Element(element_ext).check()

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

Cypress.Commands.add('Link', (element, content) => {

    //cy.Element(element, content).invoke('removeAttr', "target").click()
    
    
    RemoveAttr(element, content, 'target').click()

   // CallLink(element, content)

})

Cypress.Commands.add('ActionFile', (mode, path, file, element, content) => {

    switch (mode) 
    {     
        case 'Upload': 
            cy.UploadFile(path, file, element, content)
            break

        case 'DragDrop': 
            cy.DragDropFile(path, file, element, content)
            break
    }

})

Cypress.Commands.add('UploadFile', (path, file, element, content) => {
   
    SelectFile('select', path, file, element, content)

})

Cypress.Commands.add('DragDropFile', (path, file, element, content) => {

    SelectFile('drag-drop', path, file, element, content)

})

function SelectFile(mode, path, file, element, content) {

    cy.Element(element, content).selectFile(path + file, { action: mode })//.should(function($input) { expected($input[0].files[0].name).to.equal(file) })

}

function HasLink(element, content) {

    cy.Element(element, content).should('have.attr', 'target', '_blank')

}

function GetAttr(element, content, attribute) {

    return cy.Element(element, content).invoke('attr', 'href')

}

function RemoveAttr(element, content, attribute) {

    return cy.Element(element, content).invoke('removeAttr', attribute)

}

function CallLink(element, content) {

    cy.visit(GetAttr(element, content, 'href'))

}

function GetFileName(list, name) {

    expected(list.files[0].name).to.equal(name)

}

function HasArg(arg) {

    return (typeof arg !== 'undefined')

}

function IsString(arg) {

    return (typeof arg == 'string')

}

function IsFull(text) {

    return (text != "")

}

