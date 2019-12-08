seturgent
=========

Sets the urgent flag (X11) of the Thunderbird window under Linux in case of new messages. Does ignore special folders like Drafts, Junk and such. 

Theoretically it should work with Thunderbird 68+ using [WebExtension Experiment API](https://developer.thunderbird.net/add-ons/tb78) which is subject to change.

[Version 3.1](https://github.com/mishurov/seturgent/tree/3.1) uses the legacy API, it is guaranteed to work up to version 78.

I can't convert it completely to a MailExtension since the API hasn't got an event for receiveng mail at the moment.

The original addon: <https://addons.thunderbird.net/en-US/thunderbird/addon/seturgent-new/>

The .xpi file on the [releases page](https://github.com/mishurov/seturgent/releases).
