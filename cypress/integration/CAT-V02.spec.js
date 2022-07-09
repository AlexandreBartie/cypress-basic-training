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

    maskForm.linkPrivacyPolicy = '#privacy a'

    maskForm.msgSuccess = '.success'
    maskForm.msgError = '.error'

    maskForm.visitPage = '#white-background'

    // Input Mapping
    
    inputForm.contactEmail = false
    inputForm.contactPhone = false

    inputForm.firstName = 'Alexandre'
    inputForm.lastName = 'Bartie'
    inputForm.email = '' //'bartie.devops@outlook.com'
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

    checkForm.IsUploadFile = false
    checkForm.IsEmptyPhone = false

    checkForm.IsPrivacyPolicy = false

    checkForm.FadeMessage = 3

}

Cypress.Commands.add('PageCustomer_FillForm', (IsSucess) => {

    cy.SetClock();

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

    if (IsSucess)
        cy.Assert_FindTextFade(checkForm.FadeMessage, outputForm.msgSuccess, maskForm.success)
    else
        cy.Assert_FindTextFade(checkForm.FadeMessage, outputForm.msgError, maskForm.error)

    if (checkForm.IsPrivacyPolicy)
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

            FillForm()

        })

        it('Cadastramento incluindo produto (by Value)', () => {

            inputForm.product = 'YouTube'
          
            FillForm()

        })

        it('Cadastramento incluindo produto (By Index)', () => {

            inputForm.product = 2
          
            FillForm()

        })

        it('Cadastramento modificando Tipo Atendimento', () => {

            inputForm.support = 'elogio'
          
            FillForm()

        })

        it('Definir Contato com Atendimento por E-Mail', () => {

            inputForm.contactEmail = true

            inputForm.email = 'bartie.devops@outlook.com'
            
            FillForm()

        })

        it('Definir Contato com Atendimento por Phone', () => {

            inputForm.contactPhone = true

            inputForm.phone = '11994112466'
            
            FillForm()

        })

        it('Definir Contato com ambos Atendimento', () => {

            inputForm.contactEmail = true
            inputForm.contactPhone = true

            inputForm.email = 'bartie.devops@outlook.com'
            inputForm.phone = '11994112466'
            
            FillForm()

        })

        it('Definir Contato subindo um Arquivo.', () => {

            inputForm.selectedFile_Mode = 'Upload'
            
            FillForm()

        })

        it('Definir Contato arrastando um Arquivo.', () => {

            inputForm.selectedFile_Mode = 'DragDrop'

            FillForm()

        })

        it('Definir Contato e abrindo link na sequencia', () => {

                checkForm.linkPrivacyPolicy = true

                FillForm()

            })

    })

    context('Testes Usabilidade', () => {

        it('Não digitar nenhuma informação', () => {

            inputForm.firstName = ''
            inputForm.lastName = ''
            inputForm.memo = ''

            FillFormError()

        })

        it('Não informar E-Mail quando o tipo de atendimento exigí-lo sua entrada.', () => {

            inputForm.contactEmail = true
            
            FillFormError('E-Mail é obrigatório nesse Atendimento!', '.error-email-null')

        })

        it('Não informar Phone quando o tipo de atendimento exigí-lo sua entrada.', () => {

            inputForm.contactPhone = true
            
            FillFormError('Phone é obrigatório nesse Atendimento!', '.error-phone-null')

        })


        it('Forçar erro na digitaçao do e-mail', () => {

            inputForm.email = 'bartie.devops$outlook.com'

            FillFormError('E-Mail digitado é inválido!', '.error-email-invalid')

        })
        
        it('Forçar entrada de caracteres no campo telefone', () => {

            inputForm.phone = 'ABCDEFGHI'

            checkForm.IsEmptyPhone = true

            FillForm()

        })

    }) 
    
})

function FillForm() {

    FillFormAction(true)

}

function FillFormError(msgError, maskError) {
    
    if (HasArg(msgError))
        outputForm.msgError = msgError

    if (HasArg(maskError))
        maskForm.error = maskError

    FillFormAction(false)

}

function FillFormAction(IsSucess) {

    checkForm.IsSuccess = IsSucess

    checkForm.IsUploadFile = (inputForm.selectedFile_Mode != '')

    cy.PageCustomer_FillForm(checkForm.IsSuccess)

}

function Debugging() {

    cy.Link(maskForm.linkPrivacyPolicy)

    cy.Assert_FindText(outputForm.visitPageBottom, maskForm.visitPageBottom)

}

function HasArg(arg) {

    return (typeof arg !== 'undefined')

}

