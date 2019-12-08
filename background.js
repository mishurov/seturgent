/* globals browser */

function getAttention() {
  browser.tabs.query({mailTab: true}).then(tabs => {
    if (tabs.length) {
      browser.windows.update(tabs[0].windowId, {drawAttention: true});
    }
  });
}

browser.seturgent.onMessage.addListener(function() {
  getAttention();
});
