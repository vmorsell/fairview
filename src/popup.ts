import './popup.scss';
import browserAPI from './browser-api';

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('blur-toggle') as HTMLInputElement;

  if (!toggle) {
    console.error('toggle element not found');
    return;
  }

  // Load initial state
  browserAPI.storage.sync.get('blurEnabled').then((data: any) => {
    if (browserAPI.runtime.lastError) {
      console.error('Error loading blurEnabled:', browserAPI.runtime.lastError);
      return;
    }
    toggle.checked = data.blurEnabled ?? false;
  });

  // Handle toggle changes
  toggle.addEventListener('click', () => {
    const enabled = toggle.checked;

    browserAPI.storage.sync.set({ blurEnabled: enabled }).then(() => {
      if (browserAPI.runtime.lastError) {
        console.error('Error saving blurEnabled:', browserAPI.runtime.lastError);
        return;
      }
    });
  });
});
