import { onMounted, ref, type Ref } from 'vue';

const useQuery = <T>(callback: () => Promise<T>) => {
  const data: Ref<T | null, T | null> = ref(null);
  const loading = ref(true);
  const error = ref<null | string>(null);

  const getData = async () => {
    try {
      const response = await callback();
      data.value = response;
    } catch (err) {
      //narrowing
      if (err instanceof Error) {
        error.value = err.message;
      } else if (typeof err === 'string') {
        error.value = err;
      } else {
        error.value = 'An error occured';
      }
    }
    loading.value = false;
  };

  onMounted(() => {
    getData();
  });

  return {
    data,
    loading,
    error,
  };
};

export default useQuery;
