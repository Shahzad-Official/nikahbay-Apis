export var tokenMap = new Map();

export default class TokenSetting {
  static saveToken(email, token) {
    tokenMap.set(email, token);
  }
  static getToken(email) {
    return tokenMap.get(email);
  }
}
