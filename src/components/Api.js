class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfoApi() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }

  editUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  getInitialCard() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addCardApi(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  cardLiked(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      headers: this._headers,
      method: "PUT",
    }).then(this._checkResponse);
  }

  dislikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c09f26f5-da96-4e82-9b10-1c279e2a7779",
    "Content-Type": "application/json",
  },
});

export default api;
