import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import UserInfo from "../components/userInfo.js";
import Section from "../components/section.js";
import ModalWithForm from "../components/modaWithForm.js";
import ModalWithImage from "../components/modalWithImages.js";
import {
  initialCards,
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
  profileTitleInput,
  profileDescriptionInput,
  cardTemplate,
  cardSelector,
  ValidationConfig,
} from "../utils/constant.js";

console.log(cardTitleInput);

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
  ".profile__description"
);
profileUserInfo.getUserInfo();

//Instantiating the Section Class
const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);

cardSection.renderItems();

// Creating Instance for the  ModalWithform class
const addCardPopup = new ModalWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

const profileEditPopup = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditPopup.setEventListeners();

// Creates an instance of PopupWithImage class and calls its parent's setEventListeners()
const imagePreviewPopup = new ModalWithImage("#image-preview");
imagePreviewPopup.setEventListeners();

function createCard(cardData) {
  const card = new Card(cardData, cardSelector, handlePreviewImage);
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
    description: formData.description,
  });

  profileEditPopup.closeModal();
}

function handleAddCardFormSubmit(cardData) {
  const name = cardData.name;
  const link = cardData.link;
  renderCard({ link, name });
  addCardFormElement.reset();
  addCardValidator.resetFormValidation();
  addCardPopup.closeModal();
  // console.log(cardData);
}

function openProfileModal() {
  //profileUserInfo.getUserInfo();
  profileEditPopup.openModal();
}

profileEditButton.addEventListener("click", () => {
  const userInfoInput = profileUserInfo.getUserInfo();
  profileTitleInput.value = userInfoInput.name.trim();
  profileDescriptionInput.value = userInfoInput.description.trim();
  openProfileModal();
});

// Remove close listeners
// imagePreviewCloseModal.addEventListener(
//   "click",
//   () => imagePreviewPopup //.closeModal()
// );

// profileModalCloseButton.addEventListener(
//   "click",
//   () => profileEditPopup //.closeModal()
// );

addNewCardButton.addEventListener("click", () => {
  addCardPopup.openModal();
});
//addModalCloseButton.addEventListener("click", () => closeModal(addCardModal));

function handlePreviewImage(cardData) {
  imagePreviewPopup.openModal(cardData);
}
