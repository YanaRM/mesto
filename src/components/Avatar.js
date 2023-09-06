export default class Avatar {
  constructor(profilePhotoSelector) {
    this._profilePhoto = document.querySelector(profilePhotoSelector)
  }

  setProfilePhoto(avatar) {
    this._profilePhoto.src = avatar.avatar,
    this._profilePhoto.alt = avatar.avatar
  }
}