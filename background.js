function getAttention() {
  browser.windows.getLastFocused({windowTypes: ['normal']}).then(recentWindow => {
    if (recentWindow) {
      browser.windows.update(recentWindow.id, {drawAttention: true});
    }
  });
}

browser.seturgent.onMessage.addListener(function() {
  getAttention();
});
