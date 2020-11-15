import axios from 'axios';

export function fetchResources() {
  return axios.get('/api/resources').then((res) => res.data);
}

export function updateResource(id, resource) {
  return axios
    .patch(`/api/resources/${id}asasdas`, resource)
    .then((res) => res.data);
}
