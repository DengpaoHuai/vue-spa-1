import type { Car } from '@/types/cars';
import { defineStore } from 'pinia';

type CarState = {
  car: Car[];
};

const initialState = (): CarState => ({
  car: [],
});

export const useCarStore = defineStore('car', {
  state: initialState,
  getters: {
    getCars(state) {
      return state.car;
    },
  },
  actions: {
    addCarToStore(car: Car) {
      this.car.push(car);
    },
    setAllCars(cars: Car[]) {
      this.car = cars;
    },
  },
});
