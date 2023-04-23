export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  };

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close(document.querySelector('.popup_opened'));
    };
  };

  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click',
      (item) => this.close(item));

    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      };
    });
  };
};