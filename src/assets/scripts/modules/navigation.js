/**
  * Filename: navigation.js
*/
let $links = $('#links')

/** 
  * #TODO: Create and load navigations dynamically 
  *        based on current route
*/
function createNav(navItems) {

}

// Removes all the links from the navigation
function deleteNav() {
  $links.empty()
}
// Function containing different event handlers
function navEvents() {
  // Toggles navigation
  $('#navMenu').on('click', function () {
    let $this = $(this)
    $this.toggleClass('active')
  })
  // Closes navigation
  $('.nav--container').mouseleave(function () {
    if ($('.nav--menu').hasClass('active')){
      $('.nav--menu').removeClass('active')
    }
  })
}
