seturgent
=========

### For Thunderbird 68+

Sets the urgent flag (X11) of the Thunderbird window under Linux in case of new messages. Does ignore special folders like Drafts, Junk and such. 

[Version 5.0](https://github.com/mishurov/seturgent/tree/5.0) uses MailExtensions API. Since [onNewMailReceived](https://thunderbird-webextensions.readthedocs.io/en/latest/messages.html#onnewmailreceived-folder-messages) event had been implemented firstly in Thunderbird 75, this is the minimum Thunderbird version it supports.

[Version 4.0](https://github.com/mishurov/seturgent/tree/4.0) uses [WebExtension Experiment API](https://developer.thunderbird.net/add-ons/tb78) which is subject to change.

[Version 3.1](https://github.com/mishurov/seturgent/tree/3.1) uses the legacy API, it is guaranteed to work up to version 78.

The original addon: <https://addons.thunderbird.net/en-US/thunderbird/addon/seturgent-new/>

The .xpi files are on the [releases page](https://github.com/mishurov/seturgent/releases).
