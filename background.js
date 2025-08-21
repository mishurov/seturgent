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


browser.messages.onNewMailReceived.addListener((folder, messages) => {
  if (!excludedFolders.includes(folder.type))
    getAttention();
});


function getAttention() {
  browser.mailTabs.query({}).then(tabs => {
    if (tabs.length)
      browser.windows.update(tabs[0].windowId, {drawAttention: true, focused: true});
  });
}
