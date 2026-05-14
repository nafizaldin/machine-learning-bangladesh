import { proxy } from "valtio";
import $axios from "../_api/axios";

const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
const _signature = process.env.NEXT_PUBLIC_SIGN || "";

const utilStore = proxy({
  utils: {
    data: [],
    error: null,
    requestsMade: 0,
    creationStatus: { success: false, error: "" },
  },
  contacts: {
    data: [],
    error: null,
    requestsMade: 0,
    creationStatus: { success: false, error: "" },
  },

  // -----------------------------------------------------------------------------------------
  // Server-side-ish fetch
//   async getResourceFetch(idOrSlug = "") {
//     let response = [];

//     try {
//       const result = await fetch(`${baseurl}/api/v1/resources/${idOrSlug}`, {
//         cache: "no-store",
//         headers: {
//           "x-client-sign": _signature,
//         },
//       });

//       if (!result.ok) throw new Error("Failed to fetch Resource");

//       const d = await result.json();

//       if (d) {
//         // keep same shape as blogStore: store the fetched object on resources.data
//         utilStore.resources = { ...utilStore.resources, data: d.data || d, error: null };
//         response = [d.data || d, null];
//       }
//     } catch (err) {
//       console.error("getResourceFetch error:", err);
//       const error =
//         err.response?.message || err.response?.data?.message || err.message || "Something went wrong";
//       utilStore.resources = { ...utilStore.resources, data: [], error };
//       response = [null, error];
//     } finally {
//       utilStore.resources.requestsMade += 1;
//       return response;
//     }
//   },

  async getAllNewsletterSubscribers(query = "") {
    let response = [];
    try {
      // query example: ?page=1&limit=20 or ?tags=foo,bar
      const result = await $axios.get(`/v1/newsletter${query}`);
      const data = result.data;

      if (data) {
        // don't automatically write to store list (same pattern as blogStore.getAllBlogs)
        response = [data, null];
      }
    } catch (err) {
      console.error("get all newsletter subscribers error:", err);
      const error =
        err.response?.message || err.response?.data?.message || "Something went wrong";
      response = [null, error];
    } finally {
      utilStore.utils.requestsMade += 1;
      return response;
    }
  },

  async createNewNewsletterSubscriber(subscriberData) {
    let response = [];
    try {
      const result = await $axios.post(`/v1/newsletter`, subscriberData);
      const data = result.data;

      if (data) {
        utilStore.utils.creationStatus = { success: true, error: "" };
        response = [data, null];
      }
    } catch (err) {
      console.error("create new newsletter subscriber error:", err);
      const error =
        err.response?.message || err.response?.data?.message || "Something went wrong";
      utilStore.utils.creationStatus = { success: false, error };
      response = [null, error];
    } finally {
      utilStore.utils.requestsMade += 1;
      return response;
    }
  },

  async createNewContact(contactData) {
    let response = [];
    try {
      const result = await $axios.post(`/v1/contact-us`, contactData);
      const data = result.data;

      if (data) {
        utilStore.contacts.creationStatus = { success: true, error: "" };
        response = [data, null];
      }
    } catch (err) {
      console.error("create new contact error:", err);
      const error =
        err.response?.message || err.response?.data?.message || "Something went wrong";
      utilStore.contacts.creationStatus = { success: false, error };
      response = [null, error];
    } finally {
      utilStore.contacts.requestsMade += 1;
      return response;
    }
  },

  async getAllContacts(query = "") {
    let response = [];
    try {
      const result = await $axios.get(`/v1/contact-us${query ? `?${query}` : ""}`);
      const data = result.data;

      if (data) {
        response = [data, null];
      }
    } catch (err) {
      console.error("get all contacts error:", err);
      const error =
        err.response?.message || err.response?.data?.message || "Something went wrong";
      response = [null, error];
    } finally {
      utilStore.contacts.requestsMade += 1;
      return response;
    }
  },

  async getContactById(id) {
    let response = [];
    try {
      const result = await $axios.get(`/v1/contact-us/${id}`);
      const data = result.data?.data ?? result.data;
      if (data) response = [data, null];
      else response = [null, "Contact not found"];
    } catch (err) {
      console.error("get contact by id error:", err);
      const error =
        err.response?.data?.message || err.response?.message || "Something went wrong";
      response = [null, error];
    }
    return response;
  },

  async updateContactRead(id, read) {
    let response = [];
    try {
      const result = await $axios.patch(`/v1/contact-us/${id}`, { read });
      const data = result.data?.data ?? result.data;
      if (data) response = [data, null];
      else response = [null, "Failed to update"];
    } catch (err) {
      console.error("update contact read error:", err);
      const error =
        err.response?.data?.message || err.response?.message || "Something went wrong";
      response = [null, error];
    }
    return response;
  },

  async replyToContact(id, message) {
    let response = [];
    try {
      const result = await $axios.post(`/v1/contact-us/${id}/reply`, { message });
      const data = result.data?.data ?? result.data;
      if (data) response = [data, null];
      else response = [null, "Failed to send reply"];
    } catch (err) {
      console.error("reply to contact error:", err);
      const error =
        err.response?.data?.message || err.response?.message || "Something went wrong";
      response = [null, error];
    }
    return response;
  },

  async deleteContact(id) {
    let response = [];
    try {
      await $axios.delete(`/v1/contact-us/${id}`);
      response = [true, null];
    } catch (err) {
      console.error("delete contact error:", err);
      const error =
        err.response?.data?.message || err.response?.message || "Something went wrong";
      response = [null, error];
    }
    return response;
  },

  async updateNewsletterRead(id, read) {
    let response = [];
    try {
      const result = await $axios.patch(`/v1/newsletter/${id}`, { read });
      const data = result.data?.data ?? result.data;
      if (data) response = [data, null];
      else response = [null, "Failed to update"];
    } catch (err) {
      console.error("update newsletter read error:", err);
      const error =
        err.response?.data?.message || err.response?.message || "Something went wrong";
      response = [null, error];
    }
    return response;
  },

  async deleteNewsletter(id) {
    let response = [];
    try {
      await $axios.delete(`/v1/newsletter/${id}`);
      response = [true, null];
    } catch (err) {
      console.error("delete newsletter error:", err);
      const error =
        err.response?.data?.message || err.response?.message || "Something went wrong";
      response = [null, error];
    }
    return response;
  },

  async usersForRoleList() {
    let response = [];
    try {
      const result = await $axios.get(`/v1/users/`);
      const data = result.data;

      if (data) {
        response = [data, null];
      }
    } catch (err) {
      console.error("get all usersForRoleList error:", err);
      const error =
        err.response?.message || err.response?.data?.message || "Something went wrong";
      response = [null, error];
    } finally {
      return response;
    }
  },

  async updateUserRole(id, payload) {
    let response = [];
    try {
      const result = await $axios.patch(`/v1/users/${id}`, payload);
      const data = result.data;

      if (data) {
        response = [data, null];
      }
    } catch (err) {
      console.error("get all updateUserRole error:", err);
      const error =
        err.response?.message || err.response?.data?.message || "Something went wrong";
      response = [null, error];
    } finally {
      return response;
    }
  },

  async updateUserProfile(id, payload) {
    let response = [];
    try {
      const result = await $axios.patch(`/v1/users/${id}`, payload);
      const data = result.data;
      if (data) response = [data, null];
      else response = [null, "Failed to update profile"];
    } catch (err) {
      const error = err.response?.data?.message || err.response?.message || "Something went wrong";
      response = [null, error];
    } finally {
      return response;
    }
  },

  async regenerateUserAvatar(id) {
    let response = [];
    try {
      const result = await $axios.patch(`/v1/users/${id}`, { resetAvatar: true });
      const data = result.data;
      if (data) response = [data, null];
      else response = [null, "Failed to regenerate avatar"];
    } catch (err) {
      const error = err.response?.data?.message || err.response?.message || "Something went wrong";
      response = [null, error];
    } finally {
      return response;
    }
  },

  async deleteUser(id) {
    let response = [];
    try {
      await $axios.delete(`/v1/users/${id}`);
      response = [true, null];
    } catch (err) {
      console.error("deleteUser error:", err);
      const error =
        err.response?.data?.message || err.response?.message || "Something went wrong";
      response = [null, error];
    } finally {
      return response;
    }
  },

  // -----------------------------------------------------------------------------------------
  // Reset store state
  reset() {
    utilStore.utils = {
      data: [],
      error: null,
      requestsMade: 0,
      creationStatus: { success: false, error: "" },
    };
    utilStore.contacts = {
      data: [],
      error: null,
      requestsMade: 0,
      creationStatus: { success: false, error: "" },
    };
  },
});

export default utilStore;
