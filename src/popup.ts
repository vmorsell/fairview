import './popup.scss';

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('blur-toggle') as HTMLInputElement;

  if (!toggle) {
    console.error('toggle element not found');
    return;
  }

  chrome.storage.sync.get('blurEnabled', (data) => {
    toggle.checked = data.blurEnabled ?? false;
  });

  toggle.addEventListener('change', () => {
    const enabled: boolean = toggle.checked;
    chrome.storage.sync.set({ blurEnabled: enabled });
    chrome.runtime.sendMessage({ action: 'toggleBlur', enabled });
  });
});
