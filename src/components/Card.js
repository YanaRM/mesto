export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._title = data.title;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.place')
    .cloneNode(true);

    return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();

    this._placeImage = this._element.querySelector('.place__image');
    this._setEventListeners();

    this._placeImage.src = this._link;
    this._placeImage.alt = this._title;
    this._element.querySelector('.place__title').textContent = this._title;

    return this._element;
  };

  _toggleLike(evt) {
    evt.target.classList.toggle('place__like-button_active');
  };

  _removeCard() {
    this._element.remove();
  };

  _setEventListeners = () => {
    this._element.querySelector('.place__like-button').addEventListener('click', this._toggleLike);
    this._placeImage.addEventListener('click', () => this._handleCardClick(this._title, this._link));
    this._element.querySelector('.place__remove-button').addEventListener('click', () => this._removeCard());
  };
};