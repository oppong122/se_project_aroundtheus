import Modal from "./Modal.js";

class ModalWithForm extends Modal {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });

    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    //this._button = this._modalForm.querySelector(".modal__button");
    this._inputList = Array.from(
      this._modalForm.querySelectorAll(".modal__input")
    );
  }

  _getInputValues() {
    // const inputList = Array.from(
    //   this._popupForm.querySelectorAll(".modal__input")
    // );
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setInputValue(inputValues) {
    inputList.forEach((input) => {
      input.value = inputValues[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}

export default ModalWithForm;
