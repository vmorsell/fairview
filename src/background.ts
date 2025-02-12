chrome.runtime.onMessage.addListener((msg, _sender, _sendResponse) => {
  if (msg.action === 'toggleBlur') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || tabs.length === 0 || !tabs[0].id) {
        console.error('no active tab found');
        return;
      }

      const tabId = tabs[0].id;
      chrome.scripting.executeScript(
        {
          target: { tabId },
          func: () => document.readyState === 'complete',
        },
        (results) => {
          if (chrome.runtime.lastError) {
            console.error('script execution error:', chrome.runtime.lastError.message);
            return;
          }

          if (!results || !results[0]?.result) {
            console.error('content script not ready');
            return;
          }

          chrome.tabs.sendMessage(tabId, {
            action: 'applyBlur',
            enabled: msg.enabled,
          });
        }
      );
    });
  }
});
