let $links = $('#links')
function createNav(navItems) {

}
$links.click(function () {
  // deleteNav()
})
function deleteNav() {
  // $links.empty()
}
function navEvents() {
  $('#navMenu').on('click', function () {
    let $this = $(this)
    $this.toggleClass('active')
  })
  $('.nav--container').mouseleave(function () {
    if ($('.nav--menu').hasClass('active')){
      $('.nav--menu').removeClass('active')
    }
  })
}
