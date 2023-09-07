import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(selector, {apiConfirm}) {
    super(selector);
    this._element = this._popup.querySelector('.popup__form');
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  setHandleSubmit(data) {
    this._apiConfirm = data
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._apiConfirm()
  }

  setEventListeners() {
    super.setEventListeners();

    this._element.addEventListener('submit', this._handleSubmit)
  }
}