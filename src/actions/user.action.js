import { userService } from '../services';
import { accountService } from '../services';
import { cardsService } from '../services';
import { history } from '../helpers';
import { alertActions } from './alert.action';

export const userActions = {
    login,
    logout,
    register,
    getAccount,
    getCards,
    updateCard,
    createCard,
    deleteCard,
    getContacts,
    transfer,
    deposit,
    getTransactionsHistory,
    removeContact
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => { 
                    dispatch(success(user));
                    dispatch(alertActions.toastAlert('Login efetuado com sucesso', '', 'success'))
                    window.location = '/'
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.toastAlert('E-mail ou senha incorretos', '', 'error'))
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
                    dispatch(alertActions.toastAlert('Cadastro efetuado com sucesso!', '', 'success'))
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.toastAlert('Erro ao se cadastrar, tenha certeza que você preencheu todos os campos', '', 'error'))
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

function getContacts(userId) {
    return dispatch => {
        userService.getContacts(userId)
            .then(
                contacts => { 
                    dispatch(success(contacts));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function success(contacts) { return { type: 'GET_CONTACTS', contacts } }
    function failure(error) { return { type: 'SERVICE_FAILURE', error } }
}

function removeContact(userId, contactId) {
    return dispatch => {
        userService.removeContact(userId, contactId)
            .then(
                result => { 
                    dispatch(success(result));
                    dispatch(getContacts(userId))
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function success(result) { return { type: 'REMOVE_CONTACT', result } }
    function failure(error) { return { type: 'SERVICE_FAILURE', error } }
}

function transfer(userId, data) {
    return dispatch => {
        accountService.transfer(userId, data)
            .then(
                transference => { 
                    dispatch(success(transference));
                    dispatch(userActions.getAccount(userId))
                    dispatch(alertActions.toastAlert('Transferência efetuada com sucesso!', transfer.id, 'success'))
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.toastAlert('Transação não aprovada, verifique se a conta do favorecido existe ou se sua senha está correta.', '', 'error'))
                }
            );
    };
    function success(transference) { return { type: 'TRANSFER', transference } }
    function failure(error) { return { type: 'SERVICE_FAILURE', error } }
}

function deposit(userId, data) {
    return dispatch => {
        accountService.deposit(userId, data)
            .then(
                transference => { 
                    dispatch(success(transference));
                    dispatch(userActions.getAccount(userId))
                    dispatch(alertActions.toastAlert('Depósito efetuado com sucesso!', transfer.id, 'success'))
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.toastAlert('Erro ao realizar seu depósito.', '', 'error'))
                }
            );
    };
    function success(transference) { return { type: 'DEPOSIT', transference } }
    function failure(error) { return { type: 'SERVICE_FAILURE', error } }
}

function getTransactionsHistory(userId) {
    return dispatch => {
        accountService.getTransactionsHistory(userId)
            .then(
                transactions => { 
                    dispatch(success(transactions));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.toastAlert('Erro ao recuperar seu histórico de transações.', '', 'error'))
                }
            );
    };
    function success(transactions) { return { type: 'HISTORY', transactions } }
    function failure(error) { return { type: 'SERVICE_FAILURE', error } }
}