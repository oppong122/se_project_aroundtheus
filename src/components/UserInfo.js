export default class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector) {
    // select the avatar image element avatarSelector
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }
  // returns object containing user info. use for displaying user data in profile edit modal
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo(userInfo) {
    this._nameElement.textContent = userInfo.name;
    this._descriptionElement.textContent = userInfo.about;
  }

  setAvatar(userInfo) {
    this._avatarElement.src = userInfo.avatar;
  }
}
