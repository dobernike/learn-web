import axios from 'axios';

export function fetchResources() {
  return axios.get('http://localhost:3001/api/resources');
}
