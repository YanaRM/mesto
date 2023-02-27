const showInputError = (formElements, inputElement, errorMessage) => {
  const errorElement = formElements.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElements, inputElement) => {
  const errorElement = formElements.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
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
  const inputList = Array.from(formElements.querySelectorAll(inputSelector));
  const buttonElement = formElements.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElements, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElements) => {
    formElements.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
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
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };
};