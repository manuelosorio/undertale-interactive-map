/**
  * Version: 1.0
  * Author: Manuel Osorio
  * Author URL: https://manuelosorio.me
  *
*/

const $audio = $('#audio'),
      $volumeIcon = $('#volumeIcon'),
      $player = $('.player'),
      $routerContainer = $('.router--container'),
      $menu = $('.nav--menu')
  let $map = undefined
$(document).ready(function () {
  routes()
  const $audio = $('#audio'),
        $muteButton = $('.icon'),
        $volumeIcon = $('#volumeIcon')

  //alert variables
  const $alert = $('.alert'),
        $allow = $('#allow'),
        $decline = $('#decline')

  /**
   * Attempts to play sound on play load
   * On some browsers if 'soundAllowed' is set to true sound would play onLoad
   * If set to false sound will be muted onload
   */
  if (localStorage['soundAllowed'] !== undefined) {
    let isSoundAllowed = localStorage.getItem('soundAllowed')
    if (localStorage['soundAllowed'] === 'true') {
      $alert.remove()
      $audio.trigger('play')
      $audio.prop('volume', 0.25)
      $volumeIcon.attr('src', './images/sound.svg')
    } else {
      $alert.remove()
      $audio.trigger('pause')
      $audio.prop('volume', 0)
      $audio.prop('currentTime', '0')
      $volumeIcon.attr('src', './images/mute.svg')
    }
  } else {
    // $alert.remove()
    $audio.trigger('pause')
    $audio.prop('volume', 0)
    $audio.prop('currentTime', '0')
    $volumeIcon.attr('src', '')
  }

  // Allow sound to be played
  $allow.click(function() {
    localStorage.setItem('soundAllowed', 'true')
    $alert.remove()
    $audio.trigger('play')
    $audio.prop('volume', 0.25)
    $volumeIcon.attr('src', './images/sound.svg')
  })
  // Disallowed sound to be played
  $decline.click(function() {
    localStorage.setItem('soundAllowed', 'false')
    $volumeIcon.attr('src', './images/mute.svg')
    $alert.remove()
  })

  // Toggle Sound
  $volumeIcon.click(function () {
    if (localStorage['soundAllowed'] === 'true') {
      localStorage['soundAllowed'] = 'false'
      $volumeIcon.attr('src', './images/mute.svg')
      soundMute()
    } else if (localStorage['soundAllowed'] === 'false') {
      localStorage['soundAllowed'] = true
      $volumeIcon.attr('src', './images/sound.svg')
      soundUnmute()
    }
    console.log('Is sound allowed', localStorage['soundAllowed']) 
  })
  

  
  // console.log('Is sound allowed: ', localStorage['soundAllowed'])

})
