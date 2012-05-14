/*

    Copyright 2012 - Philip Ingrey, availble under an MIT license, see http://pci.mit-license.org

	Please note - this is a hacky implementation of an idea, not to be used in production

	see http://www.w3.org/community/respimg/2012/05/13/an-alternative-proposition-to-and-srcset-with-wider-scope/#comment-754 for more info on the proposal
*/

(function($){
  
var mqs = {};

function checkAndChange(name){
  // obey the cascade! Last MQ that is true counts
  var latest = null;
  for(var i in mqs[name]){
    latest = (mqs[name][i].mq.matches ? mqs[name][i].value : latest);
  }
  $('img').each(function(){
    if($(this).attr("data-oldsrc") && $(this).attr("data-oldsrc").match("%7B"+name+"%7D")){
      this.src = $(this).attr("data-oldsrc").replace("%7B"+name+"%7D", latest); 
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
        if(this.src.match("%7B"+name+"%7D")){
          $(this).attr("data-oldsrc",this.src);
        }
      });
    }
    mql.addListener(function(mq){
      // somethings changed - check and change!
      checkAndChange(name); 
    });
    mqs[name].push({mq: mql, value: value});
    checkAndChange(name);
  });
});

})(jQuery);
