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

api
  .getUserInfoApi()
  .then((res) => {
    console.log("page load", res);
    console.log(profileUserInfo);
    profileUserInfo.setAvatar(res);
    // use setUSerInfo instead
    profileUserInfo.setUserInfo(res);
  })
  .catch((err) => {
    console.error(err);
    alert("Error adding card!!");
  });

let cardSection;

//Instantiating the Section Class (API's)
api
  .getInitialCard()
  .then((initialCards) => {
    cardSection = new Section(
      {
        items: initialCards,
        renderer: renderCard,
      },
      ".cards__list"
    );
    // preventDefault();
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
    alert("Error adding card!!");
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
    handlePreviewImage,
    handCardleLiked
  );
  return card.getView();
}

//Creating Card class Instance
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

// handling User information(UserIfo)
function handleProfileEditSubmit(formData) {
  profileEditPopup.isButtonLoading(true);
  api
    .editUserInfo(formData.title, formData.description)
    .then((res) => {
      console.log(res);
      profileUserInfo.setUserInfo({
        name: formData.title,
        about: formData.description,
      });
      profileEditPopup.closeModal();
    })
    .catch((err) => {
      console.error(err);
      alert("Error adding card!!");
    })
    .finally(() => {
      profileEditPopup.isButtonLoading(false);
    });
}

// Adding card handler
function handleAddCardFormSubmit(cardData) {
  const name = cardData.name;
  const link = cardData.link;
  addCardPopup.isButtonLoading(true);
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
    })
    .finally(() => {
      addCardPopup.isButtonLoading(false);
    });
}

// Handling the Avatar update
function handleAvatarSubmission({ url }) {
  api
    .updateAvatar(url)
    .then((res) => {
      profileUserInfo.setAvatar(res);
      avatarPopup.closeModal();
    })
    .catch((err) => {
      console.error(err);
      alert("Error adding card!!");
    });
}

// Opening Userinfor Modal
function openProfileModal() {
  profileEditPopup.openModal();
}

// Adding an evenlistener to open the Avatar Modal(profile image)
profileAvatar.addEventListener("click", () => {
  avatarPopup.openModal();
});

profileEditButton.addEventListener("click", () => {
  const userInfoInput = profileUserInfo.getUserInfo();
  profileTitleInput.value = userInfoInput.name.trim();
  profileDescriptionInput.value = userInfoInput.description.trim();
  openProfileModal();
});

// Opening the addCardModal to add a new card
addNewCardButton.addEventListener("click", () => {
  addCardPopup.openModal();
});

// handling the Card Like button
function handCardleLiked(card) {
  if (card.isLiked()) {
    api
      .dislikeCard(card.id)
      .then(() => {
        card.handleLikeIcon();
      })
      .catch((err) => console.log("Error unliking card:", err));
  } else {
    api
      .cardLiked(card.id)
      .then(() => {
        card.handleLikeIcon();
      })
      .catch((err) => console.log("Error liking card:", err));
  }
}

//handling Delet confirmation which confirms to Deletes the Cards permanently from the browser
function handleConfirmDelete(card) {
  modalDeletImage.openModal(card);
  modalDeletImage.setSubmitAction(() => {
    api
      .deleteCard(card.id)
      .then(() => {
        card.deleteCard();
        modalDeletImage.closeModal();
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding card!!");
      });
  });
}

// question about this function?(why is it an empty function with and undifined parameter but causes error when deleted)
function handlePreviewImage(cardData) {
  imagePreviewPopup.openModal(cardData);
}
