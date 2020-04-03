/**
  * Filename: newSound.js
*/


/**
  * #TODO: Add target parameter if deciding to add other sounds that play 
*/
// Plays new sound
function newSound(name) {

  // console.log("New Song name:", name)
  
  let src = "./audio/music/" + name + ".mp3";
  
  // console.log("path: ", src)

  $audio.trigger("pause")
  $audio.prop("currentTime", "0")
  $audio.attr('src', src)
  
  // console.log(`Local Storage ${localStorage.getItem('soundAllowed')}`)

  // Plays new sound if 'soundAllowed' is set to true
  if (localStorage.getItem('soundAllowed') !== undefined 
  || localStorage.getItem('soundAllowed') !== "false") {
    $audio.trigger('play')
  } else if (localStorage.getItem('soundAllowed') === "false") {
  }
}

function soundMute() {
  $audio.prop("volume", 0)
}

function soundUnmute () {
  $audio.prop("volume", 0.25)
  $audio.prop("currentTime", 0)
  $audio.trigger('play')
}
