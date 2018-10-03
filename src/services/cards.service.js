import { api } from '../helpers'
import { tokenHeader } from '../helpers'

export const cardsService = {
    getCards,
    createCard,
    updateCard,
    deleteCard
};

function getCards(userId) {
    const requestOptions = {
        method: 'GET',
        headers: tokenHeader()
    };

    return fetch(api + 'users/' + userId + '/cards', requestOptions)
        .then(handleResponse)
        .then(cards => {
            return cards;
        });
}

function createCard(userId, inputs) {
  const requestOptions = {
      method: 'POST',
      headers: tokenHeader(),
      body: JSON.stringify(inputs)
  };

  return fetch(api + 'users/' + userId + '/cards', requestOptions)
      .then(handleResponse)
      .then(card => {
          return card;
      });
}

function updateCard(userId, cardId, inputs) {
  delete inputs.id
  const requestOptions = {
      method: 'POST',
      headers: tokenHeader(),
      body: JSON.stringify(inputs)
  };

  return fetch(api + 'users/' + userId + '/cards/' + cardId, requestOptions)
      .then(handleResponse)
      .then(card => {
          return card;
      });
}

function deleteCard(userId, cardId) {
  const requestOptions = {
      method: 'DELETE',
      headers: tokenHeader()
  };

  return fetch(api + 'users/' + userId + '/cards/' + cardId, requestOptions)
      .then(card => {
          return card;
      });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}