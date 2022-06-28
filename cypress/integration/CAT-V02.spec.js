/// <reference types="Cypress" />

const sysForm = {}
const maskForm = { }
const dataForm = { }
const checkForm = { }

function SetupMapping() {

    sysForm.title = 'Central de Atendimento ao Cliente TAT'

    // Page Mapping

    maskForm.firstName = '#firstName'
    maskForm.lastName = '#lastName'
    maskForm.email = '#email'
    maskForm.phone = '#phone'

    maskForm.product = '#product'
    maskForm.support = ':radio'

    maskForm.ContactEmail = '#email-checkbox'
    maskForm.ContactPhone = '#phone-checkbox'

    maskForm.memo = '#open-text-area'

    maskForm.submit = ':submit'

    maskForm.success = '.success'
    maskForm.error = '.error'

    // Data Mapping
    
    dataForm.ContactEmail = false
    dataForm.ContactPhone = false

    dataForm.firstName = 'Alexandre'
    dataForm.lastName = 'Bartie'
    dataForm.email = 'bartie.devops@outlook.com'
    dataForm.phone = ''
    dataForm.product = ''
    dataForm.support = ''

    dataForm.memo = 'Agradecido!'

    // Check Mapping

    checkForm.IsEmptyPhone = false
    checkForm.success = false
}

Cypress.Commands.add('PageCustomer_FillForm', () => {

    cy.Text(dataForm.firstName, maskForm.firstName)
    cy.Text(dataForm.lastName, maskForm.lastName)
    cy.Text(dataForm.email, maskForm.email)
    cy.Text(dataForm.phone, maskForm.phone)

    cy.Combo(dataForm.product, maskForm.product)

    cy.Radio(dataForm.support, maskForm.support)

    cy.Option(dataForm.ContactEmail, maskForm.ContactEmail)
    cy.Option(dataForm.ContactPhone, maskForm.ContactPhone)

    cy.Text(dataForm.memo, maskForm.memo)

    if (checkForm.IsEmptyPhone)
        cy.Assert_ElementIsEmpty(maskForm.phone)

    cy.Click(maskForm.submit) 

    if (checkForm.success)
        cy.Assert_ElementIsVisible(maskForm.success)
    else
        cy.Assert_ElementIsVisible(maskForm.error)

})

describe('V02: Central de Atendimento ao Cliente', () => {

    beforeEach(() => {

        cy.Go('./src/index.html')

        SetupMapping()
    })
    
    context('Testes Negócio', () => {

        it('Cadastramento com dados mínimos', () => {

            checkForm.success = true

        })

        it('Cadastramento incluindo produto (by Value)', () => {

            dataForm.product = 'YouTube'
          
            checkForm.success = true

        })

        it('Cadastramento incluindo produto (By Index)', () => {

            dataForm.product = 2
          
            checkForm.success = true

        })

        it.only('Cadastramento modificando Tipo Atendimento', () => {

            dataForm.support = 'feedback'
          
            checkForm.success = true

        })

        it('Definir Contato por telefone e informá-lo', () => {

            dataForm.ContactPhone = true

            dataForm.phone = '11994112466'
            
            checkForm.success = true

        })

        it('Definir Contato por telefone, mas não informá-lo', () => {

            dataForm.ContactPhone = true
            
            checkForm.success = false

        })


    })

    context('Testes Usabilidade', () => {

        it('Não digitar nenhuma informação', () => {

            dataForm.firstName = ''
            dataForm.lastName = ''
            dataForm.email = ''
            dataForm.memo = ''

            checkForm.success = false

        })

        it('Forçar erro na digitaçao do e-mail', () => {

            dataForm.email = 'bartie.devops$outlook.com'

            checkForm.success = false

        })
        
        it('Forçar entrada de caracteres no campo telefone', () => {

            dataForm.phone = 'ABCDEFGHI'

            checkForm.success = true

            checkForm.IsEmptyPhone = true

        })

    })  
    
    afterEach(() => {

        cy.PageCustomer_FillForm(dataForm, maskForm, checkForm)

    })

})



