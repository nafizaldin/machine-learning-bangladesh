import { proxy } from "valtio";
import $axios from '../_api/axios'
import { cookieUtils } from "@/utils/cookie";
const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
const _signature = process.env.NEXT_PUBLIC_SIGN || '';

const authStore = proxy({
  user: null,
  isAuthenticated: false,
  reAuthorizeWithTokenRequested: 0,
  loginRequest: 0,
  loginError: null,
  authenticationLoading: false,
  authenticationError: null,
  async login(user) {
    authStore.loginError = null;

    try {
      const result = await $axios.post('/v1/auth/login', user);
      const { data, token } = result.data;
      if (token) cookieUtils.setToken(token);
      
      if (data) {
        authStore.user = data;
        authStore.isAuthenticated = true;
      }
    } catch (err) {
      console.log(err)
      authStore.user = null;
      authStore.isAuthenticated = false;
      authStore.loginError = err.response?.data?.message || 'Something went wrong';
    } finally {
      authStore.loginRequest += 1;
    }
  },
  async reAuthorizeWithToken(user) {
    let resp = [];

    try {
      const result = await $axios.get('/v1/users/me/', user);
      const { data, token } = result.data;
      token && cookieUtils.setToken(token);
      if (data) {
        authStore.user = data;
        authStore.isAuthenticated = true;
        resp = [data, null];
      }
    } catch (err) {
      authStore.user = null;
      authStore.isAuthenticated = false;
      resp = [null, err.response?.message || err.response?.data?.message || 'Permisson Denied'];
    } finally {
      authStore.reAuthorizeWithTokenRequested += 1;
      return resp;
    }
  },

  async forgotPassword(payload) {
    let resp = [];
    try {
      const result = await $axios.post('/v1/auth/forgot-password', payload);
      const { data } = result.data;
      if (data) {
        resp = [data, null];
      }
    } catch (err) {
      resp = [null, err.response?.message || err.response?.data?.message || 'Oops something went wrong! Please try again later.'];
    } finally {
      return resp;
    }
  },

  async verifyOTP(payload) {
    let resp = [];
    try {
      const result = await $axios.post('/v1/auth/verify-otp', payload);
      const { data } = result.data;
      if (data) {
        resp = [data, null];
      }
    } catch (err) {
      resp = [null, err.response?.message || err.response?.data?.message || 'Oops something went wrong! Please try again later.'];
    } finally {
      return resp;
    }
  },

  async resetPassword(payload) {
    let resp = [];
    try {
      const result = await $axios.post('/v1/auth/reset-password', payload);
      // redirect to this url
      const { data } = result.data;
      if (data) {
        resp = [data, null];
      }
    } catch (err) {
      resp = [null, err.response?.message || err.response?.data?.message || 'Oops something went wrong! Please try again later.'];
    } finally {
      return resp;
    }
  },

  async googleSignIn() {
    window.location.href = `${baseurl}/api/v1/auth/google`;
  },

  async facebookSignIn() {
    window.location.href = `${baseurl}/api/v1/auth/facebook`;
  },

  logout() {
    authStore.user = null;
    authStore.isAuthenticated = false;
    cookieUtils.removeToken();
  },
});

export default authStore;