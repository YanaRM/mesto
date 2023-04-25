import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupPhoto = this._popup.querySelector('.popup__photo');
    /*this._title = document.querySelector('.place__title').textContent;
    this._link = document.querySelector('.place__image').src;*/
    this._photoCaption = this._popup.querySelector('.popup__photo-caption');
  }

  open(title, link) {
    this._popupPhoto.src = link;
    this._popupPhoto.alt = title;
    this._photoCaption.textContent = title;

    super.open();
  }
}