/* const imagePreviewModal = document.querySelector("#image-preview");
const previewImage = document.querySelector(".modal__image-view");
const previewImageCaption = document.querySelector(".modal__image-title");

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
});*/

class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._cardSelector = cardSelector;
    //console.log(this._cardSelector);
  }
  debugger;

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _handleLikeIcon() {
    this._likeButton
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeletCard() {
    this._deleteButton
      .querySelector(".card__delete-button")
      .this._cardSelector.remove();
  }

  _setEventListeners() {
    this._cardImageEl
      //.querySelector(".card__image")
      .addEventListener("click", () =>
        this._handlePreviewImage({ name: "asdf", link: "" })
      );
    this._likeButton
      //.querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeIcon);
    this._deleteButton
      //.querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeletCard);
  }

  getElement() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__image");
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__description");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    //this._setEventListeners();
    return this._cardElement;
  }
}

export default Card;
