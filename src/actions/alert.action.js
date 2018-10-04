
export const alertActions = {
  toastAlert
};

function toastAlert(title, message, typeAlert) {
  let data = {title: title, message: message, typeAlert: typeAlert}
  console.log(data)
  return { type: 'TOAST_ALERT', data};
}