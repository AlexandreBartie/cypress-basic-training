/// <reference types="Cypress" />

const sysForm = {}

function SetupMapping() {

    sysForm.url = './src/index.html'

}

describe('Advanced: Central de Atendimento ao Cliente', () => {

    beforeEach(() => {

        SetupMapping()

        cy.Go(sysForm.url)

    })

    it.only('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      var loop = 0

      Cypress._.times(5, () => {

        const mask = '#open-text-area'

        loop = loop + 1
      
        it.only('preenche texto usando o .invoke ' + loop, () => {

            var long_text = Cypress._.repeat('ABCabc#',10)

            cy.Text(long_text, mask)

            var long_text = Cypress._.repeat('123abc#',10)

            cy.SetValue(long_text, mask)

        })

    })

})