const $dialogue = $('#npc'),
  $avatar = $('#avatar'),
  $chat = $('#chat')
function dialogue(name, message) {
  let $this = $(this)
  $this.message = message
  $this.name = name
  let src = "images/" + $this.name.toLowerCase() +'.png'
  let alt = "Image of " + $this.name
  $chat.text($this.message)
  $avatar.attr('src', src)
  $avatar.attr('alt', alt)

  dialogueShow()

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
