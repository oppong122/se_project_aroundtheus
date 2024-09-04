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

// function closeModal(modal) {
//   document.removeEventListener("keydown", closeModalOnEscape);
//   modal.classList.remove("modal_open");
// }

// function openModal(modal) {
//   modal.classList.add("modal_open");
//   document.addEventListener("keydown", closeModalOnEscape);
// }

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
  //const card = new Card(cardData, cardSelector, handlePreviewImage);
  //cardListEl.prepend(cardElement);
}

// Pass the handler to PopupWithForm as an arg
function handleProfileEditSubmit(values) {
  profileTitle.textContent = values.profile__title;
  profileDescription.textContent = values.profile__description;
  // use the close method
  profileEditPopup.closeModal();
}

function handleAddCardFormSubmit(cardData) {
  // const name = cardTitleInput.name;
  //const name = cardTitleInput.name;
  const name = cardData.name;
  const link = cardData.link;
  renderCard({ link, name });
  //e.target.reset();
  addCardValidator.resetFormValidation();
  addCardPopup.closeModal();
  console.log(cardData);
}

function openProfileModal() {
  profileDescriptionInput.value = profileDescription.textContent.trim();
  profileTitleInput.value = profileTitle.textContent.trim();
  profileEditPopup.openModal();
}

profileEditButton.addEventListener("click", openProfileModal);

// Remove close listeners
imagePreviewCloseModal.addEventListener("click", () =>
  imagePreviewPopup.closeModal()
);

profileModalCloseButton.addEventListener("click", () =>
  profileEditPopup.closeModal()
);

addNewCardButton.addEventListener("click", () => {
  // Anywhere using openModal()
  // use the Popup instances .open()
  addCardPopup.openModal();
  //openModal(addCardModal);
});
addModalCloseButton.addEventListener("click", () => closeModal(addCardModal));
//destructured
function handlePreviewImage(cardData) {
  previewImage.src = cardData.link;
  previewImage.alt = cardData.name;
  previewImageCaption.textContent = cardData.name;
  imagePreviewPopup.openModal();
}

// function closeModalOnEscape(event) {
//   if (event.key === "Escape") {
//     const openedPopup = document.querySelector(".modal_open");
//     closeModal(openedPopup);
//   }
// }

// Close button listeners: in Popup
// modals.forEach((modal) => {
//   modal.addEventListener("mousedown", (e) => {
//     if (e.target === modal) {
//       modal.closeModal();
//     }
//   });
// });

// profileEditFormElement.addEventListener("submit", handleProfileEditSubmit);
// addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
