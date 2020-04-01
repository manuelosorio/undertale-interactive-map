function locationsLoad(name) {
  console.warn(window.location.href.indexOf("404") > -1)
  if (!(window.location.href.indexOf('404') > -1)) {
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
      $('.interest-point').draggable({
        addClasses: false
      })

    })
  } else {
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
