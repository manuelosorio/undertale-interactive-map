/**
  * Filename: dialogue.js
*/


const $dialogue = $('#npc'),
  $avatar = $('#avatar'),
  $chat = $('#chat')

// Populates NPC Dialogue Boxes
function dialogue(name, message) {
  let $this = $(this)
  $this.message = message
  $this.name = name
  if (($this.name === null)) {
    $avatar.attr('src', '')
    $avatar.attr('alt', '')
  } else {
    let src = "images/" + $this.name.toLowerCase() + '.png'
    let alt = "Image of " + $this.name
    $avatar.attr('src', src)
    $avatar.attr('alt', alt)
  }
  
  $chat.text($this.message)
  
  /**
   * #TODO: Find a resusable function that allows multiple
   *        newline and spoiler inserts
   */
  // New line and spoiler 
   $chat.html($chat.html().replace('[new]', '<br /><br />')
    .replace('[spoiler]', '<span class="spoiler">')
    .replace('[/spoiler]', '</span>'))

  dialogueShow()
  $('.spoiler').click(function () {
    $('.spoiler').toggleClass('spoiler')
  })

}

function dialogueShow() {
  $dialogue.show()
}

// Removes text and images and rehides box.
function dialogueHide() {
  $chat.innerText = null
  $avatar.attr('src', null)
  $avatar.attr('alt', null)
  $dialogue.hide()
}
$('#closeBox').click(function () {
  dialogueHide()
})
