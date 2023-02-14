const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const formElement = popup.querySelector('.popup__form');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_profession');
const addCardsButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCards = document.querySelector('.popup_type_add-cards');
const placeInput = popup.querySelector('.popup__input_type_place');
const imageLinkInput = popup.querySelector('.popup__input_type_image-link');
const cardTemplate = document.querySelector('#place-card').content;
const popupSubmitButton = popup.querySelector('.popup__submit-button');
const card = cardTemplate.querySelector('.place').cloneNode(true);
const placesSection = document.querySelector('.places');
const placeImage = card.querySelector('.place__image');
const placeTitle = card.querySelector('place__title');

const initialCards = [
  {
    name: 'Карачаевск',
    link: 'https://images.unsplash.com/photo-1538819285938-6a9b4eda500b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80'
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
    name: 'Эльбрус',
    link: 'https://images.unsplash.com/photo-1638989420853-a6437f7a0d2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80'
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

  placeInput.value = placeTitle.textContent;
  imageLinkInput.value = placeImage.textContent;

  popupEditProfile.classList.add('popup_opened');
  popupAddCards.classList.add('popup_opened');
}

function popupClose() {
  popupEditProfile.classList.remove('popup_opened');
  popupAddCards.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  job.textContent = jobInput.value;

  popupClose();
}

function createCard() {
  initialCards.forEach((item) => {
    const placeLikeButton = cardTemplate.querySelector('.place__like-button');

    placeImage.src = item.link;
    placeImage.alt = item.name;
    placeTitle.textContent = item.name;

    placeLikeButton.addEventListener('click', () => {placeLikeButton.classList.toggle('place__like-button_active');});

    placesSection.append(card);
  });
}

profileEditButton.addEventListener('click', () => {popupEditProfile.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = job.textContent;});

popupCloseButton.addEventListener('click', () => {popupEditProfile.classList.remove('popup_opened');
popupAddCards.classList.remove('popup_opened');});
popup.addEventListener('submit', handleFormSubmit);

addCardsButton.addEventListener('click', () => {popupAddCards.classList.add('popup_opened');});

popupSubmitButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  placeTitle.textContent = placeInput.value;
  placeImage.src = imageLinkInput.value;
  placeImage.alt = placeInput.value;
  
  popupClose();
});