import { api } from '../helpers'
import { tokenHeader } from '../helpers'

export const accountService = {
    getAccount
};

function getAccount(userId) {
    const requestOptions = {
        method: 'GET',
        headers: tokenHeader()
    };

    return fetch(api + 'users/' + userId + '/account', requestOptions)
        .then(handleResponse)
        .then(account => {
            return account;
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