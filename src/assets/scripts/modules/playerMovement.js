$(document).keydown(function(e){
  let speed = 17,
      movement = 15
  $map = $('.map')
  if (!(window.location.href.indexOf("404") > -1)) {
    switch (e.which) {
      //move up
      case 38:
      case 87:
        console.log(e.code + ' up')
        updatePosition(null, -1 * movement, speed, 'easeOutQuart')
      break
      
      //move down
      case 40:
      case 83:
        console.log(e.code + ' down')
        updatePosition(null, movement, speed, 'easeOutQuart')
      break

      // move left
      case 37:
      case 65:
        console.log(e.code + ' left')
        updatePosition(-1 * movement, null, speed, 'easeOutQuart')
      break
      //move right
      case 39:
      case 68:
        updatePosition(movement, null, speed, 'easeOutQuart')
      break
    }
  }
})


function setPosition(target, x, y) {
  let $this = $(this)
  $this.target = target
  $this.posX = x
  $this.posY = y

  if ($this.posX != null && $this.posY != null) {
    console.log("Position X", $this.posX)
    console.log("Position Y", $this.posY)
    $player.css({
      'left': $this.posX + 'px',
      'top': $this.posY + 'px'
    })
  } else {
    console.warn("There is actually a null X or Y... Hopefully its intentional...")
    if ($this.posX != null) {
      target.css({
        'left': $this.posX + 'px'
      })
    }else {
      console.warn("X is returning null")
    }
    if ($this.posY != null) {
     target.css({
        'top': $this.posY + 'px'
      })
    }else {
      console.warn("Y is returning null")
    }
  }
}

function updatePosition(x, y, dt, easing) {
  let $this = $(this)
  $this.moveX = x
  $this.moveY = y
  $this.offsetX = 5
  $this.offsetY = 5
  $this.dt = dt
  
  // X Movement
  if ($this.moveX != null) {
    if ($this.moveX < 0) {
      $this.moveX *= -1
      $player.stop().animate({
        left: '-=' + $this.moveX + 'px'
      }, dt, easing)
      $map.stop().animate({
        left: '+=' + ($this.moveX - $this.offsetX) + 'px'
      }, dt, easing)      
    } else {
      $player.stop().animate({
        left: '+=' + $this.moveX + 'px'
      }, dt, easing)
      $map.stop().animate({
        left: '-=' + ($this.moveX - $this.offsetX) + 'px'
      }, dt, easing)
    }
  }
  // Y Movement
  if ($this.moveY != null) {
    if ($this.moveY < 0) {
      $this.moveY *= -1
      $player.stop().animate({
        top: '-=' + $this.moveY + 'px'
      }, dt, easing)

      $map.stop().animate({
        top: '+=' + ($this.moveY - $this.offsetY) + 'px'
      }, dt, easing)

    } else {

      $player.stop().animate({
        top: '+=' + $this.moveY + 'px'
      }, dt, easing)

      $map.stop().animate({
        top: '-=' + ($this.moveY - $this.offsetY) + 'px'
      }, dt, easing)
      
    }
  }

}
