import Modal from "./Modal.js";

class ModalDeleteConfirm extends Modal {
  constructor(popupSelector, handleConfirmDelete) {
    super({ popupSelector });
    // this._handleConfirmDelete = handleConfirmDelete;
    console.log(this._modalElement);
    this._modalForm = this._modalElement.querySelector(".modal__form");
  }

  setSubmitAction(action) {
    this._handleConfirmDelete = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleConfirmDelete();
      // this._modalForm.reset();
    });
  }
}

export default ModalDeleteConfirm;
