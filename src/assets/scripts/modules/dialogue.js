const $dialogue = $('#npc'),
  $avatar = $('#avatar'),
  $chat = $('#chat')
function dialogue(name, message) {
  let $this = $(this)
  $this.message = message
  $this.name = name
  let src = "images/" + $this.name.toLowerCase() + '.png'
  let alt = "Image of " + $this.name
  $chat.text($this.message).html($chat.html().replace('[new]', '<br />')
    .replace('[spoiler]', '<span class="spoiler">')
    .replace('[/spoiler]', '</span>'))
  $avatar.attr('src', src)
  $avatar.attr('alt', alt)
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
