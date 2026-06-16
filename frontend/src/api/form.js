import axios from 'axios';

const API_BASE_URL = '/api/v1/forms';

export function getForms() {
  return axios.get(API_BASE_URL);
}

export function getFormById(id) {
  return axios.get(`${API_BASE_URL}/${id}`);
}

export function createForm(form) {
  return axios.post(API_BASE_URL, form);
}

export function updateForm(id, form) {
  return axios.put(`${API_BASE_URL}/${id}`, form);
}

export function deleteForm(id) {
  return axios.delete(`${API_BASE_URL}/${id}`);
}

// New export for batch archive
export function archiveBatch(payload) {
  return axios.post(`${API_BASE_URL}/archive-batch`, payload);
}