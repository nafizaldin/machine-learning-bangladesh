import { proxy } from "valtio";
import $axios from '../_api/axios'
const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
const _signature = process.env.NEXT_PUBLIC_SIGN || '';

const projectStore = proxy({
  projects: {
    data: [],
    project: null,
    error: null,
    requestsMade: 0,
  },

  async getAllProjects() {
    let response = [];

    try {
      const result = await $axios.get(`/v1/projects`);
      const { data } = result.data;

      if (data) {
        projectStore.projects = { ...projectStore.projects, data: [...data], error: null, requestsMade: projectStore.projects.requestsMade + 1 };
        response = [data, null];
      }
    } catch (err) {
      console.log(err)
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      projectStore.projects = { ...projectStore.projects, data: [], error, requestsMade: projectStore.projects.requestsMade + 1 };
      response = [null, error];
    } finally {
      projectStore.projects.requestsMade += 1;
      return response;
    }
  },

   async getAllAdminProjects() {
    let response = [];

    try {
      const result = await $axios.get(`/v1/projects/admin`);
      const { data } = result.data;

      if (data) {
        projectStore.projects = { ...projectStore.projects, data: [...data], error: null, requestsMade: projectStore.projects.requestsMade + 1 };
        response = [data, null];
      }
    } catch (err) {
      console.log(err)
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      projectStore.projects = { ...projectStore.projects, data: [], error, requestsMade: projectStore.projects.requestsMade + 1 };
      response = [null, error];
    } finally {
      projectStore.projects.requestsMade += 1;
      return response;
    }
  },

  async getSingleProject(slug) {
    let response = [];

    
    try {
      const result = await $axios.get(`/v1/projects/${slug}`);
      const { data } = result.data;

     

      if (data) {
        projectStore.projects = { ...projectStore.projects, project: data, error: null, requestsMade: projectStore.projects.requestsMade + 1 };
        response = [data, null];
      }
    } catch (err) {
      console.log(err)
      const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
      projectStore.projects = { ...projectStore.projects, project: null, error, requestsMade: projectStore.projects.requestsMade + 1 };
      response = [null, error];
    } finally {
      projectStore.projects.requestsMade += 1;
      return response;
    }
  },

  async loadProjectFromJson(slug) {
    try {
      const res = await fetch("/project.json");
      if (!res.ok) throw new Error("Failed to load project.json");

      const projects = await res.json();

      const project = projects.find((p) => p.slug == slug);
      console.log({
        slug, project, projects
      })

      if (!project) {
        this.projects = {
          data: [],
          error: "Project not found",
          requestsMade: this.projects.requestsMade,
        };
        return [null, "Project not found"];
      }

      this.projects = {
        data: project,
        error: null,
        requestsMade: this.projects.requestsMade + 1,
      };
      return [project, null];
    } catch (error) {
      this.projects = {
        data: [],
        error: error.message,
        requestsMade: this.projects.requestsMade + 1,
      };
      return [null, error.message];
    }
  },

  reset() {
    this.projects = { data: [], error: null, requestsMade: 0 };
  },
});

//--------------------------------------------------------------------------------------------------

//   async getProjectFetch(id = '6893e8b7e14a407efd6f13de') {

//   let response = [];

//   try {
//     const result = await fetch(`${baseurl}/api/v1/projects/${id}`, {
//       cache: "no-store",
//       headers: {
//         'x-client-sign': _signature,
//       }
//     });

//     if (!result.ok) throw new Error('Failed to fetch Project');

//     const d = await result.json();

//     if (d) {
//       projectStore.projects = { ...projectStore.projects, d, error: null };
//       response = [d, null];
//     }

//   } catch (err) {
//     console.log(err)
//     const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
//     projectStore.projects = { ...projectStore.projects, data: [], error };
//     response = [null, error];
//   } finally {
//     projectStore.projects.requestsMade += 1;
//     return response;
//   }
// },

// async getProject(id) {

//   let response = [];

//   try {
//     const result = await $axios.get(`/v1/projects/${id}`);
//     const { data } = result.data;

//     if (data) {
//       projectStore.projects = { ...projectStore.projects, data, error: null };
//       response = [data, null];
//     }
//   } catch (err) {
//     console.log(err)
//     const error = err.response?.message || err.response?.data?.message || 'Something went wrong';
//     projectStore.projects = { ...projectStore.projects, data: [], error };
//     response = [null, error];
//   } finally {
//     projectStore.projects.requestsMade += 1;
//     return response;
//   }
// },

// reset() {
//   projectStore.projects = {
//     data: [],
//     error: null,
//     requestsMade: 0
//   };
// }

export default projectStore;