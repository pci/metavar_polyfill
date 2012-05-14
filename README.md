## Intro

This is a polyfill to an responsive image proposal by [@MattWilcox](http://twitter.com/MattWilcox), see [here](http://www.w3.org/community/respimg/2012/05/13/an-alternative-proposition-to-and-srcset-with-wider-scope/) for more details.

## Usage

Grab the library, jQuery and then fire away (see [here](http://pci.github.com/metavar_polyfill) for a demo):

    <html>
    <head>
      <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
      <meta charset=utf-8 />
      <meta name="case" value="500/500" media="only screen and (min-width:0)"/>
      <meta name="case" value="700/700" media="only screen and (min-width:500px)"/>
      <meta name="case" value="1024/1024" media="only screen and (min-width:700px)"/>
    <title>Demo</title>
    <style>
      /* Webkit hack - see http://bit.ly/zucsPo */
      @media screen and (max-width:0) {
        .foo { }
      }
      @media screen and (max-width:500px) {
        .foo { }
      }
      @media screen and (max-width:700px) {
        .foo { }
      }
    </style>
    </head>
    <body>
      <img width='100%' src="http://placekitten.com/{case}/">
      <script src="js/metavar.js">
    </body>
    </html>

## Browser Support
This replies on media queries (with working listeners) in javascript. Tested in latest Firefox and Chrome, but should work in Safari, Opera and IE10.

Made by [@PhilIngrey](http://twitter.com/philingrey)
