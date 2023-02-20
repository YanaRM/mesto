const profileEditButton = document.querySelector('.profile__edit-button');
const addCardsButton = document.querySelector('.profile__add-button');
let profileName = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');
const formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_profession');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCards = document.querySelector('.popup_type_add-cards');
let placeInput = popupAddCards.querySelector('.popup__input_type_place');
let imageLinkInput = popupAddCards.querySelector('.popup__input_type_image-link');
let popupSubmitButton = popup.querySelector('.popup__submit-button');
const placesSection = document.querySelector('.places');

let popupPhoto = document.querySelector('.popup_type_photo');
let popupPhotoCaption = popupPhoto.querySelector('.popup__photo-caption');

let cardTemplate = document.querySelector('#place-card').content;
let card = cardTemplate.querySelector('.place').cloneNode(true);


const initialCards = [
  {
    name: 'Карачаевск',
    link: 'https://images.unsplash.com/photo-1538819285938-6a9b4eda500b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80'
  },
  {
    name: 'Эльбрус',
    link: 'https://images.unsplash.com/photo-1638989420853-a6437f7a0d2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80'
  },
  {
    name: 'Домбай',
    link: 'https://www.eurotraveler.ru/wp-content/uploads/2021/09/dombay_november-min.jpg'
  },
  {
    name: 'Болгар, Тататрстан',
    link: 'https://thumb.tildacdn.com/tild3433-6535-4335-a465-653638636565/-/resize/960x/-/format/webp/shutterstock_1999312.jpg'
  },
  {
    name: 'Кижи',
    link: 'https://pibig.info/uploads/posts/2022-09/1663810191_20-pibig-info-p-ostrov-kizhi-dostoprimechatelnosti-priroda-22.jpg'
  },
  {
    name: 'Шиханы, Башкортостан',
    link: 'https://n1s2.hsmedia.ru/4c/44/45/4c4445f23ac739baf20d41a87ffcd612/5000x2298_0xac120003_4753368411671451447.jpeg'
  }
];

function popupOpen() {
  nameInput.value = profileName.textContent;
  jobInput.value = job.textContent;

  popupEditProfile.classList.add('popup_opened');
  popupAddCards.classList.add('popup_opened');
  popupPhoto.classList.add('popup_opened');
};

profileEditButton.addEventListener('click', () => {popupEditProfile.classList.add('popup_opened');
nameInput.value = profileName.textContent;
jobInput.value = job.textContent;});

addCardsButton.addEventListener('click', () => {popupAddCards.classList.add('popup_opened')});


function popupClose() {
  popupEditProfile.classList.remove('popup_opened');

  popupAddCards.classList.remove('popup_opened');

  popupPhoto.classList.remove('popup_opened');
};

popupCloseButton.addEventListener('click', popupClose);

popupAddCards.querySelector('.popup__close-button').addEventListener('click', popupClose);

popupPhoto.querySelector('.popup__close-button').addEventListener('click', popupClose);


function editProfile (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  job.textContent = jobInput.value;

  popupClose();
};

popupEditProfile.querySelector('.popup__submit-button').addEventListener('click', editProfile);


function renderCards() {
  initialCards.forEach((item) => {
    const card = cardTemplate.querySelector('.place').cloneNode(true);

    card.querySelector('.place__image').src = item.link;
    card.querySelector('.place__image').alt = item.name;
    card.querySelector('.place__title').textContent = item.name;

    placesSection.append(card);

    card.querySelector('.place__like-button').addEventListener('click', function (evt) {
      evt.target.classList.toggle('place__like-button_active');});

    card.querySelector('.place__remove-button').addEventListener('click', removeCard);

    function popupPhotoOpen() {
      popupPhoto.classList.add('popup_opened');
      popupPhoto.querySelector('.popup__photo').src = card.querySelector('.place__image').src;
      popupPhotoCaption.textContent = card.querySelector('.place__image').alt;
    };

    card.querySelector('.place__image').addEventListener('click', popupPhotoOpen);
  });
};

renderCards();


function addNewCard (evt) {
  evt.preventDefault();

  card.querySelector('.place__image').src = imageLinkInput.value;
  card.querySelector('.place__image').alt = placeInput.value;
  card.querySelector('.place__title').textContent = placeInput.value;

  placesSection.append(card);

  popupClose();
};

popupAddCards.querySelector('.popup__submit-button').addEventListener('click', addNewCard);


function createCard() {
  const card = cardTemplate.querySelector('.place').cloneNode(true);
  
  card.querySelector('.place__image').src = '';
  card.querySelector('.place__image').alt = '';
  card.querySelector('.place__title').textContent = '';

  placesSection.append(...card);
};

card.querySelector('.place__like-button').addEventListener('click', function (evt) {
  evt.target.classList.toggle('place__like-button_active');});

function popupPhotoOpen() {
  popupPhoto.classList.add('popup_opened');
  popupPhoto.querySelector('.popup__photo').src = card.querySelector('.place__image').src;
  popupPhotoCaption.textContent = card.querySelector('.place__image').alt;
};

card.querySelector('.place__image').addEventListener('click', popupPhotoOpen);


function removeCard(evt) {
  evt.target.closest('.place').remove();
};

card.querySelector('.place__remove-button').addEventListener('click', removeCard);