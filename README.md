beerxml concat
======================

Little utility for combining Beer.XML recipe files into a single Beer.xml file containing all the recipes. I made this to help ease importing all of my Beer.xml files (exported from Beer Alchemy) into Brewtoad. Brewtoad only allows you to upload one file at a time, so if you happen to have a collection of Beer.xml files, you can use this to combine them into a single uploadable file.

[example page](http://greenethumb.com/github/beerxmlconcat/)

Uses:
  - PHP (SimpleXML, DomDocument)
  - [jQuery 2.0](http://jquery.com)
  - [jQuery-file-upload](http://blueimp.github.io/jQuery-File-Upload/) (requires jqueryui.widget and jquery.iframe.transport)
