import { defineStore } from 'pinia';
import { ref } from 'vue';

const useErrorStore = defineStore('error', () => {
  const errors = ref<null | string>(null);
  const setError = (error: unknown) => {
    if (error instanceof Error) {
      errors.value = error.message;
    } else if (typeof error === 'string') {
      errors.value = error;
    } else {
      errors.value = 'An error occured';
    }
  };

  return {
    errors,
    setError,
  };
});

export default useErrorStore;
