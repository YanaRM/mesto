const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const formElement = document.querySelector(config.formSelector);
const buttonElement = formElement.querySelector(config.submitButtonSelector);

const showInputError = (config, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (config, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
};

const checkInputValidity = (config, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(config, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(config, formElement, inputElement);
  }
};

const setEventListeners = (config, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  /*const buttonElement = formElement.querySelector(config.submitButtonSelector);*/
  toggleButtonState(config, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(config, formElement, inputElement);
      toggleButtonState(config, inputList, buttonElement);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(config, formElement);
  });
};

enableValidation(config);

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function disableSubmitButton(config, buttonElement) {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
};

function enableSubmitButton(config, buttonElement) {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

function toggleButtonState(config, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(config, buttonElement);
  } else {
    enableSubmitButton(config, buttonElement);
  };
};