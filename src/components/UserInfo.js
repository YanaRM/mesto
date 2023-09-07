export default class UserInfo {
  constructor({ profileNameSelector, profileJobSelector, profilePhotoSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
    this._profilePhoto = document.querySelector(profilePhotoSelector)
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

  setProfilePhoto(data) {
    this._profilePhoto.src = data.avatar,
    this._profilePhoto.alt = data.avatar
  }
}