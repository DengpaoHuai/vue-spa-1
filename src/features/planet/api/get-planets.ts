import swapi from '@/lib/swapi';
import type { PlanetResponse } from '@/types/planet';
import { queryOptions, useQuery } from '@tanstack/vue-query';
import type { Ref } from 'vue';

export const getPlanets = async (page: number) => {
  const response = await swapi.get('planets?page=' + page);
  return response.data as PlanetResponse;
};

export const planetsOptions = (page: Ref<number, number>) => {
  return queryOptions({
    queryKey: ['planets', page],
    queryFn: async () => getPlanets(page.value),
    staleTime: 2500,
    refetchOnWindowFocus: false,
  });
};

export const usePlanets = (page: Ref<number, number>) =>
  useQuery<PlanetResponse>({
    queryKey: ['planets', page],
    queryFn: async () => getPlanets(page.value),
    staleTime: 2500,
    refetchOnWindowFocus: false,
  });
