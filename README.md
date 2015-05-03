# angularzotero (WIP)

A set of two angular modules (ZoteroQueryMaker, ZoteroQueryHandler) that handle API calls to Zotero in order to retrieve library's content.

ZoteroQueryMaker manages a query object used to specify API call parameters and options.
ZoteroQueryHandler handles the API calls and their responses for controller.

##Howto

##Get a Zotero API key

1. create a zotero account if you haven't one
2. go to https://www.zotero.org/settings/keys > create new private key > copy the retrieved key

##Install the application

1. go to your terminal and type "git clone https://github.com/robindemourat/angularzotero.git" or click on "Download Zip" on right of this screen
2. in the terminal, cd to the retrieved repository and hit "cd app && bower install" (bower needed)
2. In the retrieve repository, go to app/scripts/controllers/main.js and, at line 14, replace 'Your API key here' with your private API key
3. from terminal, hit "python -m SimpleHTTPServer"
4. good to go !

##More info

Doc to be improved.
Zotero API info : https://www.zotero.org/support/dev/web_api/v3/basics
