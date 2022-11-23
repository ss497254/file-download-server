# File download server

Simple express server to download files over https.

### Why?

Sometimes I have to download files but network is not encypted or the ssl certificate is not valid

### How it works?

This server will be hosted on heroku(free-tier), and heroku allows encryted communications.
So this server will simply forwards the file packets back to you over this encryted network.

### Limitations?

* Doesn't support file resuming.
* Support files which are publicly accessible only.
* Fast downloads are not available, only one connection is supported per file.
