import Modal from "./Modal";
class ModalWithForm extends Modal {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handlFormSubmitt = handleFormSubmit;
  }

  _getInputValues() {}

  setEventListeners() {}

  close() {
    this._modalForm.reset();
    super.close();
  }
}

// Extentiate in index.js
