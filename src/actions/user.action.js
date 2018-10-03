import { userService } from '../services';
import { accountService } from '../services';
import { cardsService } from '../services';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    register,
    getAccount,
    getCards,
    updateCard,
    createCard,
    deleteCard
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => { 
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: 'LOGIN_REQUEST', user } }
    function success(user) { return { type: 'LOGIN_SUCCESS', user } }
    function failure(error) { return { type: 'LOGIN_FAILURE', error } }
}

function register(name, document_number, birth, email, password) {
    return dispatch => {
        userService.register(name, document_number, birth, email, password)
            .then(
                user => { 
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function success(user) { return { type: 'REGISTER_SUCCESS', user } }
    function failure(error) { return { type: 'REGISTER_FAILURE', error } }
}

function logout() {
    userService.logout();
    return { type: 'LOGOUT' };
}

function getAccount(userId) {
    return dispatch => {
        accountService.getAccount(userId)
            .then(
                account => { 
                    dispatch(success(account));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function success(account) { return { type: 'GET_ACCOUNT', account } }
    function failure(error) { return { type: 'REGISTER_FAILURE', error } }
}

function getCards(userId) {
    return dispatch => {
        cardsService.getCards(userId)
            .then(
                cards => { 
                    dispatch(success(cards));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function success(cards) { return { type: 'GET_CARDS', cards } }
    function failure(error) { return { type: 'SERVICE_FAILURE', error } }
}

function updateCard(userId, cardId, inputs) {
    return dispatch => {
        cardsService.updateCard(userId, cardId, inputs)
            .then(
                card => { 
                    dispatch(success(card))
                    dispatch(getCards(userId))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function success(card) { return { type: 'UPDATE_CARDS', card } }
    function failure(error) { return { type: 'REGISTER_FAILURE', error } }
}

function createCard(userId, inputs) {
    return dispatch => {
        cardsService.createCard(userId, inputs)
            .then(
                card => { 
                    dispatch(success(card))
                    dispatch(getCards(userId))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function success(card) { return { type: 'CREATE_CARDS', card } }
    function failure(error) { return { type: 'REGISTER_FAILURE', error } }
}

function deleteCard(userId, cardId) {
    return dispatch => {
        cardsService.deleteCard(userId, cardId)
            .then(
                card => { 
                    dispatch(success(card))
                    dispatch(getCards(userId))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function success(card) { return { type: 'DELETE_CARDS', card } }
    function failure(error) { return { type: 'SERVICE_FAILURE', error } }
}