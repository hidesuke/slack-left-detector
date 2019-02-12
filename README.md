( ˘ω˘)ｽﾔｧ

Settings
=========

* Event Subscriptions => Subscribe to Bot Events => member_left_channel
* OAuth & Permissions => Scopes => channels:write
* 環境変数に accessToken=slackのoauthAccessTokenを設定しといて

Findings
=========

* Legacy TokenかUser Tokenじゃないと inviteがたたけ無い
* ので、このbot動かん( ˘ω˘)