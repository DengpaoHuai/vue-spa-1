export const getData = async (page: number) => {
  const response = await fetch('https://swapi.dev/api/planets?page=' + page);
  const data = await response.json();
  return data;
};
