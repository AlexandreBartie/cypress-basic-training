/// <reference types="Cypress" />

const url = 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'

describe('API: Central de Atendimento ao Cliente', () => {
    
    it.only('requisição HTTP', () => {

        cy.request(url)
            .should(function(response) {
                
                const { status, statusText, body } = response
                
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')

                console.log(response)
            })


    })

})