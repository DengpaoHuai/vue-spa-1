import { deleteCarById, getCars } from '@/services/cars.service';
import type { Car } from '@/types/cars';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import useError from '@/composables/useError';

export const useCarStore = defineStore(
  'car',
  () => {
    const cars = ref<Car[]>([]);
    const loading = ref(true);
    const error = ref<null | string>(null);
    const errorStore = useError();

    onMounted(() => {
      getCars()
        .then(carsList => {
          cars.value = carsList;
        })
        .catch(err => {
          if (err instanceof Error) {
            error.value = err.message;
          } else if (typeof err === 'string') {
            error.value = err;
          } else {
            error.value = 'An error occured';
          }
        })
        .finally(() => {
          loading.value = false;
        });
    });

    const addCarToStore = (car: Car) => {
      cars.value.push(car);
    };

    const setAllCars = (carsList: Car[]) => {
      cars.value = carsList;
    };

    const deleteCar = async (id: string) => {
      try {
        console.log('deleteCar');
        await deleteCarById(id);
        cars.value = cars.value.filter(car => car._id !== id);
      } catch (error) {
        errorStore.setError(error);
      }
    };

    return {
      cars,
      loading,
      error,
      addCarToStore,
      setAllCars,
      deleteCar,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ['cars'],
    },
  },
);
