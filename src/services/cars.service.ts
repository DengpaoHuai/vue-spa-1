import { crudcrud } from './instances/crudcrud';

export const getCars = async () => {
  const response = await crudcrud.get('/cars');
  return response.data;
};

export const postCar = async car => {
  const response = await crudcrud.post('/cars', car);
  return response.data;
};
