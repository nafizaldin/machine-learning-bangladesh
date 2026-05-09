"use client";
import { proxy } from "valtio";
import $axios from "../_api/axios";

const gtmStore = proxy({
  gtm: {
    data: null,
    error: null,
    loading: false,
  },

  // GET GTM ID (only one stored in DB)
async getGtm() {
  gtmStore.gtm.loading = true;

  try {
    const res = await $axios.get("/v1/gtm/all");

    const items = res.data?.data || [];
    gtmStore.gtm.data = items.length > 0 ? items[0] : null;

    gtmStore.gtm.error = null;
  } catch (err) {
    gtmStore.gtm.error = err.response?.data?.message || "Failed to fetch GTM ID";
  } finally {
    gtmStore.gtm.loading = false;
  }
},


  // CREATE GTM ID
  async createGtm(payload) {
    try {
      const res = await $axios.post("/v1/gtm/create", payload);
      gtmStore.gtm.data = res.data.data;
      return [res.data, null];
    } catch (err) {
      const error = err.response?.data?.message || "Failed to create GTM ID";
      return [null, error];
    }
  },


  // UPDATE GTM ID
  async updateGtm(id, payload) {
    try {
      const res = await $axios.put(`/v1/gtm/update/${id}`, payload);
      gtmStore.gtm.data = res.data.data;
      return [res.data, null];
    } catch (err) {
      const error = err.response?.data?.message || "Failed to update GTM ID";
      return [null, error];
    }
  },


  // DELETE GTM ID
  async deleteGtm(id) {
    try {
      const res = await $axios.delete(`/v1/gtm/delete/${id}`);
      gtmStore.gtm.data = null;
      return [res.data, null];
    } catch (err) {
      const error = err.response?.data?.message || err.response?.message || "Failed to delete GTM ID";
      return [null, error];
    }
  },
});

export default gtmStore;
