import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3333',
});

export default client;
