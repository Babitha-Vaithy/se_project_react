const baseUrl = "http://localhost:3001";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

export function request(url, options) {
  return fetch(url, options).then((data) => checkResponse(data));
}

function getItems() {
  return request(`${baseUrl}/items`, null);
}

function createItems({ name, link, weather }, jwt) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ name: name, imageUrl: link, weather: weather }),
  });
}

function deleteItems(id, jwt) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  });
}

function editProfile({ name, avatar }, jwt) {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      name,
      avatar,
    }),
  });
}

function addCardLike(id, jwt) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  });
}

function removeCardLike(id, jwt) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  });
}

export {
  getItems,
  createItems,
  deleteItems,
  editProfile,
  addCardLike,
  removeCardLike,
};
