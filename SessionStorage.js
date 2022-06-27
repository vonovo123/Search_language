export const setSessionStorage = function (param) {
  const { key, value } = param;
  sessionStorage.setItem(key, JSON.stringify(value));
};
export const getSessionStorage = function (key) {
  return JSON.parse(sessionStorage.getItem(key));
};
