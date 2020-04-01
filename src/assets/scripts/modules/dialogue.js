const $dialogue = $('#npc'),
  $avatar = $('#avatar'),
  $chat = $('#chat')
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
function dialogueHide() {
  $chat.innerText = null
  $avatar.attr('src', null)
  $avatar.attr('alt', null)
  $dialogue.hide()
}
$('#closeBox').click(function () {
  dialogueHide()
})
