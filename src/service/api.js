import { config } from 'dotenv';
import axios from 'axios';
config();

const api = axios.create({
  baseURL: 'http://localhost:3005/',
});

export { api };
