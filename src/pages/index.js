import './index.css';

import Card  from '../components/Card.js';
import { initialCards } from '../utils/constants.js';
import { config, FormValidator } from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardsButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_profession');

const placeInput = document.querySelector('.popup__input_type_place');
const imageLinkInput = document.querySelector('.popup__input_type_image-link');

const initialCardsRender = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, '#place-card', handleCardClick);
    const cardElement = card.generateCard();
    initialCardsRender.addItem(cardElement)
    }
  },
  '.places');

const userInfo = new UserInfo({
  profileNameSelector: '.profile__title',
  profileJobSelector: '.profile__subtitle'
});

const popupEditProfile = new PopupWithForm({
  selector: '.popup_type_edit-profile',
  handleSubmitForm: editProfileSubmitForm
});

function editProfileSubmitForm() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
};

const popupAddCards = new PopupWithForm({
  selector: '.popup_type_add-cards',
  handleSubmitForm: addCardsSubmitForm
});

function addCardsSubmitForm() {
  const card = new Card({
    title: placeInput.value,
    link: imageLinkInput.value,
    alt: placeInput.value},
    '#place-card',
    handleCardClick);
  const cardElement = card.generateCard();
  initialCardsRender.addPrependItem(cardElement)
};

popupEditProfile.setEventListeners();
popupAddCards.setEventListeners();

initialCardsRender.renderItems();

const popupPhoto = new PopupWithImage('.popup_type_photo');
popupPhoto.setEventListeners();

/*function popupEditProfileSubmitForm(name, job) {
  userInfo.setUserInfo(name, job);
  popupEditProfile.close();
}*/

function handleCardClick() {
  popupPhoto.open();
};

const editProfileValidation = new FormValidator(config, document.querySelector('.popup_type_edit-profile')
  .querySelector('.popup__form'));
const addCardsValidation = new FormValidator(config, document.querySelector('.popup_type_add-cards')
  .querySelector('.popup__form'));
editProfileValidation.enableValidation();
addCardsValidation.enableValidation();

profileEditButton.addEventListener('click', () => {
  const userInfoValues = userInfo.getUserInfo();
  nameInput.value = userInfoValues.name;
  jobInput.value = userInfoValues.job;
  popupEditProfile.open();
  editProfileValidation.resetValidation();
});

addCardsButton.addEventListener('click', () => {
  popupAddCards.open();
  addCardsValidation.resetValidation();
});