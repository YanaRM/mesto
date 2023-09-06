import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(selector, {apiConfirm}) {
    super(selector);
    this._element = this._popup.querySelector('.popup__form');
    this._apiConfirm = apiConfirm;
    this._preventEventDefault = this._preventEventDefault.bind(this)
  }

  handleSubmit(data) {
    this._apiConfirm = data
  }

  _preventEventDefault(evt) {
    evt.preventDefault();
    this._apiConfirm()
  }

  open() {
    super.open();
    this._element.addEventListener('submit', this._preventEventDefault)
  }
  
  close() {
    super.close();
    this._element.removeEventListener('submit', this._preventEventDefault)
  }

  /*setEventListeners() {
    super.setEventListeners();

    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._removeCard();
    
      this.close();
    });
  }*/
}