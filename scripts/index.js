import Card  from './Card.js';
import { initialCards } from './constants.js';
import { config, FormValidator } from './FormValidator.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardsButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const popupCloseButton = document.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_profession');
const allPopups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCards = document.querySelector('.popup_type_add-cards');
const placeInput = popupAddCards.querySelector('.popup__input_type_place');
const imageLinkInput = popupAddCards.querySelector('.popup__input_type_image-link');
const popupSubmitButton = document.querySelector('.popup__submit-button');
const placesSection = document.querySelector('.places');
const placeImage = document.querySelector('.place__image');

const popupPhoto = document.querySelector('.popup_type_photo');
const popupPhotoImg = popupPhoto.querySelector('.popup__photo');
const popupPhotoCaption = popupPhoto.querySelector('.popup__photo-caption');

const popupAddCardsCloseButton = popupAddCards.querySelector('.popup__close-button');
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__close-button');

function openPopup(item) {
  item.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupOnEsc);
};

function openPopupEditProfile() {
  openPopup(popupEditProfile);

  nameInput.value = profileName.textContent;
  jobInput.value = job.textContent;

  /*resetForm(config, popupEditProfile.querySelector('.popup__form'),
  popupEditProfile.querySelector('.popup__input'));*/
};

function openPopupAddCards() {
  openPopup(popupAddCards);

  placeInput.value = '';
  imageLinkInput.value = '';
  
  /*disableSubmitButton(config, popupAddCards.querySelector('.popup__submit-button'));

  resetForm(config, popupAddCards.querySelector('.popup__form'),
  popupAddCards.querySelector('.popup__input'));*/
};

function closePopup(item) {
  item.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupOnEsc);
};

function editProfile (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  job.textContent = jobInput.value;

  closePopup(popupEditProfile);
};

function closePopupOnEsc (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
};

function openPopupPhoto(title, link) {
  openPopup(popupPhoto);
  
  popupPhotoImg.src = link;
  popupPhotoImg.alt = title;
  popupPhotoCaption.textContent = title;
};

allPopups.forEach((item) => {
  item.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(item);
    };
  });
});

function createCard(data) {
  const card = new Card(data, '#place-card', openPopupPhoto);

  return card.generateCard();
};

function renderInitialCards() {
  initialCards.forEach((item) => {
    const card = createCard(item);
    placesSection.append(card);
  });
};

renderInitialCards();

function addNewCard (evt) {
  evt.preventDefault();

  const card = createCard({title: placeInput.value,
    link: imageLinkInput.value,
    alt: placeInput.value});

  placesSection.prepend(card);

  evt.target.reset();

  closePopup(popupAddCards);
};

const editProfileValidation = new FormValidator(config, popupEditProfile.querySelector('.popup__form'));
const addCardsValidation = new FormValidator(config, popupAddCards.querySelector('.popup__form'));
editProfileValidation.enableValidation();
addCardsValidation.enableValidation();

profileEditButton.addEventListener('click', openPopupEditProfile);
addCardsButton.addEventListener('click', openPopupAddCards);
/*placeImage.addEventListener('click', openPopupPhoto);*/

popupCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
popupAddCardsCloseButton.addEventListener('click', () => closePopup(popupAddCards));
popupPhotoCloseButton.addEventListener('click', () => closePopup(popupPhoto));

popupEditProfile.addEventListener('submit', editProfile);
popupAddCards.addEventListener('submit', addNewCard);