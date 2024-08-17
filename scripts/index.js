import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const modals = document.querySelectorAll(".modal");
const imagePreviewModal = document.querySelector("#image-preview");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addNewCardButton = document.querySelector(".profile__add-button");

const imagePreviewCloseModal = imagePreviewModal.querySelector(".modal__close");
const profileEditFormElement = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addModalCloseButton = addCardModal.querySelector(".modal__close");
const cardTitleInput = addCardFormElement.querySelector(
  "#modal-input-type-title"
);
//const cardFormSubmitButton = addCardModal.querySelector(".modal__button");
const cardUrlInput = addCardFormElement.querySelector("#modal-input-type-url");

const previewImage = document.querySelector(".modal__image-view");
const previewImageCaption = document.querySelector(".modal__image-title");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector("#card-list");
const cardSelector = "#card-template";

//Validator
const ValidationConfig = {
  inputSelector: ".modal__input",
  submitButton: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

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

function closeModal(modal) {
  document.removeEventListener("keydown", closeModalOnEscape);
  modal.classList.remove("modal_open");
}

function openModal(modal) {
  modal.classList.add("modal_open");
  document.addEventListener("keydown", closeModalOnEscape);
}
//Creating Card Instance
function renderCard(cardData, cardListEl) {
  const card = new Card(cardData, cardSelector, handlePreviewImage);
  cardListEl.prepend(card.getView());
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  //editFormValidator.resetFormValidation();
  //addCardFormElement.reset();
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ link, name }, cardListEl);
  e.target.reset();
  addCardValidator.resetFormValidation();
  //addCardValidator.resetForm();
  closeModal(addCardModal);
}

function openProfileModal() {
  profileDescriptionInput.value = profileDescription.textContent.trim();
  profileTitleInput.value = profileTitle.textContent.trim();
  openModal(profileEditModal);
}

profileEditButton.addEventListener("click", openProfileModal);

imagePreviewCloseModal.addEventListener("click", () =>
  closeModal(imagePreviewModal)
);
profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});
addModalCloseButton.addEventListener("click", () => closeModal(addCardModal));
//destructured
const handlePreviewImage = (cardData) => {
  previewImage.src = cardData.link;
  previewImage.alt = cardData.name;
  previewImageCaption.textContent = cardData.name;
  openModal(imagePreviewModal);
};

function closeModalOnEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".modal_open");
    closeModal(openedPopup);
  }
}

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

profileEditFormElement.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
