import './content.scss';

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'applyBlur') {
    applyBlur(msg.enabled);
  }
});

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
