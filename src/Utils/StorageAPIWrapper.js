export const StorageAPIWrapper = (storage) => {

  const openStore = async (options) => {
    try {
      await storage.openStore(options);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
  const deleteStore = async (options) => {
    try {
      await storage.deleteStore(options);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  const clear = async () => {
    console.log("in clear")
    try {
      await storage.clear();
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
  const setItem = async (key, value) => {
    try {
      await storage.set({ key, value });
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
  const getItem = async (key) => {
    try {
      const {value} = await storage.get({ key });
      return Promise.resolve(value);
    } catch (err) {
      return Promise.reject(err);
    }

  }
  const setTable = async (table) => {
    try {
      await storage.setTable({ table });
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }

  }
  const getAllKeys = async () => {
    try {
      const {keys} = await storage.getAllKeys();
      return Promise.resolve(keys);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  const getAllValues = async () => {
    try {
      const {values} = await storage.getAllValues();
      return Promise.resolve(values);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  const getAllKeysValues = async () => {
    try {
      const {keysvalues} = await storage.getAllKeysValues();
      return Promise.resolve(keysvalues);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  const getFilterValues = async (filter) => {
    try {
      const {values} = await storage.getFilterValues({filter});
      return Promise.resolve(values);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  const isKey = async (key) => {
    try {
      const {result} = await storage.iskey({ key });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }

  }
  const removeItem = async (key) => {
    try {
      await storage.removeItem({ key });
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }

  }

  return {openStore, clear, setItem, getItem, setTable, getAllKeys,
          getAllValues, getFilterValues, getAllKeysValues, isKey,
          removeItem, deleteStore};
}
