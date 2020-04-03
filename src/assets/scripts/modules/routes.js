/**
  * Filename: routes.js
*/

let root = null
let useHash = true // Defaults to: false
let hash = '#!' // Defaults to: '#'
let router = new Navigo(root, useHash, hash)



function routes() {
  // Default Route
  router.on(function () {
    console.info('The Underground')
    locationsLoad('the-underground')
    newSound('start')
    setPosition($player, 62, 311)
    dialogueHide()
  })
  // Route Doesn't Exist
  router.notFound(function (query) {
    console.info('404 page not found')
    locationsLoad('stay-determined')
    newSound('determination')
    router.navigate("/404")
    deleteNav()
    dialogueHide()
    // Pressing any key returns to main page
    $(document).keydown(function (e) {
      if (window.location.href.indexOf("404") > -1) {
        setPosition($player, 62, 311)
        router.navigate("/")

      }
    })
  })
  
  /*
      #TODO: Find a way to incorparate JSON to run each of these functions
  */
  router
    .on({

      'ruins': function () {
        console.info('Ruins')
        locationsLoad('ruins')
        newSound('ruins')
        setPosition($player, 680, 377)
        dialogue('Toriel', '* I am Toriel, caretaker of the Ruins...[new]' +
          '* I pass through this place every day to see if anyone has fallen down')
      },
      'ruins/spider-bake-sale': function () {
        newSound('spiderdance')
        setPosition($player, 769.997, 89.216)
        setPosition($('.map'), -5636.79, -2723.9)
        dialogue('Muffet', '* The Spider Bake Sale is a small vendor and fundraising' +
          ' event found in the Ruins and Hotland.')
      },
      'snowdin': function () {
        console.info('Snowdin Forest')
        locationsLoad('snowdin')
        newSound('snowdin')
        setPosition($player, 264, 468)
        dialogue('Sans', '* Hey Bud, ya busy looking looking at a map of the Game Undertale? [new]' +
          '* Not that I care, but check out the game by Toby Fox.')
      },
      'snowdin/snowman': function () {
        setPosition($('.map'), -5634, -794)
        setPosition($player, 764, 300)
        dialogue('Snowman', '* I want to see the world, but can not move.[new]' +
          '[spoiler]Lets you take a piece to take faraway from there[/spoiler]')
      },
      'snowdin/grillbys': function () {
        setPosition($('.map'), -21909, -2870)
        setPosition($player, 779, 345)
        dialogue('Sans', "I\'m going to Grillby's[new]" +
          '* Hey what is that next to you?')
      },
      'snowdin/grillbys2': function () {
        dialogue('Sans', '* Guess Its just a square...')
        setPosition($('.map'), -21909, -2870)
      },
      'snowdin/papyrus-sans-house': function () {

        setPosition($('.map'), -23827, -2885)
        setPosition($player, 779, 345)
        newSound('date-start')
        dialogue('papyrus', 'Papyrus house.[new]' +
          'Technically Sans\' house too.')
      },

      'waterfall': function () {
        console.info('Waterfall')
        locationsLoad('waterfall')
        setPosition($player, 475, 365)
        newSound('waterfall')
        dialogueHide()
      },
      'waterfall/temmie': function () {
        console.info('Temmie')
        setPosition($('.map'), -14596, -5488)
        setPosition($player, 753, 375)
        newSound('temmie')
        dialogue('temmie', 'Temmie Village home to many Temmies, notable for their quirkiness and affected English speech. [new]' +
          '[spoiler]Help the shopkeeper pay for a collage education.[/spoiler]')
      },

      'hotland': function () {
        console.info('Hotland')
        locationsLoad('hotland')
        setPosition($player, 258, 432)
        newSound('hotland')
        dialogue(null, 'Wow is it hot in here? The hotland is the path to the core[new]' +
          'MTT Resort, Alphy\'s lab, among other things are located here.')
      },
      'hotland/alphy': function () {
        setPosition($player, 768, 369.246)
        setPosition($('.map'), -4758.97, -6658.56)
        newSound('alphys')
        dialogue('Alphys', "The Lab is the workplace and home of the royal scientist, Alphys, in Hotland. " +
        "It is a single building of technological prowess where Alphys conducts her studies.")
      },
      'the-core': function () {
        console.info('The Core')
        locationsLoad('the-core')
        newSound('the-core')
        dialogue("sans", "Nothing to see here.")
      },
      'new-home': function () {
        console.info('New Home')
        locationsLoad('new-home')
        newSound('his-theme')
        setPosition($player, 768, 369.246)
        setPosition($('.map'), 126, -1980)
        dialogue(null, "New Home is the new capital of the Underground, ruled by Asgore Dreemurr, " +
          "and the final location in the game before the protagonist reaches the barrier.")
      }
    }).resolve()
  
}
