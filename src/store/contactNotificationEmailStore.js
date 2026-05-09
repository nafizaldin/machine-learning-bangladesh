"use client";
import { proxy } from "valtio";
import $axios from "../_api/axios";

const contactNotificationEmailStore = proxy({
  list: [],
  loading: false,
  error: null,
  adding: false,

  async getList() {
    contactNotificationEmailStore.loading = true;
    contactNotificationEmailStore.error = null;
    try {
      const res = await $axios.get("/v1/contact-notification-emails");
      contactNotificationEmailStore.list = res.data?.data || [];
    } catch (err) {
      contactNotificationEmailStore.error =
        err.response?.data?.message || "Failed to load notification emails";
      contactNotificationEmailStore.list = [];
    } finally {
      contactNotificationEmailStore.loading = false;
    }
  },

  async addEmail(email) {
    if (!email?.trim()) return [null, "Email is required"];
    contactNotificationEmailStore.adding = true;
    contactNotificationEmailStore.error = null;
    try {
      const res = await $axios.post("/v1/contact-notification-emails", {
        email: email.trim(),
      });
      await contactNotificationEmailStore.getList();
      return [res.data, null];
    } catch (err) {
      const error =
        err.response?.data?.message || "Failed to add email";
      return [null, error];
    } finally {
      contactNotificationEmailStore.adding = false;
    }
  },

  async deleteEmail(id) {
    try {
      await $axios.delete(`/v1/contact-notification-emails/${id}`);
      contactNotificationEmailStore.list = contactNotificationEmailStore.list.filter(
        (item) => item._id !== id
      );
      return [true, null];
    } catch (err) {
      const error =
        err.response?.data?.message || "Failed to remove email";
      return [null, error];
    }
  },
});

export default contactNotificationEmailStore;
