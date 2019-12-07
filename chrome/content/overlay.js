window.addEventListener("load", function(e) { 
  var notificationService = Components.classes["@mozilla.org/messenger/msgnotificationservice;1"]
    .getService(Components.interfaces.nsIMsgFolderNotificationService);
  notificationService.addListener(msgListener, notificationService.msgAdded);
}, false);

var msgListener = {
  msgAdded: function(aMsgHdr) {
    processNewMail(aMsgHdr);
  }
}

function processNewMail(aMsgHdr) {
  if (!aMsgHdr.isRead && needsAttention(aMsgHdr.folder)) {
      window.getAttention();
  }
}

function needsAttention(folder) {
  var flag = Components.interfaces.nsMsgMessageFlags;
  if (folder.isSpecialFolder(flag.Drafts,1) ||
      folder.isSpecialFolder(flag.SentMail,1) ||
      folder.isSpecialFolder(flag.Templates,1) ||
      folder.isSpecialFolder(flag.Archive,1) ||
      folder.isSpecialFolder(flag.Trash,1) ||
      folder.isSpecialFolder(flag.Queue,1) ||
      folder.isSpecialFolder(flag.Junk,1)) {
    return false;
  } else {
    return true;
  }
}
