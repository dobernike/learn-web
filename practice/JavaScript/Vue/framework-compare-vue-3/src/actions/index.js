import axios from 'axios';

export function fetchResources() {
  return axios.get('/api/resources').then((res) => res.data);
}

export function updateResourceApi(id, resource) {
  return axios
    .patch(`/api/resources/${id}`, resource)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error?.response?.data));
}

export function deleteResourceApi(id) {
  return axios
    .delete(`/api/resources/${id}`)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error?.response?.data));
}
