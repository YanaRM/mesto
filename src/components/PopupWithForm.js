import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({selector, handleSubmitForm}) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._element = this._popup.querySelector('.popup__form');
    this._inputList = this._element.querySelectorAll('.popup__input');
  };

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => this._formValues[input.name] = input.value);

    return this._formValues;
  };

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.value];
    })
  }

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