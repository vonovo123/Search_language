export const setLocalStorage = function (param) {
  const { key, value } = param;
  const localStorage = window.localStorage;
  localStorage.setItem(key, JSON.stringify(value));
};
export const getLocalStorage = function (key) {
  return JSON.parse(localStorage.getItem(key));
};
