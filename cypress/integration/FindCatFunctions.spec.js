/// <reference types="Cypress" />

const sysForm = {}

function SetupMapping() {

    sysForm.url = './src/index.html'

}

describe('Find Pet: Central de Atendimento ao Cliente', () => {

    beforeEach(() => {

        SetupMapping()

        cy.Go(sysForm.url)

    })
    it.only('Exibir o PET escondido no código', () => {

        cy.get('#cat')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')

        cy.get('#title')
          .invoke('text', '! CAT FINDED !')

          cy.get('#subtitle')
          .invoke('text',  'I 💖 cats')


    })

})

