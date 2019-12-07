var { ExtensionCommon } = ChromeUtils.import("resource://gre/modules/ExtensionCommon.jsm");
var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

var msgListener = {
  msgAdded: function(aMsgHdr) {
    processNewMail(aMsgHdr);
  }
};


function processNewMail(aMsgHdr) {
  if (!aMsgHdr.isRead && needsAttention(aMsgHdr.folder)) {
    var recentWindow = Services.wm.getMostRecentWindow("mail:3pane");
    if (recentWindow) {
      recentWindow.getAttention();
    }
  }
}


function needsAttention(folder) {
  var flag = Ci.nsMsgMessageFlags;
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


var seturgent = class extends ExtensionCommon.ExtensionAPI {
  getAPI(context) {
    return {
      seturgent: {
        async start() {
          var notificationService = Cc["@mozilla.org/messenger/msgnotificationservice;1"]
                .getService(Ci.nsIMsgFolderNotificationService);

          notificationService.addListener(msgListener, notificationService.msgAdded);
        },
      },
    };
  }
};
