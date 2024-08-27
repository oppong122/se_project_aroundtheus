export default class Modal {
  constructor({ popupSelector }) {
    this._modalElement = document.querySelector(popupSelector);
    console.log(this._modalElement);
    this._closeButton = this._modalElement.querySelector(".modal__close");
  }

  _closeByClick(evt) {
    if (evt.target === this._closeButton || evt.target == this._modalElement) {
      this.closeModal();
    }
  }

  openModal() {
    //opens the modoal
    this._modal.classList.add("modal_open");
    this._document.addEventListener("keydown", closeModalOnEscape);
  }

  closeModal() {
    //closes the modal

    this._modal.classList.remove("modal_open");
    this._document.removeEventListener("keydown", closeModalOnEscape);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.closeModal();
    }
  }

  setEventListeners() {
    //listens to the events
    this._modalElement.addEventListener("click", () => {
      this._closeByClick();
      this.closeModal();
      this._handleEscClose();
    });
  }
}
