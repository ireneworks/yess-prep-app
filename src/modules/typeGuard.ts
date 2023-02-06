export const isEmpty = (target: unknown) => {
  if (typeof target === "object") {
    if (Array.isArray(target)) {
      return target.length === 0;
    }
    if (target === null) {
      return false;
    }
    return Object.keys(target).length === 0;
  }
  return !!target;
};
