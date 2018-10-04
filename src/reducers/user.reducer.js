let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user, account: {}, cards: [] } : {};

export function user(state = initialState, action) {
  switch (action.type) {
    case 'TRANSFER':
      return state
    case 'DEPOSIT':
      return state
    case 'REMOVE_CONTACT':
      return state
    case 'GET_CONTACTS':
      return {
        ...state,
        contacts: action.contacts
      }
    case 'GET_CARDS':
      return {
        ...state,
        cards: action.cards
      }
    case 'UPDATE_CARDS':
      return {
        account: state.account,
        user: state.user,
        cards: state.cards
      }
    case 'CREATE_CARDS':
      return {
        account: state.account,
        user: state.user,
        cards: state.cards
      }
    case 'DELETE_CARDS':
      return {
        account: state.account,
        user: state.user,
        cards: state.cards
      }
    case 'GET_ACCOUNT':
      return {
        ...state,
        account: action.account
      }
    case 'REGISTER_SUCCESS':
      return {

      }
    case 'REGISTER_FAILURE':
      return {

      }
    case 'LOGIN_REQUEST':
      return {
        loggingIn: true,
        user: action.user
      }
    case 'LOGIN_SUCCESS':
      return {
        loggedIn: true,
        user: action.user
      }
    case 'LOGIN_FAILURE':
      return {
        loginFailed: true
      }
    case 'LOGOUT':
      return {}
    case 'SERVICE_FAILURE':
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}