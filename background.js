/* globals browser */

const excludedFolders = [
  'drafts',
  'sent',
  'trash',
  'templates',
  'archives',
  'junk',
  'outbox',
];

browser.seturgent.onMessageArrived.addListener(function(messageHeader) {
  if (!excludedFolders.includes(messageHeader.folder.type))
    getAttention();
});

function getAttention() {
  browser.tabs.query({mailTab: true}).then(tabs => {
    if (tabs.length)
      browser.windows.update(tabs[0].windowId, {drawAttention: true});
  });
}

