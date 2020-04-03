/**
  * Filename: locations.js
*/
function locationsLoad(name) {

  // Tests weather or not you are in existing page
  if (!(window.location.href.indexOf('404') > -1)) {
    
    /** Loads in map from the locations folder 
      * using ajax keeping it as a draggable 
      * object, if you are in an exsiting page. 
      * Making the "Player visibile"
    */
    $.ajaxSetup({
      cache: false
    })
    $routerContainer.css({opacity: '0'})
    $player.css({opacity: '0'})
    $routerContainer.load('./locations/' + name + '.html', function () {
      $routerContainer.stop().animate({opacity: '1'}, 800, 'swing')
      $player.stop().delay(800).css({opacity: '1'})
      navEvents()
      $('.map').draggable({
        addClasses: false
      })
      // $('.interest-point').draggable({
      //   addClasses: false
      // })

    })
  } else {
    /**
      * Still loads in resource 
      * Makes "player" invisible
    */   
    $.ajaxSetup({
      cache: false
    })
    $routerContainer.css({opacity: '0'})
    $player.css({opacity: '0'})
    $routerContainer.load('./locations/' + name + '.html', function () {
      $routerContainer.css({opacity: '1'})
      $player.stop().delay(0).css({opacity: '0'})
    })
  }
}
