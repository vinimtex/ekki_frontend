export function alert(state = {}, action) {
  switch (action.type) {
    case 'TOAST_ALERT':
      return {
        title: action.data.title,
        text: action.data.message,
        type: action.data.typeAlert,
        width: '20rem',
        timer: 5000,
        position: 'bottom-end',
        toast: true,
        showConfirmButton: false
      }
    case 'CLEAR':
      return {}
    default:
      return state
  }
}