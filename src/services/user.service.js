import { api } from '../helpers'
import { tokenHeader } from '../helpers'

export const userService = {
    login,
    logout,
    register
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(api + 'users/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function register(name, document_number, birth, email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, document_number, birth, email, password })
    };

    return fetch(api + 'users', requestOptions)
        .then(handleResponse)
        .then(account => {
            return account;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}