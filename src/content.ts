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

  const classList = document.body.classList;

  if (enabled) {
    classList.add(className);
  } else {
    classList.remove(className);
  }
}

// Load initial state
chrome.storage.sync.get('blurEnabled', (data) => {
  applyBlur(data.blurEnabled ?? false);
});
