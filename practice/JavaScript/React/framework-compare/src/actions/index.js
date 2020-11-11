import axios from 'axios';

export function getResources() {
  return axios.get('http://localhost:3001/api/resources');
}
