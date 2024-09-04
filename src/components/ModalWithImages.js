import Modal from "./Modal.js";

class ModalWithImage extends Modal {
  constructor(popupSelector) {
    super({ popupSelector });

    //const image = this._modalElement.querySelector("#image-preview");
    // this._modalForm = this._modalElement.querySelector(".modal__form");
    //this._handleFormSubmit = handleFormSubmit;
    //this._button = this._modalForm.querySelector(".modal__button");
  }

  open({ link, name }) {
    //const image = this._modalElement.querySelector("#image-preview");
    this._modalElement.querySelector("#modal__form-title").textContent = name;
    const image = this._modalElement.querySelector("#image-preview");
    image.src = link;
    image.alt = `${name}`;
    super.open();
  }
}

export default ModalWithImage;
