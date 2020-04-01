let root = null
let useHash = true // Defaults to: false
let hash = '#!' // Defaults to: '#'
let router = new Navigo(root, useHash, hash)

function routes() {
  router.on(function () {
    console.info('The Underground')
    locationsLoad('the-underground')
    newSound('start')
    setPosition($player, 62, 311)
    dialogueHide()
  })
  
  router.notFound(function (query) {
    console.info('404 page not found')
    locationsLoad('stay-determined')
    newSound('determination')
    router.navigate("/404")
    deleteNav()
    $(document).keydown(function (e) {
      if (window.location.href.indexOf("404") > -1) {
        setPosition($player, 62, 311)
        router.navigate("/")

      }
    })
  })
  
  
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
        setPosition($player, 680, 377)
        dialogue('Muffet', '* The Spider Bake Sale is a small vendor and fundraising' +
          ' event found in the Ruins and Hotland.')
      },
      'snowdin': function () {
        console.info('Snowdin Forest')
        locationsLoad('snowdin')
        newSound('snowdin')
        setPosition($player, 264, 468)
        dialogue('Sans', '* Hey Bud, ya busy looking looking at a map of the Game Undertale? [new]' +
          '[spoiler]* Not that I care, but check out the ame by Toby Fox[/spoiler]')
      },
      'snowdin/snowman': function () {
        setPosition($('.map'), -5634, -794)
        setPosition($player, 764, 300)
      },
      'snowdin/grillbys': function () {
        setPosition($('.map'), -21909, -2870)
        setPosition($player, 779, 345)
      },
      'snowdin/papyrus-sans-house': function () {

        setPosition($('.map'), -23827, -2885)
        setPosition($player, 779, 345)
      },

      'waterfall': function () {
        console.info('Waterfall')
        locationsLoad('waterfall')
        setPosition($player, 475, 365)
        newSound('waterfall')
      },
      'waterfall/temmie': function () {
        console.info('Temmie')
        setPosition($('.map'), -14596, -5488)
        setPosition($player, 753, 375)
        newSound('temmie')
      },

      'hotland': function () {
        console.info('Hotland')
        locationsLoad('hotland')
        setPosition($player, 258, 432)
        newSound('hotland')
      },
      'hotland/alphy': function () {
        setPosition($player, 768, 369.246)
        setPosition($('.map'), -4758.97, -6658.56)
        newSound('alphys')
      },
      'the-core': function () {
        console.info('The Core')
        locationsLoad('the-core')
        newSound('the-core')
      },
      'new-home': function () {
        console.info('New Home')
        locationsLoad('new-home')
        newSound('his-theme')
      }
    }).resolve()
  
}
