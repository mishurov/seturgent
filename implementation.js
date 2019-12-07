var { ExtensionCommon } = ChromeUtils.import("resource://gre/modules/ExtensionCommon.jsm");
var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");


var seturgent = class extends ExtensionCommon.ExtensionAPI {
  getAPI(context) {
    return {
      seturgent: {
        async getAttention() {
          var recentWindow = Services.wm.getMostRecentWindow("mail:3pane");
          if (recentWindow) {
            recentWindow.getAttention();
          }
        },
        onMessage: new ExtensionCommon.EventManager({
          context,
          name: "seturgent.onMessage",
          register(fire) {
            function callback(event) {
              return fire.async();
            }

            messageListener.add(callback);
            return function() {
              messageListener.remove(callback);
            };
          },
        }).api(),
      },
    };
  }
};


var messageListener = new class extends ExtensionCommon.EventEmitter {
  constructor() {
    super();
    this.callbackCount = 0;
    this.notificationService = Cc["@mozilla.org/messenger/msgnotificationservice;1"]
      .getService(Ci.nsIMsgFolderNotificationService);

    var that = this;
    this.msgListener = {
      msgAdded: function(aMsgHdr) {
        that.processNewMail(aMsgHdr);
      }
    };
  }

  processNewMail(aMsgHdr) {
    if (!aMsgHdr.isRead && this.needsAttention(aMsgHdr.folder)) {
      messageListener.emit("message-arrived");
    }
  }

  needsAttention(folder) {
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

  add(callback) {
    this.on("message-arrived", callback);
    this.callbackCount++;

    if (this.callbackCount == 1) {
      this.notificationService.addListener(this.msgListener, this.notificationService.msgAdded);
    }
  }

  remove(callback) {
    this.off("message-arrived", callback);
    this.callbackCount--;

    if (this.callbackCount == 0) {
      this.notificationService.removeListener(this.msgListener);
    }
  }
};
