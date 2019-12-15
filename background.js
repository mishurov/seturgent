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


browser.seturgent.onMessageArrived.addListener(messageHeader => {
  if (!excludedFolders.includes(messageHeader.folder.type))
    getAttention();
});


function getAttention() {
  browser.mailTabs.query({}).then(tabs => {
    if (tabs.length)
      browser.windows.update(tabs[0].windowId, {drawAttention: true});
  });
}
