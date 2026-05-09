import { proxy } from "valtio";
import $axios from '../_api/axios'
const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
const _signature = process.env.NEXT_PUBLIC_SIGN || '';

const blogStore = proxy({
  blogs: {
    data: [],
    error: null,
    requestsMade: 0,
    creationStatus: { success: false, error: '' },
  },


  //--------------------------------------------------------------------------------------------------
  async getBlogFetch(id) {
    let response = [];

    try {
      const result = await fetch(`${baseurl}/api/v1/blogs/${id}`, {
        cache: "no-store",
        headers: {
          'x-client-sign': _signature,
        }
      });

      if (!result.ok) throw new Error('Failed to fetch Blog');

      const d = await result.json();

      if (d) {
        blogStore.blogs = { ...blogStore.blogs, d, error: null };
        response = [d, null];
      }

    } catch (err) {
      console.log(err)
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      blogStore.blogs = { ...blogStore.blogs, data: [], error };
      response = [null, error];
    } finally {
      blogStore.blogs.requestsMade += 1;
      return response;
    }
  },

  async getAllBlogs() {
    let response = [];

    try {
      const result = await $axios.get(`/v1/blogs`);
      const { data } = result.data;

      if (data) {
        // blogStore.blogs = { ...blogStore.blogs, data: [...data], error: null };
        response = [data, null];
      }
    } catch (err) {
      console.log(err)
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      // blogStore.blogs = { ...blogStore.blogs, data: [], error };
      response = [null, error];
    } finally {
      blogStore.blogs.requestsMade += 1;
      return response;
    }
  },

    async getAllAdminBlogs() {
    let response = [];

    try {
      const result = await $axios.get(`/v1/blogs/admin`);
      const { data } = result.data;

      if (data) {
        // blogStore.blogs = { ...blogStore.blogs, data: [...data], error: null };
        response = [data, null];
      }
    } catch (err) {
      console.log(err)
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      // blogStore.blogs = { ...blogStore.blogs, data: [], error };
      response = [null, error];
    } finally {
      blogStore.blogs.requestsMade += 1;
      return response;
    }
  },
    

  async getBlog(id) {
    let response = [];

    try {
      const result = await $axios.get(`/v1/blogs/${id}`);
      const { data } = result.data;

      if (data) {
        blogStore.blogs = { ...blogStore.blogs, data, error: null };
        response = [data, null];
      }
    } catch (err) {
      console.log(err)
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      blogStore.blogs = { ...blogStore.blogs, data: [], error };
      response = [null, error];
    } finally {
      blogStore.blogs.requestsMade += 1;
      return response;
    }
  },

  async getBlogWithRelated(id) {
    let response = [];

    try {
      const result = await $axios.get(`/v1/blogs/${id}?q=related`);
      const payload = result.data; // expected { success, data, related }
      if (payload) {
        // update store.main data like getBlog does
        blogStore.blogs = { ...blogStore.blogs, data: payload.data || payload, error: null };
        response = [payload, null];
      } else {
        response = [null, 'No data'];
      }
    } catch (err) {
      console.error('getBlogWithRelated error:', err);
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      blogStore.blogs = { ...blogStore.blogs, data: [], error };
      response = [null, error];
    } finally {
      blogStore.blogs.requestsMade += 1;
      return response;
    }
  },

  async updateBlog(id, payload) {
    let response = [];

    try {
      const result = await $axios.put(`/v1/blogs/${id}`, payload);
      const { data } = result.data;

      if (data) {
        blogStore.blogs = { ...blogStore.blogs, data, error: null };
        response = [data, null];
      }
    } catch (err) {
      console.log(err)
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      blogStore.blogs = { ...blogStore.blogs, data: [], error };
      response = [null, error];
    } finally {
      blogStore.blogs.requestsMade += 1;
      return response;
    }
  },

  async createBlog(payload) {
    blogStore.creationStatus = { success: false, error: '' };
    let resp = [];

    try {
      const response = await $axios.post('/v1/blogs', payload);
      blogStore.creationStatus = { success: true, error: '' };
      resp = [response.data, null];
    } catch (err) {
      console.error('Error saving blog:', err.response?.data || err);
      blogStore.creationStatus = {
        success: false,
        error: err.response?.message || err.response?.data?.message || 'Failed to create blog'
      };
      resp = [null, err.response?.message || err.response?.data?.message || 'Failed to create blog'];
    } finally {
      return resp;
    }
  },

  async deleteBlog(id) {
  let response = [];

  try {
    const result = await $axios.delete(`/v1/blogs/${id}`);
    const { data } = result.data;

    // Successfully deleted
    response = [data, null];

    // Optionally: remove deleted blog from store list (if needed)
    blogStore.blogs.data = blogStore.blogs.data.filter(blog => blog._id !== id);

  } catch (err) {
    console.error("Delete Blog Error:", err);
    const error =
      err.response?.message ||
      err.response?.data?.message ||
      "Failed to delete blog";

    response = [null, error];
  } finally {
    blogStore.blogs.requestsMade += 1;
    return response;
  }
},


  reset() {
    blogStore.blogs = {
      data: [],
      error: null,
      requestsMade: 0
    };
  }
});

export default blogStore;