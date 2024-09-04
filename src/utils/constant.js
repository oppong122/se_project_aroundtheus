export const initialCards = [
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

export const modals = document.querySelectorAll(".modal");
export const imagePreviewModal = document.querySelector("#image-preview");
export const addCardModal = document.querySelector("#add-card-modal");
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const addNewCardButton = document.querySelector(".profile__add-button");

export const imagePreviewCloseModal =
  imagePreviewModal.querySelector(".modal__close");
export const profileEditFormElement =
  profileEditModal.querySelector(".modal__form");
export const addCardFormElement = addCardModal.querySelector(".modal__form");
export const profileModalCloseButton =
  profileEditModal.querySelector(".modal__close");
export const addModalCloseButton = addCardModal.querySelector(".modal__close");
export const cardTitleInput = addCardFormElement.querySelector(
  "#modal-input-type-title"
);
//const cardFormSubmitButton = addCardModal.querySelector(".modal__button");
const cardUrlInput = addCardFormElement.querySelector("#modal-input-type-url");

export const previewImage = document.querySelector(".modal__image-view");
export const previewImageCaption = document.querySelector(
  ".modal__image-title"
);
export const profileTitle = document.querySelector("#profile-title");
export const profileDescription = document.querySelector(
  "#profile-description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
export const cardSelector = "#card-template";

//Validator
export const ValidationConfig = {
  inputSelector: ".modal__input",
  submitButton: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
