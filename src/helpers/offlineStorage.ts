import * as localForage from "localforage";
import { StorageKeys } from "constants/localStorage";

export default class OfflineStorage {
  static setItem<Item>(
    key: StorageKeys,
    value: Item | null | undefined
  ): Promise<void> | Promise<Item> {
    if (value === null || value === undefined) {
      return localForage.removeItem(key);
    }
    return localForage.setItem(key, value);
  }

  static getItem<Item>(key: StorageKeys): Promise<Item | null> {
    return localForage.getItem(key);
  }

  static removeItem(key: StorageKeys): Promise<void> {
    return localForage.removeItem(key);
  }
}
