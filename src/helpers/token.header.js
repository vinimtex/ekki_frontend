export function tokenHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
      return { 'X-Access-Token': user.token, 'Content-Type': 'application/json', 'Accept': 'application/json'};
  } else {
      return {};
  }
}