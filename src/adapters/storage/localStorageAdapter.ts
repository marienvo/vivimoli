import type { StoragePort } from "@engine/ports/storagePort";

export function createLocalStorageAdapter(namespace: string): StoragePort {
  const prefixed = (key: string): string => `${namespace}:${key}`;

  return {
    get(key) {
      return localStorage.getItem(prefixed(key));
    },
    set(key, value) {
      localStorage.setItem(prefixed(key), value);
    },
    remove(key) {
      localStorage.removeItem(prefixed(key));
    },
  };
}
