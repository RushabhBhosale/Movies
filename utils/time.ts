export const time = async <T>(
  label: string,
  fn: () => Promise<T>
): Promise<T> => {
  if (typeof window === "undefined") {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    console.log(`⏱️ ${label}: ${(end - start).toFixed(1)}ms`);
    return result;
  } else {
    return await fn();
  }
};
