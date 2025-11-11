import Cookies from "js-cookie";

export function setToken(token, title = "token") {
  Cookies.set(title, token, { expires: 7 });
}

export function getToken(title = "token") {
  return Cookies.get(title);
}

export function removeToken(title = "token") {
  Cookies.remove(title);
}
