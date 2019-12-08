/* globals ChromeUtils */
var { ExtensionCommon } = ChromeUtils.import("resource://gre/modules/ExtensionCommon.jsm");
var { MailServices } = ChromeUtils.import("resource:///modules/MailServices.jsm");


// eslint-disable-next-line no-unused-vars
var seturgent = class extends ExtensionCommon.ExtensionAPI {
  getAPI(context) {
    return {
      seturgent: {
        onMessageArrived: new ExtensionCommon.EventManager({
          context,
          name: "seturgent.onMessageArrived",
          register(fire) {
            function callback(event, aMsgHdr) {
              const messageHeader = context.extension.messageManager.convert(aMsgHdr);
              return fire.async(messageHeader);
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
    this.notificationService = MailServices.mfn;
    this.msgListener = {
      msgAdded: function(aMsgHdr) {
        messageListener.emit("message-arrived", aMsgHdr);
      }
    };
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
