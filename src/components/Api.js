class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfoApi() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  editUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCard() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addCardApi(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  cardLiked(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      headers: this._headers,
      method: "PUT",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Error");
    });
  }

  dislikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Error");
    });
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Error");
    });
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
