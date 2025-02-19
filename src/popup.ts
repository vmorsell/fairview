import './popup.scss';

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('blur-toggle') as HTMLInputElement;

  if (!toggle) {
    console.error('toggle element not found');
    return;
  }

  chrome.storage.sync.get('blurEnabled', (data) => {
    if (chrome.runtime.lastError) {
      console.error('get blurEnabled:', chrome.runtime.lastError.message);
      return;
    }

    toggle.checked = data.blurEnabled ?? false;
  });

  toggle.addEventListener('change', () => {
    const enabled: boolean = toggle.checked;

    chrome.storage.sync.set({ blurEnabled: enabled }, () => {
      if (chrome.runtime.lastError) {
        console.error('save blurEnabled:', chrome.runtime.lastError.message);
        return;
      }
    });
  });
});
