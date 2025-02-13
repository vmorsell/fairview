import './content.scss';

function applyBlur(enabled: boolean): void {
  const className = 'blur-active';

  if (!document.body) {
    console.error('document body not available');
    return;
  }

  document.body.classList.toggle(className, enabled);
}

// Load initial state
chrome.storage.sync.get('blurEnabled', (data) => {
  applyBlur(data.blurEnabled ?? false);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.blurEnabled) {
    applyBlur(changes.blurEnabled.newValue);
  }
});
