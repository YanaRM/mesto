export default class Card {
  constructor(data, templateSelector, openPopupPhoto) {
    this._templateSelector = templateSelector;
    this._title = data.title;
    this._link = data.link;
    this._image = data.image;
    this._openPopupPhoto = openPopupPhoto;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector('#place-card')
    .content
    .querySelector('.place')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._placeImage = this._element.querySelector('.place__image');

    this._element.querySelector('.place__image').src = this._link;
    this._element.querySelector('.place__image').alt = this._title;
    this._element.querySelector('.place__title').textContent = this._title;
    this._setEventListeners();

    return this._element;
  };

  _removeCard() {
    this._element.remove();
  };

  _setEventListeners = () => {
    this._element.querySelector('.place__like-button').addEventListener('click', (evt) => {
      evt.target.classList.toggle('place__like-button_active');});
    this._placeImage.addEventListener('click', () => this._openPopupPhoto(this._title, this._link));
    this._element.querySelector('.place__remove-button').addEventListener('click', () => this._removeCard());
  }
}