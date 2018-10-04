export function transaction(state = {}, action) {
  switch (action.type) {
    case 'HISTORY':
      return {
        transactions: action.transactions
      }
    default:
      return state
  }
}