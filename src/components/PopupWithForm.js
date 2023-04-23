import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({selector, handleSubmitForm}) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._element = document.querySelector(selector);
  };

  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.popup__input');

    this._formValues = {};
    this._inputList.forEach((input) => this._formValues[input.name] = input.value);

    return this._formValues;
  };

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      
      this.close();
    });
  };

  close() {
    super.close();

    this._element.reset();
  };
};