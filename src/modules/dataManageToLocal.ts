export const getLocalStorageByKey = (key: string) => {
  const data = localStorage.getItem(key);
  if (data !== null) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return;
    }
  }
};

export const setLocalStorage = (key: string, value: unknown) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
