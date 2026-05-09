import { proxy } from "valtio";
import $axios from '../_api/axios'
const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
const _signature = process.env.NEXT_PUBLIC_SIGN || '';

const caseStudyStore = proxy({
  projects: {
    data: [],
    error: null,
    requestsMade: 0,
    creationStatus: { success: false, error: '' },
  },


  //--------------------------------------------------------------------------------------------------
  // Get all projects
  async getAllProjects() {
    let response = [];
    try {
      const result = await $axios.get(`/v1/projects`);
      const { data } = result.data;
      if (data) {
        response = [data, null];
      }
    } catch (err) {
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      response = [null, error];
    } finally {
      caseStudyStore.projects.requestsMade += 1;
      return response;
    }
  },

  async getAllAdminProjects() {
    let response = [];
    try {
      const result = await $axios.get(`/v1/projects/admin`);
      const { data } = result.data;
      if (data) {
        response = [data, null];
      }
    } catch (err) {
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      response = [null, error];
    } finally {
      caseStudyStore.projects.requestsMade += 1;
      return response;
    }
  },
  // Get single project
  async getProject(id) {
    let response = [];
    try {
      const result = await $axios.get(`/v1/projects/${id}`);
      const { data } = result.data;
      if (data) {
        caseStudyStore.projects = { ...caseStudyStore.projects, data, error: null };
        response = [data, null];
      }
    } catch (err) {
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      caseStudyStore.projects = { ...caseStudyStore.projects, data: [], error };
      response = [null, error];
    } finally {
      caseStudyStore.projects.requestsMade += 1;
      return response;
    }
  },

  // Create project
  async createProject(payload) {
    caseStudyStore.projects.creationStatus = { success: false, error: '' };
    let resp = [];
    try {
      const response = await $axios.post('/v1/projects', payload);
      caseStudyStore.projects.creationStatus = { success: true, error: '' };
      resp = [response.data, null];
    } catch (err) {
      caseStudyStore.projects.creationStatus = {
        success: false,
        error: err.response?.message || err.response?.data?.message || 'Failed to create project'
      };
      resp = [null, err.response?.message || err.response?.data?.message || 'Failed to create project'];
    } finally {
      return resp;
    }
  },

  // Update project
  async updateProject(id, payload) {
    let response = [];
    try {
      const result = await $axios.put(`/v1/projects/${id}`, payload);
      const { data } = result.data;
      if (data) {
        caseStudyStore.projects = { ...caseStudyStore.projects, data, error: null };
        response = [data, null];
      }
    } catch (err) {
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      caseStudyStore.projects = { ...caseStudyStore.projects, data: [], error };
      response = [null, error];
    } finally {
      caseStudyStore.projects.requestsMade += 1;
      return response;
    }
  },

  // Delete project
  async deleteProject(id) {
    let response = [];
    try {
      const result = await $axios.delete(`/v1/projects/${id}`);
      response = [result.data, null];
    } catch (err) {
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      response = [null, error];
    } finally {
      return response;
    }
  },

  // Get project comments
  async getProjectComments(id) {
    let response = [];
    try {
      const result = await $axios.get(`/v1/projects/${id}/comments`);
      response = [result.data, null];
    } catch (err) {
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      response = [null, error];
    } finally {
      return response;
    }
  },

  // Make comment
  async makeComment(id, payload) {
    let response = [];
    try {
      const result = await $axios.post(`/v1/projects/${id}/comments`, payload);
      response = [result.data, null];
    } catch (err) {
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      response = [null, error];
    } finally {
      return response;
    }
  },

  // Update comment
  async updateComment(projectId, commentId, payload) {
    let response = [];
    try {
      const result = await $axios.put(`/v1/projects/${projectId}/comments/${commentId}`, payload);
      response = [result.data, null];
    } catch (err) {
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      response = [null, error];
    } finally {
      return response;
    }
  },

  // Delete comment
  async deleteComment(projectId, commentId) {
    let response = [];
    try {
      const result = await $axios.delete(`/v1/projects/${projectId}/comments/${commentId}`);
      response = [result.data, null];
    } catch (err) {
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      response = [null, error];
    } finally {
      return response;
    }
  },

  // Create testimonial
  async createTestimonial(projectId, payload) {
    let response = [];
    try {
      const result = await $axios.post(`/v1/projects/${projectId}/testimonials`, payload);
      response = [result.data, null];
    } catch (err) {
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      response = [null, error];
    } finally {
      return response;
    }
  },

  // Get testimonials
  async getTestimonials(projectId) {
    let response = [];
    try {
      const result = await $axios.get(`/v1/projects/${projectId}/testimonials`);
      response = [result.data, null];
    } catch (err) {
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      response = [null, error];
    } finally {
      return response;
    }
  },

  // Delete testimonial
  async deleteTestimonial(projectId, testimonialId) {
    let response = [];
    try {
      const result = await $axios.delete(`/v1/projects/${projectId}/testimonials/${testimonialId}`);
      response = [result.data, null];
    } catch (err) {
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      response = [null, error];
    } finally {
      return response;
    }
  },

  // Update view
  async updateView(id) {
    let response = [];
    try {
      const result = await $axios.put(`/v1/projects/${id}/view`);
      response = [result.data, null];
    } catch (err) {
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      response = [null, error];
    } finally {
      return response;
    }
  },

  // Like project
  async likeProject(id) {
    let response = [];
    try {
      const result = await $axios.put(`/v1/projects/${id}/like`);
      response = [result.data, null];
    } catch (err) {
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      response = [null, error];
    } finally {
      return response;
    }
  },

  // Dislike project
  async dislikeProject(id) {
    let response = [];
    try {
      const result = await $axios.put(`/v1/projects/${id}/dislike`);
      response = [result.data, null];
    } catch (err) {
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      response = [null, error];
    } finally {
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

  reset() {
    caseStudyStore.projects = {
      data: [],
      error: null,
      requestsMade: 0
    };
  }
});

export default caseStudyStore;