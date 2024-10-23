import { onMounted, ref, type Ref } from 'vue';

const useFetch = <T>(url: string) => {
  const data: Ref<T | null, T | null> = ref(null);
  const loading = ref(true);
  const error = ref<null | string>(null);

  const getData = async () => {
    try {
      const response = await fetch(url);
      const results = await response.json();
      data.value = results;
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

export default useFetch;
