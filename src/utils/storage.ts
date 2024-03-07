export function getStorage<T>(key: string, parse: boolean = false): T {
  let storage = "";
  if (parse) {
    storage = localStorage.getItem(key) || "{}";
  } else {
    storage = localStorage.getItem(key) || "";
  }
  if (parse) {
    return JSON.parse(storage);
  }
  return storage as T;
}

export function setStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function clearStorage(key: string) {
  localStorage.removeItem(key);
}
