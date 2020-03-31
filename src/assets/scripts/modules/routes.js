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
      },
      'snowdin': function () {
        console.info('Snowdin Forest')
        locationsLoad('snowdin')
        newSound('snowdin')
      },
      'waterfall': function () {
        console.info('Hotland')
        locationsLoad('waterfall')
        newSound('waterfall')
      },
      'hotland': function () {
        console.info('Hotland')
        locationsLoad('hotland')
        newSound('hotland')
      },
      'the-core': function () {
        console.info('The Core')
        locationsLoad('the-core')
        newSound('the-core')
      },
      'new-home': function () {
        console.info('New Home')
        locationsLoad('new-home')
        newSound('')
      }
    }).resolve()
  
}
