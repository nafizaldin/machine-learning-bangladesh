"use client";
import { proxy } from "valtio";
import $axios from "../_api/axios";

const fbPixelStore = proxy({
  fbPixel: {
    data: null,
    error: null,
    loading: false,
  },

  async getFbPixel() {
    fbPixelStore.fbPixel.loading = true;
    try {
      const res = await $axios.get("/v1/fb-pixel/all");
      const items = res.data?.data || [];
      fbPixelStore.fbPixel.data = items.length > 0 ? items[0] : null;
      fbPixelStore.fbPixel.error = null;
    } catch (err) {
      fbPixelStore.fbPixel.error =
        err.response?.data?.message || "Failed to fetch Facebook Pixel ID";
    } finally {
      fbPixelStore.fbPixel.loading = false;
    }
  },

  async createFbPixel(payload) {
    try {
      const res = await $axios.post("/v1/fb-pixel/create", payload);
      fbPixelStore.fbPixel.data = res.data.data;
      return [res.data, null];
    } catch (err) {
      const error = err.response?.data?.message || "Failed to create Facebook Pixel ID";
      return [null, error];
    }
  },

  async updateFbPixel(id, payload) {
    try {
      const res = await $axios.put(`/v1/fb-pixel/update/${id}`, payload);
      fbPixelStore.fbPixel.data = res.data.data;
      return [res.data, null];
    } catch (err) {
      const error = err.response?.data?.message || "Failed to update Facebook Pixel ID";
      return [null, error];
    }
  },

  async deleteFbPixel(id) {
    try {
      const res = await $axios.delete(`/v1/fb-pixel/delete/${id}`);
      fbPixelStore.fbPixel.data = null;
      return [res.data, null];
    } catch (err) {
      const error =
        err.response?.data?.message ||
        err.response?.message ||
        "Failed to delete Facebook Pixel ID";
      return [null, error];
    }
  },
});

export default fbPixelStore;
