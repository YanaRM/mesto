import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupPhoto = this._popup.querySelector('.popup__photo');
    this._title = document.querySelector('.place__title').textContent;
    this._link = document.querySelector('.place__image').src;
    this._photoCaption = this._popup.querySelector('.popup__photo-caption');
  }

  open() {
    this._popupPhoto.src = this._link;
    this._popupPhoto.alt = this._title;
    this._photoCaption.textContent = this._title;

    super.open();
  }
}