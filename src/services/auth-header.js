export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('authTokens'));
    if (user && user.access) {
      return { Authorization: 'Bearer ' + user.access };
    } else {
      return {};
    }
  }