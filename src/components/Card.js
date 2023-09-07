export default class Card {
  constructor(data, userId, templateSelector, handleCardClick, {handleDeleteClick, handleLike}) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._dataLikes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._id = data._id;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLike = handleLike
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
    this._placeImage.alt = this._name;
    this._element.querySelector('.place__title').textContent = this._name;
    this._hideRemoveButton();
    this.setLike(this._dataLikes);
    this._checkLike();

    return this._element;
  };

  isLiked() {
    return this._dataLikes.find(user => user._id === this._userId)
  }

  _checkLike() {
    if (this.isLiked()) {
      this.putLike()
    } else {
      this.removeLike()
    }
  }

  setLike(data) {
    this._dataLikes = data;
    this._element.querySelector('.place__like-counter').textContent = this._dataLikes.length;
  }

  putLike() {
    this._element.querySelector('.place__like-button').classList.add('place__like-button_active')
  }

  removeLike() {
    this._element.querySelector('.place__like-button').classList.remove('place__like-button_active')
  }

  _hideRemoveButton() {
    if (this._ownerId !== this._userId) {
      this._element.querySelector('.place__remove-button').remove()
    }
  }

  removeCard() {
    this._element.remove();
  };

  _setEventListeners = () => {
    this._element.querySelector('.place__like-button').addEventListener('click', this._handleLike);
    this._placeImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    this._element.querySelector('.place__remove-button').addEventListener('click', () => {
      this._handleDeleteClick()
    });
  };
};