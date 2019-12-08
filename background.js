/* globals browser */

function getAttention() {
  const getInfo = {populate: true, windowTypes: ['normal']};
  // should be getAll yet it throws an exception (bug) if a popup window is focused
  browser.windows.getLastFocused(getInfo).then(recentWindow => {
    if (recentWindow && recentWindow.tabs.some(t => t.mailTab)) {
      browser.windows.update(recentWindow.id, {drawAttention: true});
    }
  });
}

browser.seturgent.onMessage.addListener(function() {
  getAttention();
});
