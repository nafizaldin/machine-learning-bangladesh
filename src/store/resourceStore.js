import { proxy } from "valtio";
import $axios from "../_api/axios";

const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
const _signature = process.env.NEXT_PUBLIC_SIGN || "";

const resourceStore = proxy({
  resources: {
    data: [],
    error: null,
    requestsMade: 0,
    creationStatus: { success: false, error: "" },
  },

  // -----------------------------------------------------------------------------------------
  // Server-side-ish fetch for a single resource (like your getBlogFetch)
  async getResourceFetch(idOrSlug = "") {
    let response = [];

    try {
      const result = await fetch(`${baseurl}/api/v1/resources/${idOrSlug}`, {
        cache: "no-store",
        headers: {
          "x-client-sign": _signature,
        },
      });

      if (!result.ok) throw new Error("Failed to fetch Resource");

      const d = await result.json();

      if (d) {
        // keep same shape as blogStore: store the fetched object on resources.data
        resourceStore.resources = { ...resourceStore.resources, data: d.data || d, error: null };
        response = [d.data || d, null];
      }
    } catch (err) {
      console.error("getResourceFetch error:", err);
      const error =
        err.response?.message || err.response?.data?.message || err.message || "Something went wrong";
      resourceStore.resources = { ...resourceStore.resources, data: [], error };
      response = [null, error];
    } finally {
      resourceStore.resources.requestsMade += 1;
      return response;
    }
  },

  // -----------------------------------------------------------------------------------------
  // GET all resources (supports query string externally)
  async getAllResources(query = "") {
    let response = [];
    try {
      // query example: ?page=1&limit=20 or ?tags=foo,bar
      const result = await $axios.get(`/v1/resources${query}`);
      const data = result.data;

      if (data) {
        // don't automatically write to store list (same pattern as blogStore.getAllBlogs)
        response = [data, null];
      }
    } catch (err) {
      console.error("getAllResources error:", err);
      const error =
        err.response?.message || err.response?.data?.message || "Something went wrong";
      response = [null, error];
    } finally {
      resourceStore.resources.requestsMade += 1;
      return response;
    }
  },


    async getAllAdminResources(query = "") {
    let response = [];
    try {
      // query example: ?page=1&limit=20 or ?tags=foo,bar
      const result = await $axios.get(`/v1/resources/admin${query}`);
      const data = result.data;

      if (data) {
        // don't automatically write to store list (same pattern as blogStore.getAllBlogs)
        response = [data, null];
      }
    } catch (err) {
      console.error("getAllResources error:", err);
      const error =
        err.response?.message || err.response?.data?.message || "Something went wrong";
      response = [null, error];
    } finally {
      resourceStore.resources.requestsMade += 1;
      return response;
    }
  },




  // -----------------------------------------------------------------------------------------
  // GET single resource (client)
  async getResource(idOrSlug, query = "") {
    let response = [];

    try {
      const result = await $axios.get(`/v1/resources/${idOrSlug}${query ? `?${query}` : ""}`);
      const data = result.data;

      if (data) {
        resourceStore.resources = { ...resourceStore.resources, data, error: null };
        response = [data, null];
      }
    } catch (err) {
      console.error("getResource error:", err);
      const error =
        err.response?.message || err.response?.data?.message || "Something went wrong";
      resourceStore.resources = { ...resourceStore.resources, data: [], error };
      response = [null, error];
    } finally {
      resourceStore.resources.requestsMade += 1;
      return response;
    }
  },

  // -----------------------------------------------------------------------------------------
  // CREATE resource
  async createResource(payload) {
    resourceStore.creationStatus = { success: false, error: "" };
    let resp = [];

    try {
      const response = await $axios.post("/v1/resources", payload);
      resourceStore.creationStatus = { success: true, error: "" };
      resp = [response.data, null];
    } catch (err) {
      console.error("Error creating resource:", err.response?.data || err);
      resourceStore.creationStatus = {
        success: false,
        error:
          err.response?.message || err.response?.data?.message || "Failed to create resource",
      };
      resp = [null, err.response?.message || err.response?.data?.message || "Failed to create resource"];
    } finally {
      return resp;
    }
  },

  // -----------------------------------------------------------------------------------------
  // UPDATE resource (idOrSlug)
  async updateResource(idOrSlug, payload) {
    let resp = [];
    try {
      const response = await $axios.put(`/v1/resources/${idOrSlug}`, payload);
      resp = [response.data, null];
    } catch (err) {
      console.error("updateResource error:", err.response?.data || err);
      const error =
        err.response?.message || err.response?.data?.message || "Failed to update resource";
      resp = [null, error];
    } finally {
      return resp;
    }
  },

  // -----------------------------------------------------------------------------------------
  // DELETE resource (idOrSlug)
  async deleteResource(idOrSlug) {
    let resp = [];
    try {
      const response = await $axios.delete(`/v1/resources/${idOrSlug}`);
      resp = [response.data, null];
    } catch (err) {
      console.error("deleteResource error:", err.response?.data || err);
      const error =
        err.response?.message || err.response?.data?.message || "Failed to delete resource";
      resp = [null, error];
    } finally {
      return resp;
    }
  },

  // -----------------------------------------------------------------------------------------
  // DOWNLOAD (POST) - enqueue email, record subscriber
  // body: { email, name? }
  async downloadResource(idOrSlug, payload /* { email, name? } */) {
    let resp = [];
    try {
      const response = await $axios.post(`/v1/resources/${idOrSlug}/download`, payload);
      resp = [response.data, null];
    } catch (err) {
      console.error("downloadResource error:", err.response?.data || err);
      const error =
        err.response?.message || err.response?.data?.message || "Failed to request download";
      resp = [null, error];
    } finally {
      return resp;
    }
  },

  // -----------------------------------------------------------------------------------------
  // DIRECT DOWNLOAD helper: returns the url (redirect or file) so frontend can handle navigation/download
  // This calls the GET download endpoint and returns the response (useful if your API returns redirect)
  async getDirectDownloadUrl(idOrSlug) {
    let resp = [];
    try {
      const response = await $axios.get(`/v1/resources/${idOrSlug}/download`, {
        // we expect a redirect or file; axios will follow redirects by default
        responseType: "arraybuffer", // if you want to fetch file contents, otherwise omit
      });
      // If it's a redirect or 200 with file, axios returns the response.
      resp = [response, null];
    } catch (err) {
      console.error("getDirectDownloadUrl error:", err.response?.data || err);
      const error =
        err.response?.message || err.response?.data?.message || "Failed to get download";
      resp = [null, error];
    } finally {
      return resp;
    }
  },

  // GET all subscribers (flattened across resources)
  // returns [ { success, total, page, limit, count, data: [...] }, error ]
  async getAllSubscribers(query = "") {
    let response = [];
    try {
      // NOTE: your API is /api/v1/resources/get/subscribers per your message.
      // axios base likely points to /api, so call /v1/resources/get/subscribers
      const result = await $axios.get(`/v1/resources/get/subscribers${query}`);
      const data = result.data;

      if (data) {
        // return the whole paginated response object
        response = [data, null];
      } else {
        response = [null, "No data"];
      }
    } catch (err) {
      console.error("getAllSubscribers error:", err);
      const error = err.response?.data?.message || err.response?.message || "Failed to load subscribers";
      response = [null, error];
    } finally {
      return response;
    }
  },

  // -----------------------------------------------------------------------------------------
  // Reset store state
  reset() {
    resourceStore.resources = {
      data: [],
      error: null,
      requestsMade: 0,
      creationStatus: { success: false, error: "" },
    };
  },
});

export default resourceStore;
