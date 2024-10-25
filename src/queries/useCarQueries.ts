import {
  deleteCarById,
  getCars,
  postCar,
  putCard,
} from '@/services/cars.service';
import type { Car } from '@/types/cars';
import { queryOptions, useMutation, useQueryClient } from '@tanstack/vue-query';

export const carQueryOptions = queryOptions({
  queryKey: ['cars'],
  queryFn: getCars,
  staleTime: 5 * 1000,
});

const useMutationCar = (successCallback?: () => void) => {
  const queryClient = useQueryClient();

  const createCar = useMutation({
    mutationFn: postCar,
    onSuccess: data => {
      queryClient.invalidateQueries(carQueryOptions);
      queryClient.setQueryData(['cars'], (oldData: Car[]) => {
        if (!oldData) return [data];
        return [...oldData, data];
      });
      if (successCallback) successCallback();
    },
  });

  const updateCar = useMutation({
    mutationFn: async ({ id, car }: { id: string; car: Omit<Car, '_id'> }) => {
      putCard(id, car);
    },
    onSuccess: (data, { id, car: updatedCar }) => {
      console.log(data);
      queryClient.setQueryData(['cars'], (oldData: Car[]) => {
        return oldData?.map(car =>
          car._id === id
            ? {
                ...updatedCar,
                _id: id,
              }
            : car,
        );
      });
      queryClient.invalidateQueries(carQueryOptions);
      if (successCallback) successCallback();
    },
  });

  const deleteCar = useMutation({
    mutationFn: deleteCarById,
    onMutate: id => {
      console.log(id);
      const previousData = queryClient.getQueryData<Car[]>(
        carQueryOptions.queryKey,
      );
      console.log(previousData);
      queryClient.setQueryData(['cars'], (oldData: Car[]) => {
        return oldData?.filter(car => car._id !== id) || [];
      });

      return { previousData };
    },
    onError: (err, variables, context) => {
      console.log(err);
      queryClient.setQueryData(['cars'], () => context?.previousData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(carQueryOptions);
    },
  });

  return {
    createCar,
    deleteCar,
    updateCar,
  };
};

export default useMutationCar;
