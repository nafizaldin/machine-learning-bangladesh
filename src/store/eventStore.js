import { proxy } from "valtio";
import $axios from '../_api/axios';

const eventStore = proxy({
  events: {
    data: [],
    error: null,
    requestsMade: 0,
  },

  async getAllEvents() {
    let response = [];
    try {
      const result = await $axios.get('/v1/events');
      const { data } = result.data;
      response = [data, null];
    } catch (err) {
      const error = err.response?.data?.message || err.message || 'Something went wrong';
      response = [null, error];
    } finally {
      eventStore.events.requestsMade += 1;
      return response;
    }
  },

  async getAllAdminEvents() {
    let response = [];
    try {
      const result = await $axios.get('/v1/events/admin');
      const { data } = result.data;
      response = [data, null];
    } catch (err) {
      const error = err.response?.data?.message || err.message || 'Something went wrong';
      response = [null, error];
    } finally {
      eventStore.events.requestsMade += 1;
      return response;
    }
  },

  async getEvent(id) {
    let response = [];
    try {
      const result = await $axios.get(`/v1/events/${id}`);
      const { data } = result.data;
      response = [data, null];
    } catch (err) {
      const error = err.response?.data?.message || err.message || 'Something went wrong';
      response = [null, error];
    } finally {
      return response;
    }
  },

  async createEvent(payload) {
    let response = [];
    try {
      const result = await $axios.post('/v1/events', payload);
      response = [result.data, null];
    } catch (err) {
      const error = err.response?.data?.message || err.message || 'Failed to create event';
      response = [null, error];
    } finally {
      return response;
    }
  },

  async updateEvent(id, payload) {
    let response = [];
    try {
      const result = await $axios.put(`/v1/events/${id}`, payload);
      response = [result.data, null];
    } catch (err) {
      const error = err.response?.data?.message || err.message || 'Failed to update event';
      response = [null, error];
    } finally {
      return response;
    }
  },

  async deleteEvent(id) {
    let response = [];
    try {
      const result = await $axios.delete(`/v1/events/${id}`);
      response = [result.data, null];
      eventStore.events.data = eventStore.events.data.filter(e => e._id !== id);
    } catch (err) {
      const error = err.response?.data?.message || err.message || 'Failed to delete event';
      response = [null, error];
    } finally {
      eventStore.events.requestsMade += 1;
      return response;
    }
  },

  reset() {
    eventStore.events = { data: [], error: null, requestsMade: 0 };
  },
});

export default eventStore;
