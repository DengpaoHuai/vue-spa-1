import axios from 'axios';

export const crudcrud = axios.create({
  baseURL: 'https://crudcrud.com/api/' + import.meta.env.VITE_CRUDCRUD_KEY,
});

crudcrud.interceptors.response.use(
  resp => resp,
  err => {
    if (err.response.status === 401) {
      window.location.href = '/login';
    }
    if (err.response.status === 404) {
      return Promise.reject(new Error('Resource not found'));
    }
    return Promise.reject(err);
  },
);
