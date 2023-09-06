export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-74/cards', {
      headers: {
        authorization: '5751a739-0b94-4196-841e-de7c785ef02a'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getUserData() {
    return fetch('https://nomoreparties.co/v1/cohort-74/users/me', {
      method: 'GET',
      headers: {
        authorization: '5751a739-0b94-4196-841e-de7c785ef02a',
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  editProfile(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-74/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '5751a739-0b94-4196-841e-de7c785ef02a',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  addNewCard(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-74/cards', {
      method: 'POST',
      headers: {
        authorization: '5751a739-0b94-4196-841e-de7c785ef02a',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  deleteCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-74/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: '5751a739-0b94-4196-841e-de7c785ef02a',
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  putLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-74/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: '5751a739-0b94-4196-841e-de7c785ef02a',
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  removeLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-74/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: '5751a739-0b94-4196-841e-de7c785ef02a',
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  editAvatar(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-74/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: '5751a739-0b94-4196-841e-de7c785ef02a',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
}