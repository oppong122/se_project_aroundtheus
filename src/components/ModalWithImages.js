import Modal from "./Modal.js";

class ModalWithImage extends Modal {
  open({ link, name }) {
    this._modalElement.querySelector("#modal__form-title").textContent = name;
    const image = this._modalElement.querySelector(".modal_image-preview");
    image.src = link;
    image.alt = `${name}`;
    super.open();
  }
}

export default ModalWithImage;
