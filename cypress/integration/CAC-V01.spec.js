// untitled.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('V01: Central de Atendimento ao Cliente', () => {

    beforeEach(() => {
        cy.Go('./src/index.html')
    })
    
    it('verifica o título da aplicação', () => {
        cy.Check_PageTitle('Central de Atendimento ao Cliente TAT')
    })

    context('Testes Negócio', () => {

        it.only('Cadastramento bem sucedido', () => {

            cy.Text('#firstName', 'Alexandre')
            cy.Text('#lastName', 'Bartie')
            cy.Text('#email', 'bartie.devops@outlook.com')
            cy.Text('#open-text-area', 'Agradecido!')

            cy.Click('button[type="submit"]')

            cy.Assert_ElementIsVisible('.success')
        })

        it.only('Cadastramento com comando customizado', () => {

            cy.Text('#firstName', 'Alexandre')
            cy.Text('#lastName', 'Bartie')
            cy.Text('#email', 'bartie.devops@outlook.com')
            cy.Text('#open-text-area', 'Agradecido!')

            cy.Click('button[type="submit"]')

            cy.Assert_ElementIsVisible('.success')
        })

    })

    context('Testes Usabilidade', () => {

        it.only('Forçar erro na digitaçao do e-mail', () => {

            cy.Text('#firstName', 'Alexandre')
            cy.Text('#lastName', 'Bartie')
            cy.Text('#email', 'bartie.devops$outlook.com')
            cy.Text('#open-text-area', 'Agradecido!')

            cy.Click('button[type="submit"]')

            cy.Assert_ElementIsVisible('.error')
        })
        
        it.only('Forçar entrada de caracteres no campo telefone', () => {

            cy.Text('#firstName', 'Alexandre')
            cy.Text('#lastName', 'Bartie')
            cy.Text('#email', 'bartie.devops@outlook.com')
            cy.Text('#phone', 'ABCDEFGHI')
            cy.Text('#open-text-area', 'Agradecido!')
            cy.Click('button[type="submit"]')

            cy.Assert_ElementIsVisible('.success')
        })

        it.only('Não digitar nenhuma informação', () => {

            cy.Click('button[type="submit"]')

            cy.Assert_ElementIsVisible('.error')
        })

    })   

})



