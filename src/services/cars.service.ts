import { crudcrud } from './instances/crudcrud';
import type { Car } from '@/types/cars';

const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getCars = async () => {
  await waitFor(2000);
  const response = await crudcrud.get('/cars');
  return response.data as Car[];
};

export const postCar = async (car: Omit<Car, '_id'>) => {
  const response = await crudcrud.post('/cars', car);
  return response.data;
};

export const deleteCarById = async (id: string) => {
  const response = await crudcrud.delete(`/cars/${id}`);
  return response.data;
};

export const putCard = async (id: string, car: Omit<Car, '_id'>) => {
  await crudcrud.put(`/cars/${id}`, car);
  return id;
};
