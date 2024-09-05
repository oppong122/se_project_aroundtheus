export default class Modal {
  constructor({ popupSelector }) {
    this._modalElement = document.querySelector(popupSelector);
    //console.log(this._modalElement);
    this._closeButton = this._modalElement.querySelector(".modal__close");
  }

  _closeByClick(evt) {
    if (evt.target === this._closeButton || evt.target == this._modalElement) {
      this.closeModal();
    }
  }

  openModal() {
    //opens the modoal
    this._modalElement.classList.add("modal_open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  closeModal() {
    //closes the modal

    this._modalElement.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  // Listens to the escape key
  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.closeModal();
    }
  };

  setEventListeners() {
    //listens to the events
    this._modalElement.addEventListener("mousedown", (evt) => {
      this._closeByClick(evt);
    });
  }
}
