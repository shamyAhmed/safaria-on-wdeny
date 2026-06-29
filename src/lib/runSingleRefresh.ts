let refreshPromise: Promise<any> | null = null;

export const runSingleRefresh = (fn: () => Promise<any>) => {
  if (!refreshPromise) {
    refreshPromise = fn().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};
