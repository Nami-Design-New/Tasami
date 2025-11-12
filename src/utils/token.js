import Cookies from "js-cookie";

export function setToken(token, title = "token") {
  Cookies.set(title, token, { expires: 7 });
}

export function getToken(key = "token") {
  return Cookies.get(key);
}

export function removeToken(key = "token") {
  Cookies.remove(key);
}
