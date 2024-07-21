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

const addCardModal = document.querySelector("#add-card-modal");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addNewCardButton = document.querySelector(".profile__add-button");

const profileEditFormElement = profileEditModal.querySelector(".modal__form");
const addCardFormEelement = addCardModal.querySelector(".modal__form");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");

const addModalCloseButton = addCardModal.querySelector(".modal__close");
const cardTitleInput = addCardFormEelement.querySelector(
  "#modal-input-type-title"
);
const cardUrlInput = addCardFormEelement.querySelector("#modal-input-type-url");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#modal-input-type-url");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector("#card-list");

function closePopop(modal) {
  modal.classList.remove("modal_open");
}

function modalOpen(modal) {
  modal.classList.add("modal_open");
}

function renderedCard(cardData, cardListEl) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopop(addCardModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderedCard({ link, name }, cardListEl);
  closePopop(addCardModal);
}

profileEditButton.addEventListener("click", () => {
  profileDescriptionInput.value = profileDescription.textContent.trim();
  profileTitleInput.value = profileTitle.textContent.trim();
  modalOpen(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closePopop(profileEditModal)
);

addNewCardButton.addEventListener("click", () => modalOpen(addCardModal));
addModalCloseButton.addEventListener("click", () => closePopop(addCardModal));

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__description");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    deleteButton.classList.remove(".card__image");
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

profileEditFormElement.addEventListener("submit", handleProfileEditSubmit);
addCardFormEelement.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => renderedCard(cardData, cardListEl));
