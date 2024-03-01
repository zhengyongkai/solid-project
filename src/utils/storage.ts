export function getStorage<T>(key: string, parse: boolean = false): T {
  let storage = localStorage.getItem(key) || '';
  if (parse) {
    return JSON.parse(storage);
  }
  return storage as T;
}
