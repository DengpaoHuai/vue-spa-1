import { reactive } from 'vue';

type ErrorComposable = {
  error: string | null;
};

const errors = reactive<ErrorComposable>({
  error: null,
});

const useError = () => {
  const setError = (error: unknown) => {
    if (error instanceof Error) {
      errors.error = error.message;
    } else if (typeof error === 'string') {
      errors.error = error;
    } else {
      errors.error = 'An error occured';
    }
  };

  return {
    errors,
    setError,
  };
};

export default useError;
