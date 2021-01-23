import Cookies from 'js-cookie'

const TokenKey = 'cinerx'

export function getToken(TokenKey) {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
  // return Cookies.set(TokenKey, token)
}
export function getPer(plper) {
  return Cookies.get(plper)
}

export function setPer(plper) {
  return Cookies.set('plper', plper)
  // return Cookies.set(TokenKey, token)
}

export function removeToken(TokenKey) {
  return Cookies.remove(TokenKey)
}

export function setUserName(username){
  return Cookies.set('cineun',username)
}
export function setPassword(password){
  return Cookies.set('cineps',password)
}
