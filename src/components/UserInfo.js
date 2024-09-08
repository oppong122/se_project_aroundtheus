export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }
  // returns object containing user info. use for displaying user data in profile edit modal
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }
  // takes new user data and adds it to page. use for submitting profile edit form
  setUserInfo(userInfo) {
    this._nameElement.textContent = userInfo.name;
    this._descriptionElement.textContent = userInfo.description;
  }
}
