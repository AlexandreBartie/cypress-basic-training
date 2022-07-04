/// <reference types="Cypress" />

const sysForm = {}
const maskForm = { }
const inputForm = { }
const outputForm = { }
const checkForm = { }

function SetupMapping() {

    sysForm.url = './src/index.html'
    sysForm.title = 'Central de Atendimento ao Cliente TAT'

    // Page Mapping

    maskForm.firstName = '#firstName'
    maskForm.lastName = '#lastName'
    maskForm.email = '#email'
    maskForm.phone = '#phone'

    maskForm.product = '#product'
    maskForm.support = ':radio'

    maskForm.contactEmail = '#email-checkbox'
    maskForm.contactPhone = '#phone-checkbox'

    maskForm.memo = '#open-text-area'

    maskForm.selectedFile = 'input[type="file"]'

    maskForm.submit = ':submit'

    maskForm.success = '.success'
    maskForm.error = '.error'

    maskForm.linkPrivacyPolicy = '#privacy a'

    maskForm.visitPage = '#white-background'

    // Input Mapping
    
    inputForm.contactEmail = false
    inputForm.contactPhone = false

    inputForm.firstName = 'Alexandre'
    inputForm.lastName = 'Bartie'
    inputForm.email = 'bartie.devops@outlook.com'
    inputForm.phone = ''
    inputForm.product = ''
    inputForm.support = ''

    inputForm.selectedFile_Path = 'cypress/fixtures/'
    inputForm.selectedFile_Name = 'example.json'

    inputForm.selectedFile_Mode = ''

    inputForm.memo = 'Agradecido!'

    // Output Mapping

    outputForm.msgSuccess = 'Mensagem enviada com sucesso.'
    outputForm.msgError = 'Valide os campos obrigatórios!'

    outputForm.visitPageBottom = 'Talking About Testing'

    // Check Mapping

    checkForm.uploadFile = false
    checkForm.emptyPhone = false

    checkForm.success = false

    checkForm.linkPrivacyPolicy = false

}

Cypress.Commands.add('PageCustomer_FillForm', () => {

    cy.Text(inputForm.firstName, maskForm.firstName)
    cy.Text(inputForm.lastName, maskForm.lastName)
    cy.Text(inputForm.email, maskForm.email)
    cy.Text(inputForm.phone, maskForm.phone)

    cy.Combo(inputForm.product, maskForm.product)

    cy.Radio(inputForm.support, maskForm.support)

    cy.Option(inputForm.contactEmail, maskForm.contactEmail)
    cy.Option(inputForm.contactPhone, maskForm.contactPhone)

    cy.Text(inputForm.memo, maskForm.memo)

    if (checkForm.emptyPhone)
        cy.Assert_ElementIsEmpty(maskForm.phone)

    if (checkForm.uploadFile)
        cy.ActionFile(inputForm.selectedFile_Mode, inputForm.selectedFile_Path, inputForm.selectedFile_Name, maskForm.selectedFile)

    cy.Click(maskForm.submit) 

    if (checkForm.success)
        cy.Assert_FindText(outputForm.msgSuccess, maskForm.success)
    else
        cy.Assert_FindText(outputForm.msgError, maskForm.error)

    if (checkForm.linkPrivacyPolicy)
    {
        cy.Link(maskForm.linkPrivacyPolicy)

        cy.Assert_FindText(outputForm.visitPageBottom, maskForm.visitPageBottom)

    }

})

describe('V02: Central de Atendimento ao Cliente', () => {

    beforeEach(() => {

        SetupMapping()

        cy.Go(sysForm.url)

    })
    
    context('Testes Negócio', () => {

        it.only('Cadastramento com dados mínimos', () => {

            checkForm.success = true

        })

        it.only('Cadastramento incluindo produto (by Value)', () => {

            inputForm.product = 'YouTube'
          
            checkForm.success = true

        })

        it.only('Cadastramento incluindo produto (By Index)', () => {

            inputForm.product = 2
          
            checkForm.success = true

        })

        it.only('Cadastramento modificando Tipo Atendimento', () => {

            inputForm.support = 'elogio'
          
            checkForm.success = true

        })

        it.only('Definir Contato por telefone e informá-lo', () => {

            inputForm.contactPhone = true

            inputForm.phone = '11994112466'
            
            checkForm.success = true

        })

        it.only('Forçar entrada de caracteres no campo telefone', () => {

            inputForm.phone = 'ABCDEFGHI'
            
            checkForm.success = false

        })

        it.only('Definir Contato por telefone, mas não informá-lo', () => {

            inputForm.contactPhone = true
            
            checkForm.success = false

        })


        

        it.only('Definir ambos os Contatos', () => {

            inputForm.contactEmail = true
            inputForm.contactPhone = true

            inputForm.phone = '11994112466'
            
            checkForm.success = true

        })

        it.only('Definir Contato subindo um Arquivo.', () => {

            inputForm.selectedFile_Mode = 'Upload'
            
            checkForm.success = true

        })

        it.only('Definir Contato arrastando um Arquivo.', () => {

            inputForm.selectedFile_Mode = 'DragDrop'

            checkForm.success = true

        })

        it.only('Definir Contato e abrindo link na sequencia', () => {

                checkForm.linkPrivacyPolicy = true

                checkForm.success = true

            })

    })

    context('Testes Usabilidade', () => {

        it.only('Não digitar nenhuma informação', () => {

            inputForm.firstName = ''
            inputForm.lastName = ''
            inputForm.email = ''
            inputForm.memo = ''

            checkForm.success = false

        })

        it.only('Forçar erro na digitaçao do e-mail', () => {

            inputForm.email = 'bartie.devops$outlook.com'

            checkForm.success = false

        })
        
        it.only('Forçar entrada de caracteres no campo telefone', () => {

            inputForm.phone = 'ABCDEFGHI'

            checkForm.success = true

            checkForm.IsEmptyPhone = true

        })

    })  
    
    afterEach(() => {
       
        if (true)
        {
            checkForm.uploadFile = (inputForm.selectedFile_Mode != '')

            cy.PageCustomer_FillForm(inputForm, maskForm, checkForm)
        }
        else
            Debugging()

    })

})

function Debugging() {

    cy.Link(maskForm.linkPrivacyPolicy)

    cy.Assert_FindText(outputForm.visitPageBottom, maskForm.visitPageBottom)

}



