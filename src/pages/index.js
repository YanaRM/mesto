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
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_profession');

function createCard(item) {
  const card = new Card(item, '#place-card', handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

const initialCardsRender = new Section({
  items: initialCards,
  renderer: (data) => {
    const cardElement = createCard(data);
    initialCardsRender.addItem(cardElement);
    }
  },
  '.places');

const userInfo = new UserInfo({
  profileNameSelector: '.profile__title',
  profileJobSelector: '.profile__subtitle'
});

const popupEditProfile = new PopupWithForm({
  selector: '.popup_type_edit-profile',
  handleSubmitForm: handleProfileSubmitForm
});

function handleProfileSubmitForm(data) {
  userInfo.setUserInfo(data.name, data.job);
};

const popupAddCards = new PopupWithForm({
  selector: '.popup_type_add-cards',
  handleSubmitForm: handleAddCardsSubmitForm
});

function handleAddCardsSubmitForm(data) {
  const cardElement = createCard({
    link: data.link,
    title: data.title,
  })
  initialCardsRender.addItem(cardElement);
};

popupEditProfile.setEventListeners();
popupAddCards.setEventListeners();

initialCardsRender.renderItems();

const popupPhoto = new PopupWithImage('.popup_type_photo');
popupPhoto.setEventListeners();

function handleCardClick(title, link) {
  popupPhoto.open(title, link);
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