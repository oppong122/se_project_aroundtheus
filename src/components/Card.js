class Card {
  constructor(cardData, cardSelector, handleConfirmDelete, handlePreviewImage) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._handlePreviewImage = handlePreviewImage;
    this._cardSelector = cardSelector;
    this._handleConfirmDelete = handleConfirmDelete;
    this.id = cardData._id;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  deleteCard() {
    this._cardElement.remove();
  }

  _setEventListeners() {
    this._cardImageEl.addEventListener("click", () => {
      this._handlePreviewImage({ link: this._link, name: this._name });
    });
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());
    this._deleteButton.addEventListener("click", () =>
      this._handleConfirmDelete(this)
    );
  }

  getView() {
    this._cardElement = this._getTemplate();

    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__description");

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._setEventListeners();
    return this._cardElement;
  }
}

export default Card;
