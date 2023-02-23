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

const popupAddCardsCloseButton = popupAddCards.querySelector('.popup__close-button');
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__close-button');

const cardTemplate = document.querySelector('#place-card').content;

function openPopup(item) {
  item.classList.add('popup_opened');
};

profileEditButton.addEventListener('click', () => {openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = job.textContent;});
addCardsButton.addEventListener('click', () => openPopup(popupAddCards));

function closePopup(item) {
  item.classList.remove('popup_opened');
};

popupCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
popupAddCardsCloseButton.addEventListener('click', () => closePopup(popupAddCards));
popupPhotoCloseButton.addEventListener('click', () => closePopup(popupPhoto));

function editProfile (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  job.textContent = jobInput.value;

  closePopup(popupEditProfile);
};

popupEditProfile.addEventListener('submit', editProfile);

function renderInitialCards() {
  initialCards.forEach((item) => {
    const card = createCard(item);

    placesSection.append(card);
  });
};

renderInitialCards();

function addNewCard (evt) {
  evt.preventDefault();

  const card = createCard({name: placeInput.value,
    link: imageLinkInput.value,
    alt: placeInput.value});

  placesSection.prepend(card);

  evt.target.reset();

  closePopup(popupAddCards);
};

popupAddCards.addEventListener('submit', addNewCard);

function createCard(item) {
  const card = cardTemplate.querySelector('.place').cloneNode(true);

  const placeImage = card.querySelector('.place__image');

  placeImage.src = item.link;
  placeImage.alt = item.alt;
  card.querySelector('.place__title').textContent = item.name;

  function openPopupPhoto(item) {
    openPopup(popupPhoto);
  
    popupPhotoImg.src = item.link;
    popupPhotoImg.alt = item.alt;
    popupPhotoCaption.textContent = item.name;
  };

  card.querySelector('.place__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like-button_active');});
  placeImage.addEventListener('click', () => openPopupPhoto(item));
  card.querySelector('.place__remove-button').addEventListener('click', removeCard);

  return card;
};

function removeCard(evt) {
  evt.target.closest('.place').remove();
};