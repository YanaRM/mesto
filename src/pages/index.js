import './index.css';

import Card  from '../components/Card.js';
/*import { initialCards } from '../utils/constants.js';*/
import { config, FormValidator } from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import Api from '../components/Api.js';
import { apiData } from '../utils/apiData.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardsButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_profession');
const avatarIcon = document.querySelector('.profile__avatar-edit-button');

let userId;

const api = new Api(apiData);

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;

    userInfo.setUserInfo(userData);
    userInfo.setProfilePhoto(userData);

    cardsData.reverse();
    initialCardsRender.renderItems(cardsData);
    console.log(cardsData)
  })
  .catch((err) => {
    console.log(err)
  })

function createCard(data) {
  const card = new Card(data, userId, '#place-card', handleCardClick,
    {
      handleDeleteClick: () => {
        popupDeleteCard.open();
        popupDeleteCard.setHandleSubmit(() => {
          api.deleteCard(card._id)
            .then(() => {
              card.removeCard();
              popupDeleteCard.close()
            })
            .catch((err) => {
              console.log(err)
            })
          })
      },

      handleLike: () => {
        if (card.isLiked()) {
          api.removeLike(card._id)
            .then((data) => {
              card.removeLike();
              card.setLike(data.likes)
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          api.putLike(card._id)
            .then((data) => {
              card.putLike();
              card.setLike(data.likes)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }
  });

  const cardElement = card.generateCard();

  return cardElement;
}

const initialCardsRender = new Section({
  renderer: (data) => {
    const cardElement = createCard(data);
    initialCardsRender.addItem(cardElement)
    }
  },
  '.places');

const userInfo = new UserInfo({
  profileNameSelector: '.profile__title',
  profileJobSelector: '.profile__subtitle',
  profilePhotoSelector: '.profile__photo'
});

const popupEditProfile = new PopupWithForm({
  selector: '.popup_type_edit-profile',
  handleSubmitForm: handleProfileSubmitForm
});

function handleProfileSubmitForm(data) {
  renderLoading(true);
  api.editProfile(data)
    .then((info) => {
      userInfo.setUserInfo(info)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false)
    })
};

const popupAddCards = new PopupWithForm({
  selector: '.popup_type_add-cards',
  handleSubmitForm: handleAddCardsSubmitForm
});

function handleAddCardsSubmitForm(data) {
  renderLoading(true);
  api.addNewCard(data)
    .then((item) => {
      const cardElement = createCard(item)
      initialCardsRender.addItem(cardElement);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false)
    })
};

popupEditProfile.setEventListeners();
popupAddCards.setEventListeners();

const popupPhoto = new PopupWithImage('.popup_type_photo');
popupPhoto.setEventListeners();

function handleCardClick(name, link) {
  popupPhoto.open(name, link);
};

const popupEditAvatar = new PopupWithForm({
  selector: '.popup_type_edit-avatar',
  handleSubmitForm: handleEditAvatarSubmitForm
});

function handleEditAvatarSubmitForm(data) {
  renderLoading(true);
  api.editAvatar(data)
    .then((item) => {
      userInfo.setProfilePhoto(item)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false)
    })
}

const popupDeleteCard = new PopupDeleteCard('.popup_type_delete-card',
  {
    apiConfirm: (data) => {
      api.deleteCard(data)
        .then(() => {
          popupDeleteCard.close()
        })
        .catch((err) => {
          console.log(err)
        })
    }
});

popupEditAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

const editProfileValidation = new FormValidator(config, document.querySelector('.popup_type_edit-profile')
  .querySelector('.popup__form'));
const addCardsValidation = new FormValidator(config, document.querySelector('.popup_type_add-cards')
  .querySelector('.popup__form'));
const newProfilePhotoValidation = new FormValidator(config, document.querySelector('.popup_type_edit-avatar')
  .querySelector('.popup__form'));

editProfileValidation.enableValidation();
addCardsValidation.enableValidation();
newProfilePhotoValidation.enableValidation();

profileEditButton.addEventListener('click', () => {
  const userInfoValues = userInfo.getUserInfo();
  nameInput.value = userInfoValues.name;
  jobInput.value = userInfoValues.about;
  popupEditProfile.open();
  editProfileValidation.resetValidation();
});

addCardsButton.addEventListener('click', () => {
  popupAddCards.open();
  addCardsValidation.resetValidation();
});

avatarIcon.addEventListener('click', () => {
  popupEditAvatar.open();
  newProfilePhotoValidation.resetValidation()
});

function renderLoading(isLoading) {
  if (isLoading) {
    document.querySelector('.popup__submit-button').textContent = 'Сохранение...'
  }
}