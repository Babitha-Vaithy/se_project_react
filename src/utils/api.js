const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

function request(url, options) {
  return fetch(url, options)
    .then((data) => checkResponse(data))
    .catch(console.error);
}

function getItems() {
  return request(`${baseUrl}/items`, null);
}

function createItems({ name, link, weather }) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, imageUrl: link, weather: weather }),
  });
}

function deleteItems(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export { getItems, createItems, deleteItems };
