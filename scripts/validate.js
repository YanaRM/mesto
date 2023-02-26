const showInputError = (formElements, inputElement, errorMessage) => {
  const errorElement = formElements.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElements, inputElement) => {
  const errorElement = formElements.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElements, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElements, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElements, inputElement);
  }
};

const setEventListeners = (formElements) => {
  const inputList = Array.from(formElements.querySelectorAll('.popup__input'));
  const buttonElement = formElements.querySelector('.popup__submit-button');
  toggleButtonState(inputList, buttonElement);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElements, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElements) => {
    setEventListeners(formElements);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: '.popup__submit-button_disabled',
  inputErrorClass: '.popup__input_type_error',
  errorClass: '.popup__input-error_active'
}
);

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit-button_disabled');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__submit-button_disabled');
    buttonElement.removeAttribute('disabled');
  };
};