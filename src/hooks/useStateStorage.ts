import { useCallback, useEffect, useState } from "react";
import OfflineStorage from "helpers/offlineStorage";
import { StorageKeys } from "constants/localStorage";

type UseStateStorage<V> = [value: V, setValue: (newValue: V) => Promise<void>];

export default function useStateStorage<V>(
  key: StorageKeys,
  defaultValue: V
): UseStateStorage<V> {
  const [value, setState] = useState<V>(defaultValue);

  useEffect(() => {
    OfflineStorage.getItem<V>(key).then((store) => {
      if (store != null) {
        try {
          setState(JSON.parse(JSON.stringify(store)));
        } catch (err) {
          OfflineStorage.removeItem(key);
        }
      }
    });
  }, [key]);

  const setValue = useCallback(
    async (newValue: V) => {
      setState(newValue);
      await OfflineStorage.setItem(key, JSON.stringify(newValue));
    },
    [key]
  );

  return [value, setValue];
}
