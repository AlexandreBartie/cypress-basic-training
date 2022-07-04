
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

    cy.Element(element, content).selectFile(path + file, { action: mode })

}