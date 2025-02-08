chrome.runtime.onMessage.addListener((msg, _sender, _sendResponse) => {
  if (msg.action === 'toggleBlur') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0 || !tabs[0].id) {
        console.error('no active tab found');
        return;
      }

      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: () => document.readyState === 'complete',
        },
        (results) => {
          if (!results || !results[0]?.result) {
            console.error('content script not ready');
            return;
          }

          if (!tabs[0].id) {
            console.error('tab id not found');
            return;
          }

          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'applyBlur',
            enabled: msg.enabled,
          });
        }
      );
    });
  }
});
