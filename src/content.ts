import './content.scss';
import browserAPI from './browser-api';

function applyBlur(enabled: boolean): void {
  const className = 'blur-active';

  if (!document.body) {
    console.error('document body not available');
    return;
  }

  document.body.classList.toggle(className, enabled);
}

// Load initial state
browserAPI.storage.sync.get('blurEnabled').then((data: any) => {
  applyBlur(data.blurEnabled ?? false);
});

// Listen for storage changes
browserAPI.storage.onChanged.addListener((changes: any, area: string) => {
  if (area === 'sync' && 'blurEnabled' in changes) {
    applyBlur(changes.blurEnabled.newValue);
  }
});
