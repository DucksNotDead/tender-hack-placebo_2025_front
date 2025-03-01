import axios from 'axios';

const api = axios.create({
  baseURL: 'http://176.48.5.131:8000/api',
});

export { api };
