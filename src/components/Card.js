class Card {
  constructor(
    cardData,
    cardSelector,
    handleConfirmDelete,
    handlePreviewImage,
    handleCardLiked
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._handleCardLiked = handleCardLiked;
    this._handlePreviewImage = handlePreviewImage;
    this._cardSelector = cardSelector;
    this._handleConfirmDelete = handleConfirmDelete;
    this.id = cardData._id;
    this._isLiked = cardData.isLiked;
  }

  _updateLikeStatus() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  isLiked() {
    return this._isLiked;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  deleteCard() {
    this._cardElement.remove();
  }

  _setEventListeners() {
    this._cardImageEl.addEventListener("click", () => {
      this._handlePreviewImage({ link: this._link, name: this._name });
    });
    this._likeButton.addEventListener("click", () =>
      this._handleCardLiked(this)
    );
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
    this._updateLikeStatus();

    this._setEventListeners();
    return this._cardElement;
  }
}

export default Card;
