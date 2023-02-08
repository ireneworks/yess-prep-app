export const getColumnCount = (width: number) => {
  if (width < 499) {
    return 1;
  } else if (width < 768) {
    return 2;
  }
  return 3;
};
