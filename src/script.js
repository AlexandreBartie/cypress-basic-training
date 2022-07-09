isEmailRequired = false
isPhoneRequired = false

const emailLabel = document.querySelector('.email-label-span')
const emailField = document.getElementById('email')

document.querySelector('#email-checkbox')
  .addEventListener('change', function() {
    if (this.checked) {
      emailLabel.style.display = 'inline'
      emailField.required = !isEmailRequired
      isEmailRequired = !isEmailRequired
    } else {
      emailLabel.style.display = 'none'
      emailField.required = !isEmailRequired
      isEmailRequired = !isEmailRequired
    }
  })

const phoneLabel = document.querySelector('.phone-label-span')
const phoneField = document.getElementById('phone')

document.querySelector('#phone-checkbox')
  .addEventListener('change', function() {
    if (this.checked) {
      phoneLabel.style.display = 'inline'
      phoneField.required = !isPhoneRequired
      isPhoneRequired = !isPhoneRequired
    } else {
      phoneLabel.style.display = 'none'
      phoneField.required = !isPhoneRequired
      isPhoneRequired = !isPhoneRequired
    }
  })

  document.querySelector('button[type="submit"]')
  .addEventListener('click', function(event) {
    event.preventDefault()

    const firstNameField = document.getElementById('firstName')
    const lastNameField = document.getElementById('lastName')
    const emailField = document.getElementById('email')
    const phoneField = document.getElementById('phone')
    const textareaField = document.getElementById('open-text-area')
    const productField = document.getElementById('product')
    const helpRadio = document.querySelector('input[value="ajuda"]')
    const emailCheckbox = document.getElementById('email-checkbox')
    const phoneCheckbox = document.getElementById('phone-checkbox')
    const fileField = document.querySelector('input[type="file"]')
    const successMessage = document.querySelector('.success')

    if (!IsValidData(firstNameField, lastNameField, textareaField, emailField, phoneField))
      return

    firstNameField.value = ''
    lastNameField.value = ''
    emailField.value = ''
    phoneField.value = ''
    textareaField.value = ''
    productField.selectedIndex = 0
    helpRadio.checked = true
    emailCheckbox.checked = false
    phoneCheckbox.checked = false
    fileField.value = ''
    
    emailLabel.style.display = 'none'
    phoneLabel.style.display = 'none'

    successMessage.style.display = 'block'

    isEmailRequired = false
    isPhoneRequired = false

    HideMessage(successMessage)

  }, false)

function IsValidData(firstNameField, lastNameField, textareaField, emailField, phoneField) {

  if (!IsOkRequiredData(firstNameField, lastNameField, textareaField))
    return ShowError('.error')
  
  if (!IsOkRequiredEmail(emailField))
    return ShowError('.error-email-null')
  
  if (!IsOkRequiredPhone(phoneField))
    return ShowError('.error-phone-null')
  
  if (!IsOkValidEmail(emailField))
    return ShowError('.error-email-invalid')
    
  return true
  
}

function IsOkRequiredData(firstNameField, lastNameField, textareaField) {
  return firstNameField.value && lastNameField.value && textareaField.value
}
function IsOkRequiredEmail(emailField) {
  return !isEmailRequired || emailField.value
}

function IsOkRequiredPhone(phoneField) {
  return !isPhoneRequired || phoneField.value
}

function IsOkValidEmail(emailField) {
  return !emailField.value || emailField.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
}

function ShowError(element) {
  const errorMessage = document.querySelector(element)
  errorMessage.style.display = 'block'
  HideMessage(errorMessage)
  return true
}

function HideMessage(element) {
  scroll(0,0)
  setTimeout(function() {
    element.style.display = 'none'
  }, 3000)
}