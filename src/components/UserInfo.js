export default class UserInfo {
  constructor({ profileNameSelector, profileJobSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
  }

  getUserInfo() {
    const userInfoValues = {
      name: this._profileName.textContent,
      about: this._profileJob.textContent
    };

    return userInfoValues;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.about;
  }
}