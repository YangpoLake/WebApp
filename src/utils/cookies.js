import Cookies from "js-cookie";

const languageKey = "language";
export const getLanguage = () => Cookies.get(languageKey);
export const setLanguage = (language) => Cookies.set(languageKey, language);

// User
const tokenKey = "vue_typescript_admin_access_token";
export const getToken = () => Cookies.get(tokenKey);
export const setToken = (token) => Cookies.set(tokenKey, token);
export const removeToken = () => Cookies.remove(tokenKey);
