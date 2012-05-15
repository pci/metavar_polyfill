## Intro

This is a polyfill to a responsive image proposal by [@MattWilcox](http://twitter.com/MattWilcox), see [here](http://www.w3.org/community/respimg/2012/05/13/an-alternative-proposition-to-and-srcset-with-wider-scope/) for more details.

## Demo

See [here](http://pci.github.com/metavar_polyfill).

## Usage

Grab the library, and include jQuery and then fire away!:

    <html>
    <head>
      <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
      <meta charset=utf-8 />
      <meta name="case" value="500/500" media="only screen and (min-width:0)"/>
      <meta name="case" value="700/700" media="only screen and (min-width:500px)"/>
      <meta name="case" value="1024/1024" media="only screen and (min-width:700px)"/>
    <title>Demo</title>
    </head>
    <body>
      <img width='100%' src="http://placekitten.com/{case}/">
      <script src="js/metavar.js">
    </body>
    </html>

## Browser Support
Going from worst to best:
### Wooden Spoon (and just as responsive)
IE6-8, these browsers get the "{case}" folder fallback currently

### Bronze (CSS media query support)
IE9, Opera and Safari? (see Issue #1)

### Silver (matchMedia & listeners)
Firefox, IE10? and chrome, these get the full polyfill experience

### Gold (native)
None (....yet.....)

Made by [@PhilIngrey](http://twitter.com/philingrey)
