import api from "../components/Api.js";
import ModalDeleteConfirm from "../components/ModalDeleteConfirm.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/section.js";
import ModalWithForm from "../components/modaWithForm.js";
import ModalWithImage from "../components/modalWithImages.js";
import {
  modals,
  imagePreviewModal,
  addCardModal,
  profileEditButton,
  profileEditModal,
  addNewCardButton,
  imagePreviewCloseModal,
  profileEditFormElement,
  addCardFormElement,
  profileModalCloseButton,
  addModalCloseButton,
  cardTitleInput,
  previewImage,
  previewImageCaption,
  profileTitle,
  profileDescription,
  modalConfirmDelete,
  cardDeletButton,
  profileTitleInput,
  profileDescriptionInput,
  cardTemplate,
  //cardUrlInput
  profileAvatar,
  profileAvatarButton,
  profileAvatarImage,
  avatarEditModal,
  avatarModalContainer,
  cardSelector,
  ValidationConfig,
} from "../utils/constant.js";

const editFormValidator = new FormValidator(
  ValidationConfig,
  profileEditFormElement
);

const addCardValidator = new FormValidator(
  ValidationConfig,
  addCardFormElement
);

editFormValidator.enableValidation();
addCardValidator.enableValidation();

//Instantiating the UserInfo Class
const profileUserInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__avatar-image"
);

api.getUserInfoApi().then((res) => {
  console.log("page load", res);
  console.log(profileUserInfo);
  // use setUSerInfo instead
  profileUserInfo.setUserInfo(res);
});

let cardSection;

//Instantiating the Section Class (API's)
api.getInitialCard().then((initialCards) => {
  cardSection = new Section(
    {
      items: initialCards,
      renderer: renderCard,
    },
    ".cards__list"
  );

  cardSection.renderItems();
});

// Creating Instance for the  ModalWithform class (Adding cards API)

const addCardPopup = new ModalWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
  // handleConfirmDelete
);
addCardPopup.setEventListeners();

const avatarPopup = new ModalWithForm(
  "#avatar-edit-modal",
  handleAvatarSubmission
);
avatarPopup.setEventListeners();

const profileEditPopup = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditPopup.setEventListeners();

// Instance for the Deleting__card
// const modalConfirmDelete = new ModalDeleteConfirm("#modal__delete-confirm");
// modalConfirmDelete.setEventListeners();

const modalDeletImage = new ModalDeleteConfirm(
  "#modal__delete-confirm",
  handleConfirmDelete
);
modalDeletImage.setEventListeners();

// Creates an instance of PopupWithImage class and calls its parent's setEventListeners()
const imagePreviewPopup = new ModalWithImage("#image-preview");
imagePreviewPopup.setEventListeners();

// Getting all the cards

function createCard(cardData) {
  const card = new Card(
    cardData,
    cardSelector,
    handleConfirmDelete,
    handlePreviewImage
  );
  return card.getView();
}

//Creating Card class Instance
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

/// since setUserInfo is expecting an object with name property and description property, use name & description key/value pairs with formData inside {}
function handleProfileEditSubmit(formData) {
  profileUserInfo.setUserInfo({
    name: formData.title,
    about: formData.description,
  });

  api.editUserInfo(formData.title, formData.description).then((res) => {
    console.log(res);
    profileEditPopup.closeModal();
  });
}

function handleAddCardFormSubmit(cardData) {
  const name = cardData.name;
  const link = cardData.link;

  // Adding API to add new cards;
  api
    .addCardApi(name, link)
    .then((res) => {
      renderCard(res);
      addCardFormElement.reset();
      addCardValidator.resetFormValidation();
      addCardPopup.closeModal();
    })
    .catch((err) => {
      console.error(err);
      alert("Error adding card!!");
    });
}

function handleAvatarSubmission({ url }) {
  api.updateAvatar(url).then((res) => {
    // debugger;
    profileUserInfo.setAvatar(res);
    // call the setUserInfo method
  });
}

function openProfileModal() {
  //profileUserInfo.getUserInfo();
  profileEditPopup.openModal();
}

profileAvatar.addEventListener("click", () => {
  avatarPopup.openModal();
});

profileEditButton.addEventListener("click", () => {
  const userInfoInput = profileUserInfo.getUserInfo();
  profileTitleInput.value = userInfoInput.name.trim();
  profileDescriptionInput.value = userInfoInput.description.trim();
  openProfileModal();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.openModal();
});
//addModalCloseButton.addEventListener("click", () => closeModal(addCardModal));

function handleConfirmDelete(card) {
  // console.log("delete");
  modalDeletImage.openModal(card);
  modalDeletImage.setSubmitAction(() => {
    api.deleteCard(card.id).then(() => {
      card.deleteCard();
    });
  });
}

function handlePreviewImage(cardData) {
  // imagePreviewPopup.openModal(cardData);
}
