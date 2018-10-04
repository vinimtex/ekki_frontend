import { api } from '../helpers'
import { tokenHeader } from '../helpers'

export const accountService = {
    getAccount,
    transfer,
    deposit,
    getTransactionsHistory
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

function transfer(fromUserId, data) {
    const requestOptions = {
        method: 'POST',
        headers: tokenHeader(),
        body: JSON.stringify(data)
    };

    return fetch(api + 'users/' + fromUserId + '/account/transfer', requestOptions)
        .then(handleResponse)
        .then(transfer => {
            return transfer;
        });
}

function deposit(fromUserId, data) {
    const requestOptions = {
        method: 'POST',
        headers: tokenHeader(),
        body: JSON.stringify(data)
    };

    return fetch(api + 'users/' + fromUserId + '/account/deposit', requestOptions)
        .then(handleResponse)
        .then(transfer => {
            return transfer;
        });
}

function getTransactionsHistory(fromUserId) {
    const requestOptions = {
        method: 'GET',
        headers: tokenHeader()
    };

    return fetch(api + 'users/' + fromUserId + '/transactions', requestOptions)
        .then(handleResponse)
        .then(transactions => {
            return transactions;
        });
}


function handleResponse(response) {
    return response.text().then(text => {
        
        if (!response.ok) {
            const error = response.statusText;
            return Promise.reject(error);
        } else {
            const data = text && JSON.parse(text);
            return data;
        }
    });
}