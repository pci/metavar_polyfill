/*

    Copyright 2012 - Philip Ingrey, availble under an MIT license, see http://pci.mit-license.org

  Please note - this is a hacky implementation of an idea, not to be used in production

  see http://www.w3.org/community/respimg/2012/05/13/an-alternative-proposition-to-and-srcset-with-wider-scope/#comment-754 for more info on the proposal
*/

/* Includes matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */

window.matchMedia = window.matchMedia || window.msmatchMedia || (function(doc, undefined){

  var bool,
      docElem  = doc.documentElement,
      refNode  = docElem.firstElementChild || docElem.firstChild,
      // fakeBody required for <FF4 when executed in <head>
      fakeBody = doc.createElement('body'),
      div      = doc.createElement('div');

  div.id = 'mq-test-1';
  div.style.cssText = "position:absolute;top:-100em";
  fakeBody.style.background = "none";
  fakeBody.appendChild(div);

  return function(q){

    div.innerHTML = '&shy;<style media="'+q+'"> #mq-test-1 { width: 42px; }</style>';

    docElem.insertBefore(fakeBody, refNode);
    bool = div.offsetWidth == 42;
    docElem.removeChild(fakeBody);

    return { matches: bool, media: q };
  };

})(document);

(function($){
  
var mqs = {},
    sc = encodeURI("{"),
    ec = encodeURI("}");

function checkAndChange(name){
  // obey the cascade! Last MQ that is true counts
  var latest = null;
  for(var i in mqs[name]){
    latest = (mqs[name][i].mq.matches ? mqs[name][i].value : latest);
  }
  $('img').each(function(){
    if($(this).attr("data-oldsrc") && $(this).attr("data-oldsrc").match(sc+name+ec)){
      this.src = $(this).attr("data-oldsrc").replace(sc+name+ec, latest); 
    }
  });
}

$(function(){
  $('head meta[name][value][media]').each(function(id,met){
    var jmet = $(met),
        name = jmet.attr("name"),
        value = jmet.attr("value"),
        media = jmet.attr("media"),
        mql = window.matchMedia(media);
    if(!mqs[name]){
      //new name:
      mqs[name] = [];
      $('img').each(function(){
        console.log(this.src);
        if(encodeURI(this.src).match(sc+name+ec)){
          $(this).attr("data-oldsrc",encodeURI(this.src));
        }
      });
    }
    if(mql.addListener){
      mql.addListener(function(mq){
        // somethings changed - check and change!
        checkAndChange(name); 
      });
    }
    mqs[name].push({mq: mql, value: value});
  });
  for(var name in mqs){
    checkAndChange(name);
  }
});

})(jQuery);
