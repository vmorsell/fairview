// Browser API compatibility layer
const browserAPI = {
  storage: {
    sync: {
      get: (keys: string | string[] | object | null) => {
        return new Promise((resolve) => {
          if (typeof browser !== 'undefined') {
            browser.storage.sync.get(keys).then(resolve);
          } else if (typeof chrome !== 'undefined') {
            chrome.storage.sync.get(keys, resolve);
          } else {
            console.error('No browser API available');
            resolve({});
          }
        });
      },
      set: (items: object) => {
        return new Promise<void>((resolve) => {
          if (typeof browser !== 'undefined') {
            browser.storage.sync.set(items).then(resolve);
          } else if (typeof chrome !== 'undefined') {
            chrome.storage.sync.set(items, () => resolve());
          } else {
            console.error('No browser API available');
            resolve();
          }
        });
      },
    },
    onChanged: {
      addListener: (callback: (changes: object, area: string) => void) => {
        if (typeof browser !== 'undefined') {
          browser.storage.onChanged.addListener(callback);
        } else if (typeof chrome !== 'undefined') {
          chrome.storage.onChanged.addListener(callback);
        } else {
          console.error('No browser API available for change listener');
        }
      },
    },
  },
  runtime: {
    lastError: typeof chrome !== 'undefined' ? chrome.runtime.lastError : undefined,
  },
};

export default browserAPI;
