const profileEditButton = document.querySelector('.profile__edit-button');
const addCardsButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const popupCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_profession');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCards = document.querySelector('.popup_type_add-cards');
const placeInput = popupAddCards.querySelector('.popup__input_type_place');
const imageLinkInput = popupAddCards.querySelector('.popup__input_type_image-link');
const popupSubmitButton = document.querySelector('.popup__submit-button');
const placesSection = document.querySelector('.places');

const popupPhoto = document.querySelector('.popup_type_photo');
const popupPhotoImg = popupPhoto.querySelector('.popup__photo');
const popupPhotoCaption = popupPhoto.querySelector('.popup__photo-caption');

const cardTemplate = document.querySelector('#place-card').content;
const card = cardTemplate.querySelector('.place').cloneNode(true);

function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = job.textContent;

  imageLinkInput.value = '';
  placeInput.value = '';

  popupEditProfile.classList.add('popup_opened');
  popupAddCards.classList.add('popup_opened');
  popupPhoto.classList.add('popup_opened');
};

profileEditButton.addEventListener('click', () => {popupEditProfile.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = job.textContent;});

addCardsButton.addEventListener('click', () => {popupAddCards.classList.add('popup_opened');
  imageLinkInput.value = '';
  placeInput.value = '';});

function сlosePopup() {
  popupEditProfile.classList.remove('popup_opened');

  popupAddCards.classList.remove('popup_opened');

  popupPhoto.classList.remove('popup_opened');
};

popupCloseButton.addEventListener('click', сlosePopup);
popupAddCards.querySelector('.popup__close-button').addEventListener('click', сlosePopup);
popupPhoto.querySelector('.popup__close-button').addEventListener('click', сlosePopup);

function editProfile (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  job.textContent = jobInput.value;

  сlosePopup();
};

popupEditProfile.querySelector('.popup__submit-button').addEventListener('click', editProfile);

function renderInitialCards() {
  initialCards.forEach((item) => {
    const card = cardTemplate.querySelector('.place').cloneNode(true);

    card.querySelector('.place__image').src = item.link;
    card.querySelector('.place__image').alt = item.name;
    card.querySelector('.place__title').textContent = item.name;

    placesSection.append(card);

    card.querySelector('.place__like-button').addEventListener('click', function (evt) {
      evt.target.classList.toggle('place__like-button_active');});

    card.querySelector('.place__remove-button').addEventListener('click', removeCard);

    function openPopupPhoto() {
      popupPhoto.classList.add('popup_opened');
      popupPhotoImg.src = card.querySelector('.place__image').src;
      popupPhotoImg.alt = card.querySelector('.place__image').alt;
      popupPhotoCaption.textContent = card.querySelector('.place__image').alt;
    };

    card.querySelector('.place__image').addEventListener('click', openPopupPhoto);
  });
};

renderInitialCards();

function addNewCard (evt) {
  evt.preventDefault();

  card.querySelector('.place__image').src = imageLinkInput.value;
  card.querySelector('.place__image').alt = placeInput.value;
  card.querySelector('.place__title').textContent = placeInput.value;

  placesSection.prepend(card);

  сlosePopup();
};

popupAddCards.querySelector('.popup__submit-button').addEventListener('click', addNewCard);

function createCard() {
  const card = cardTemplate.querySelector('.place').cloneNode(true);

  placesSection.prepend(card);

  return card;
};

card.querySelector('.place__like-button').addEventListener('click', function (evt) {
  evt.target.classList.toggle('place__like-button_active');});

function openPopupPhoto() {
  popupPhoto.classList.add('popup_opened');
  popupPhotoImg.src = card.querySelector('.place__image').src;
  popupPhotoImg.alt = card.querySelector('.place__image').alt;
  popupPhotoCaption.textContent = card.querySelector('.place__image').alt;
};

card.querySelector('.place__image').addEventListener('click', openPopupPhoto);

function removeCard(evt) {
  evt.target.closest('.place').remove();
};

card.querySelector('.place__remove-button').addEventListener('click', removeCard);