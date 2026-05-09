import Cookies from "js-cookie";

const COOKIE_NAME = "tk"; // token name
const COOKIE_EXPIRY = 1;  // days

export const cookieUtils = {
  setToken: (token) => {
    Cookies.set(COOKIE_NAME, token, {
      expires: COOKIE_EXPIRY,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },

  getToken: () => {
    return Cookies.get(COOKIE_NAME);
  },

  removeToken: () => {
    Cookies.remove(COOKIE_NAME);
  },
};
