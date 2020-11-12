import axios from 'axios';

export function getResources() {
  return axios
    .get('http://localhost:3000/api/resources')
    .then((res) => res.data);
}

export function updateResourceApi(resourceId, resourceData) {
  return axios
    .patch(`http://localhost:3000/api/resources/${resourceId}`, resourceData)
    .then((res) => res.data);
}
