import Modal from "./Modal.js";

class ModalWithImage extends Modal {
  constructor(popupSelector) {
    super({ popupSelector });
    //this._deletConfirm = handleConfirmDelete;
  }

  openModal({ link, name }) {
    this._modalElement.querySelector(".modal__image-title").textContent = name;
    const image = this._modalElement.querySelector(".modal__image-view");
    image.src = link;
    image.alt = `${name}`;
    super.openModal();
  }
}

export default ModalWithImage;
