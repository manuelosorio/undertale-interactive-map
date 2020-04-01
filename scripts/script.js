"use strict";

var $audio = $('#audio'),
    $volumeIcon = $('#volumeIcon'),
    $player = $('.player'),
    $routerContainer = $('.router--container'),
    $menu = $('.nav--menu');
var $map = undefined;
$(document).ready(function () {
  routes();
  var $audio = $('#audio'),
      $muteButton = $('.icon'),
      $volumeIcon = $('#volumeIcon'); //alert variables

  var $alert = $('.alert'),
      $allow = $('#allow'),
      $decline = $('#decline');

  if (localStorage['soundAllowed'] !== undefined) {
    var isSoundAllowed = localStorage.getItem('soundAllowed');

    if (localStorage['soundAllowed'] === 'true') {
      $alert.remove();
      $audio.trigger('play');
      $audio.prop('volume', 0.25);
      $volumeIcon.attr('src', './images/sound.svg');
    } else {
      $alert.remove();
      $audio.trigger('pause');
      $audio.prop('volume', 0);
      $audio.prop('currentTime', '0');
      $volumeIcon.attr('src', './images/mute.svg');
    }
  } else {// $alert.remove()
    // $audio.trigger('pause')
    // $audio.prop('volume', 0)
    // $audio.prop('currentTime', '0')
    // $volumeIcon.attr('src', './images/mute.svg')
  }

  $allow.click(function () {
    localStorage.setItem('soundAllowed', 'true');
    $alert.remove();
    $audio.trigger('play');
    $audio.prop('volume', 0.25);
    $volumeIcon.attr('src', './images/sound.svg');
  });
  $decline.click(function () {
    localStorage.setItem('soundAllowed', 'false');
    $volumeIcon.attr('src', './images/mute.svg');
    $alert.remove();
  });
  $volumeIcon.click(function () {
    if (localStorage['soundAllowed'] === 'true') {
      localStorage['soundAllowed'] = 'false';
      $volumeIcon.attr('src', './images/mute.svg');
      soundMute();
    } else if (localStorage['soundAllowed'] === 'false') {
      localStorage['soundAllowed'] = true;
      $volumeIcon.attr('src', './images/sound.svg');
      soundUnmute();
    }

    console.log('Is sound allowed', localStorage['soundAllowed']);
  });
  console.log('Is sound allowed: ', localStorage['soundAllowed']);
  $('.player').draggable({
    addClasses: false
  });
});

function locationsLoad(name) {
  console.warn(window.location.href.indexOf("404") > -1);

  if (!(window.location.href.indexOf('404') > -1)) {
    $.ajaxSetup({
      cache: false
    });
    $routerContainer.css({
      opacity: '0'
    });
    $player.css({
      opacity: '0'
    });
    $routerContainer.load('./locations/' + name + '.html', function () {
      $routerContainer.stop().animate({
        opacity: '1'
      }, 800, 'swing');
      $player.stop().delay(800).css({
        opacity: '1'
      });
      $('#navMenu').on('click', function () {
        var $this = $(this);
        $this.toggleClass('active');
      });
    });
  } else {
    $.ajaxSetup({
      cache: false
    });
    $routerContainer.css({
      opacity: '0'
    });
    $player.css({
      opacity: '0'
    });
    $routerContainer.load('./locations/' + name + '.html', function () {
      $routerContainer.css({
        opacity: '1'
      });
      $player.stop().delay(0).css({
        opacity: '0'
      });
    });
  }
}

var $links = $('#links');

function createNav(navItems) {}

$links.click(function () {
  deleteNav();
});

function deleteNav() {// $links.empty()
}

function newSound(name) {
  console.log("New Song name:", name);
  var src = "./audio/music/" + name + ".mp3";
  console.log("path: ", src);
  $audio.trigger("pause");
  $audio.prop("currentTime", "0");
  $audio.attr('src', src);
  console.log("Local Storage ".concat(localStorage.getItem('soundAllowed')));

  if (localStorage.getItem('soundAllowed') !== undefined || localStorage.getItem('soundAllowed') !== "false") {
    $audio.trigger('play');
  } else if (localStorage.getItem('soundAllowed') === "false") {}
}

function soundMute() {
  $audio.prop("volume", 0);
}

function soundUnmute() {
  $audio.prop("volume", 0.25);
  $audio.prop("currentTime", 0);
  $audio.trigger('play');
}

$(document).keydown(function (e) {
  var speed = 17,
      movement = 15;
  $map = $('.map');

  if (!(window.location.href.indexOf("404") > -1)) {
    switch (e.which) {
      //move up
      case 38:
      case 87:
        console.log(e.code + ' up');
        updatePosition(null, -1 * movement, speed, 'easeOutQuart');
        break;
      //move down

      case 40:
      case 83:
        console.log(e.code + ' down');
        updatePosition(null, movement, speed, 'easeOutQuart');
        break;
      // move left

      case 37:
      case 65:
        console.log(e.code + ' left');
        updatePosition(-1 * movement, null, speed, 'easeOutQuart');
        break;
      //move right

      case 39:
      case 68:
        updatePosition(movement, null, speed, 'easeOutQuart');
        break;
    }
  }
});

function setPosition(target, x, y) {
  var $this = $(this);
  $this.target = target;
  $this.posX = x;
  $this.posY = y;

  if ($this.posX != null && $this.posY != null) {
    console.log("Position X", $this.posX);
    console.log("Position Y", $this.posY);
    $player.css({
      'left': $this.posX + 'px',
      'top': $this.posY + 'px'
    });
  } else {
    console.warn("There is actually a null X or Y... Hopefully its intentional...");

    if ($this.posX != null) {
      target.css({
        'left': $this.posX + 'px'
      });
    } else {
      console.warn("X is returning null");
    }

    if ($this.posY != null) {
      target.css({
        'top': $this.posY + 'px'
      });
    } else {
      console.warn("Y is returning null");
    }
  }
}

function updatePosition(x, y, dt, easing) {
  var $this = $(this);
  $this.moveX = x;
  $this.moveY = y;
  $this.offsetX = 5;
  $this.offsetY = 5;
  $this.dt = dt; // X Movement

  if ($this.moveX != null) {
    if ($this.moveX < 0) {
      $this.moveX *= -1;
      $player.stop().animate({
        left: '-=' + $this.moveX + 'px'
      }, dt, easing);
      $map.stop().animate({
        left: '+=' + ($this.moveX - $this.offsetX) + 'px'
      }, dt, easing);
    } else {
      $player.stop().animate({
        left: '+=' + $this.moveX + 'px'
      }, dt, easing);
      $map.stop().animate({
        left: '-=' + ($this.moveX - $this.offsetX) + 'px'
      }, dt, easing);
    }
  } // Y Movement


  if ($this.moveY != null) {
    if ($this.moveY < 0) {
      $this.moveY *= -1;
      $player.stop().animate({
        top: '-=' + $this.moveY + 'px'
      }, dt, easing);
      $map.stop().animate({
        top: '+=' + ($this.moveY - $this.offsetY) + 'px'
      }, dt, easing);
    } else {
      $player.stop().animate({
        top: '+=' + $this.moveY + 'px'
      }, dt, easing);
      $map.stop().animate({
        top: '-=' + ($this.moveY - $this.offsetY) + 'px'
      }, dt, easing);
    }
  }
}

var root = null;
var useHash = true; // Defaults to: false

var hash = '#!'; // Defaults to: '#'

var router = new Navigo(root, useHash, hash);

function routes() {
  router.on(function () {
    console.info('The Underground');
    locationsLoad('the-underground');
    newSound('start');
    setPosition($player, 62, 311);
  });
  router.notFound(function (query) {
    console.info('404 page not found');
    locationsLoad('stay-determined');
    newSound('determination');
    router.navigate("/404");
    deleteNav();
    $(document).keydown(function (e) {
      if (window.location.href.indexOf("404") > -1) {
        setPosition($player, 62, 311);
        router.navigate("/");
      }
    });
  });
  router.on({
    'ruins': function ruins() {
      console.info('Ruins');
      locationsLoad('ruins');
      newSound('ruins');
      setPosition($player, 680, 377);
    },
    'snowdin': function snowdin() {
      console.info('Snowdin Forest');
      locationsLoad('snowdin');
      newSound('snowdin');
    },
    'waterfall': function waterfall() {
      console.info('Hotland');
      locationsLoad('waterfall');
      newSound('waterfall');
    },
    'hotland': function hotland() {
      console.info('Hotland');
      locationsLoad('hotland');
      newSound('hotland');
    },
    'the-core': function theCore() {
      console.info('The Core');
      locationsLoad('the-core');
      newSound('the-core');
    },
    'new-home': function newHome() {
      console.info('New Home');
      locationsLoad('new-home');
      newSound('');
    }
  }).resolve();
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyIsIm1vZHVsZXMvbG9jYXRpb25zLmpzIiwibW9kdWxlcy9uYXZpZ2F0aW9uLmpzIiwibW9kdWxlcy9uZXdTb3VuZC5qcyIsIm1vZHVsZXMvcGxheWVyTW92ZW1lbnQuanMiLCJtb2R1bGVzL3JvdXRlcy5qcyJdLCJuYW1lcyI6WyIkYXVkaW8iLCIkIiwiJHZvbHVtZUljb24iLCIkcGxheWVyIiwiJHJvdXRlckNvbnRhaW5lciIsIiRtZW51IiwiJG1hcCIsInVuZGVmaW5lZCIsImRvY3VtZW50IiwicmVhZHkiLCJyb3V0ZXMiLCIkbXV0ZUJ1dHRvbiIsIiRhbGVydCIsIiRhbGxvdyIsIiRkZWNsaW5lIiwibG9jYWxTdG9yYWdlIiwiaXNTb3VuZEFsbG93ZWQiLCJnZXRJdGVtIiwicmVtb3ZlIiwidHJpZ2dlciIsInByb3AiLCJhdHRyIiwiY2xpY2siLCJzZXRJdGVtIiwic291bmRNdXRlIiwic291bmRVbm11dGUiLCJjb25zb2xlIiwibG9nIiwiZHJhZ2dhYmxlIiwiYWRkQ2xhc3NlcyIsImxvY2F0aW9uc0xvYWQiLCJuYW1lIiwid2FybiIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImluZGV4T2YiLCJhamF4U2V0dXAiLCJjYWNoZSIsImNzcyIsIm9wYWNpdHkiLCJsb2FkIiwic3RvcCIsImFuaW1hdGUiLCJkZWxheSIsIm9uIiwiJHRoaXMiLCJ0b2dnbGVDbGFzcyIsIiRsaW5rcyIsImNyZWF0ZU5hdiIsIm5hdkl0ZW1zIiwiZGVsZXRlTmF2IiwibmV3U291bmQiLCJzcmMiLCJrZXlkb3duIiwiZSIsInNwZWVkIiwibW92ZW1lbnQiLCJ3aGljaCIsImNvZGUiLCJ1cGRhdGVQb3NpdGlvbiIsInNldFBvc2l0aW9uIiwidGFyZ2V0IiwieCIsInkiLCJwb3NYIiwicG9zWSIsImR0IiwiZWFzaW5nIiwibW92ZVgiLCJtb3ZlWSIsIm9mZnNldFgiLCJvZmZzZXRZIiwibGVmdCIsInRvcCIsInJvb3QiLCJ1c2VIYXNoIiwiaGFzaCIsInJv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QWxELE1BQUFBLGFBQUEsQ0FBQSxVQUFBLENBQUE7QUFDQXNCLE1BQUFBLFFBQUEsQ0FBQSxVQUFBLENBQUE7QUFDQSxLQTNCQTtBQTRCQSxnQkFBQSxtQkFBQTtBQUNBMUIsTUFBQUEsT0FBQSxDQUFBc0QsSUFBQSxDQUFBLFVBQUE7QUFDQWxELE1BQUFBLGFBQUEsQ0FBQSxVQUFBLENBQUE7QUFDQXNCLE1BQUFBLFFBQUEsQ0FBQSxFQUFBLENBQUE7QUFDQTtBQWhDQSxHQURBLEVBa0NBZ0MsT0FsQ0E7QUFvQ0EiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgJGF1ZGlvID0gJCgnI2F1ZGlvJyksXHJcbiAgICAgICR2b2x1bWVJY29uID0gJCgnI3ZvbHVtZUljb24nKSxcclxuICAgICAgJHBsYXllciA9ICQoJy5wbGF5ZXInKSxcclxuICAgICAgJHJvdXRlckNvbnRhaW5lciA9ICQoJy5yb3V0ZXItLWNvbnRhaW5lcicpLFxyXG4gICAgICAkbWVudSA9ICQoJy5uYXYtLW1lbnUnKVxyXG4gIGxldCAkbWFwID0gdW5kZWZpbmVkXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICByb3V0ZXMoKVxyXG4gIGNvbnN0ICRhdWRpbyA9ICQoJyNhdWRpbycpLFxyXG4gICAgICAgICRtdXRlQnV0dG9uID0gJCgnLmljb24nKSxcclxuICAgICAgICAkdm9sdW1lSWNvbiA9ICQoJyN2b2x1bWVJY29uJylcclxuXHJcbiAgLy9hbGVydCB2YXJpYWJsZXNcclxuICBjb25zdCAkYWxlcnQgPSAkKCcuYWxlcnQnKSxcclxuICAgICAgICAkYWxsb3cgPSAkKCcjYWxsb3cnKSxcclxuICAgICAgICAkZGVjbGluZSA9ICQoJyNkZWNsaW5lJylcclxuXHJcbiAgaWYgKGxvY2FsU3RvcmFnZVsnc291bmRBbGxvd2VkJ10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgbGV0IGlzU291bmRBbGxvd2VkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NvdW5kQWxsb3dlZCcpXHJcbiAgICBpZiAobG9jYWxTdG9yYWdlWydzb3VuZEFsbG93ZWQnXSA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICRhbGVydC5yZW1vdmUoKVxyXG4gICAgICAkYXVkaW8udHJpZ2dlcigncGxheScpXHJcbiAgICAgICRhdWRpby5wcm9wKCd2b2x1bWUnLCAwLjI1KVxyXG4gICAgICAkdm9sdW1lSWNvbi5hdHRyKCdzcmMnLCAnLi9pbWFnZXMvc291bmQuc3ZnJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICRhbGVydC5yZW1vdmUoKVxyXG4gICAgICAkYXVkaW8udHJpZ2dlcigncGF1c2UnKVxyXG4gICAgICAkYXVkaW8ucHJvcCgndm9sdW1lJywgMClcclxuICAgICAgJGF1ZGlvLnByb3AoJ2N1cnJlbnRUaW1lJywgJzAnKVxyXG4gICAgICAkdm9sdW1lSWNvbi5hdHRyKCdzcmMnLCAnLi9pbWFnZXMvbXV0ZS5zdmcnKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyAkYWxlcnQucmVtb3ZlKClcclxuICAgIC8vICRhdWRpby50cmlnZ2VyKCdwYXVzZScpXHJcbiAgICAvLyAkYXVkaW8ucHJvcCgndm9sdW1lJywgMClcclxuICAgIC8vICRhdWRpby5wcm9wKCdjdXJyZW50VGltZScsICcwJylcclxuICAgIC8vICR2b2x1bWVJY29uLmF0dHIoJ3NyYycsICcuL2ltYWdlcy9tdXRlLnN2ZycpXHJcbiAgfVxyXG5cclxuICAkYWxsb3cuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc291bmRBbGxvd2VkJywgJ3RydWUnKVxyXG4gICAgJGFsZXJ0LnJlbW92ZSgpXHJcbiAgICAkYXVkaW8udHJpZ2dlcigncGxheScpXHJcbiAgICAkYXVkaW8ucHJvcCgndm9sdW1lJywgMC4yNSlcclxuICAgICR2b2x1bWVJY29uLmF0dHIoJ3NyYycsICcuL2ltYWdlcy9zb3VuZC5zdmcnKVxyXG4gIH0pXHJcblxyXG4gICRkZWNsaW5lLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NvdW5kQWxsb3dlZCcsICdmYWxzZScpXHJcbiAgICAkdm9sdW1lSWNvbi5hdHRyKCdzcmMnLCAnLi9pbWFnZXMvbXV0ZS5zdmcnKVxyXG4gICAgJGFsZXJ0LnJlbW92ZSgpXHJcbiAgfSlcclxuXHJcblxyXG4gICR2b2x1bWVJY29uLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChsb2NhbFN0b3JhZ2VbJ3NvdW5kQWxsb3dlZCddID09PSAndHJ1ZScpIHtcclxuICAgICAgbG9jYWxTdG9yYWdlWydzb3VuZEFsbG93ZWQnXSA9ICdmYWxzZSdcclxuICAgICAgJHZvbHVtZUljb24uYXR0cignc3JjJywgJy4vaW1hZ2VzL211dGUuc3ZnJylcclxuICAgICAgc291bmRNdXRlKClcclxuICAgIH0gZWxzZSBpZiAobG9jYWxTdG9yYWdlWydzb3VuZEFsbG93ZWQnXSA9PT0gJ2ZhbHNlJykge1xyXG4gICAgICBsb2NhbFN0b3JhZ2VbJ3NvdW5kQWxsb3dlZCddID0gdHJ1ZVxyXG4gICAgICAkdm9sdW1lSWNvbi5hdHRyKCdzcmMnLCAnLi9pbWFnZXMvc291bmQuc3ZnJylcclxuICAgICAgc291bmRVbm11dGUoKVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coJ0lzIHNvdW5kIGFsbG93ZWQnLCBsb2NhbFN0b3JhZ2VbJ3NvdW5kQWxsb3dlZCddKSBcclxuICB9KVxyXG5cclxuXHJcblxyXG5cclxuICAgIGNvbnNvbGUubG9nKCdJcyBzb3VuZCBhbGxvd2VkOiAnLCBsb2NhbFN0b3JhZ2VbJ3NvdW5kQWxsb3dlZCddKVxyXG5cclxuXHJcblxyXG4gICQoJy5wbGF5ZXInKS5kcmFnZ2FibGUoe1xyXG4gICAgYWRkQ2xhc3NlczogZmFsc2VcclxuICB9KVxyXG5cclxufSlcclxuIiwiZnVuY3Rpb24gbG9jYXRpb25zTG9hZChuYW1lKSB7XHJcbiAgY29uc29sZS53YXJuKHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoXCI0MDRcIikgPiAtMSlcclxuICBpZiAoISh3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCc0MDQnKSA+IC0xKSkge1xyXG4gICAgJC5hamF4U2V0dXAoe1xyXG4gICAgICBjYWNoZTogZmFsc2VcclxuICAgIH0pXHJcbiAgICAkcm91dGVyQ29udGFpbmVyLmNzcyh7b3BhY2l0eTogJzAnfSlcclxuICAgICRwbGF5ZXIuY3NzKHtvcGFjaXR5OiAnMCd9KVxyXG4gICAgJHJvdXRlckNvbnRhaW5lci5sb2FkKCcuL2xvY2F0aW9ucy8nICsgbmFtZSArICcuaHRtbCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgJHJvdXRlckNvbnRhaW5lci5zdG9wKCkuYW5pbWF0ZSh7b3BhY2l0eTogJzEnfSwgODAwLCAnc3dpbmcnKVxyXG4gICAgICAkcGxheWVyLnN0b3AoKS5kZWxheSg4MDApLmNzcyh7b3BhY2l0eTogJzEnfSlcclxuICAgICAgJCgnI25hdk1lbnUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKVxyXG4gICAgICAgICR0aGlzLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9IGVsc2Uge1xyXG4gICAgJC5hamF4U2V0dXAoe1xyXG4gICAgICBjYWNoZTogZmFsc2VcclxuICAgIH0pXHJcbiAgICAkcm91dGVyQ29udGFpbmVyLmNzcyh7b3BhY2l0eTogJzAnfSlcclxuICAgICRwbGF5ZXIuY3NzKHtvcGFjaXR5OiAnMCd9KVxyXG4gICAgJHJvdXRlckNvbnRhaW5lci5sb2FkKCcuL2xvY2F0aW9ucy8nICsgbmFtZSArICcuaHRtbCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgJHJvdXRlckNvbnRhaW5lci5jc3Moe29wYWNpdHk6ICcxJ30pXHJcbiAgICAgICRwbGF5ZXIuc3RvcCgpLmRlbGF5KDApLmNzcyh7b3BhY2l0eTogJzAnfSlcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiIsImxldCAkbGlua3MgPSAkKCcjbGlua3MnKVxyXG5mdW5jdGlvbiBjcmVhdGVOYXYobmF2SXRlbXMpIHtcclxuXHJcbn1cclxuJGxpbmtzLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICBkZWxldGVOYXYoKVxyXG59KVxyXG5mdW5jdGlvbiBkZWxldGVOYXYoKSB7XHJcbiAgLy8gJGxpbmtzLmVtcHR5KClcclxufVxyXG5cclxuXHJcbiIsImZ1bmN0aW9uIG5ld1NvdW5kKG5hbWUpIHtcclxuICBjb25zb2xlLmxvZyhcIk5ldyBTb25nIG5hbWU6XCIsIG5hbWUpXHJcbiAgbGV0IHNyYyA9IFwiLi9hdWRpby9tdXNpYy9cIiArIG5hbWUgKyBcIi5tcDNcIjtcclxuICBjb25zb2xlLmxvZyhcInBhdGg6IFwiLCBzcmMpXHJcblxyXG4gICRhdWRpby50cmlnZ2VyKFwicGF1c2VcIilcclxuICAkYXVkaW8ucHJvcChcImN1cnJlbnRUaW1lXCIsIFwiMFwiKVxyXG4gICRhdWRpby5hdHRyKCdzcmMnLCBzcmMpXHJcbiAgXHJcbiAgY29uc29sZS5sb2coYExvY2FsIFN0b3JhZ2UgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc291bmRBbGxvd2VkJyl9YClcclxuICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NvdW5kQWxsb3dlZCcpICE9PSB1bmRlZmluZWQgfHwgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NvdW5kQWxsb3dlZCcpICE9PSBcImZhbHNlXCIpIHtcclxuICAgICRhdWRpby50cmlnZ2VyKCdwbGF5JylcclxuICB9IGVsc2UgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzb3VuZEFsbG93ZWQnKSA9PT0gXCJmYWxzZVwiKSB7XHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIHNvdW5kTXV0ZSgpIHtcclxuICAkYXVkaW8ucHJvcChcInZvbHVtZVwiLCAwKVxyXG59XHJcbmZ1bmN0aW9uIHNvdW5kVW5tdXRlICgpIHtcclxuICAkYXVkaW8ucHJvcChcInZvbHVtZVwiLCAwLjI1KVxyXG4gICRhdWRpby5wcm9wKFwiY3VycmVudFRpbWVcIiwgMClcclxuICAkYXVkaW8udHJpZ2dlcigncGxheScpXHJcbn1cclxuIiwiJChkb2N1bWVudCkua2V5ZG93bihmdW5jdGlvbihlKXtcclxuICBsZXQgc3BlZWQgPSAxNyxcclxuICAgICAgbW92ZW1lbnQgPSAxNVxyXG4gICRtYXAgPSAkKCcubWFwJylcclxuICBpZiAoISh3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKFwiNDA0XCIpID4gLTEpKSB7XHJcbiAgICBzd2l0Y2ggKGUud2hpY2gpIHtcclxuICAgICAgLy9tb3ZlIHVwXHJcbiAgICAgIGNhc2UgMzg6XHJcbiAgICAgIGNhc2UgODc6XHJcbiAgICAgICAgY29uc29sZS5sb2coZS5jb2RlICsgJyB1cCcpXHJcbiAgICAgICAgdXBkYXRlUG9zaXRpb24obnVsbCwgLTEgKiBtb3ZlbWVudCwgc3BlZWQsICdlYXNlT3V0UXVhcnQnKVxyXG4gICAgICBicmVha1xyXG4gICAgICBcclxuICAgICAgLy9tb3ZlIGRvd25cclxuICAgICAgY2FzZSA0MDpcclxuICAgICAgY2FzZSA4MzpcclxuICAgICAgICBjb25zb2xlLmxvZyhlLmNvZGUgKyAnIGRvd24nKVxyXG4gICAgICAgIHVwZGF0ZVBvc2l0aW9uKG51bGwsIG1vdmVtZW50LCBzcGVlZCwgJ2Vhc2VPdXRRdWFydCcpXHJcbiAgICAgIGJyZWFrXHJcblxyXG4gICAgICAvLyBtb3ZlIGxlZnRcclxuICAgICAgY2FzZSAzNzpcclxuICAgICAgY2FzZSA2NTpcclxuICAgICAgICBjb25zb2xlLmxvZyhlLmNvZGUgKyAnIGxlZnQnKVxyXG4gICAgICAgIHVwZGF0ZVBvc2l0aW9uKC0xICogbW92ZW1lbnQsIG51bGwsIHNwZWVkLCAnZWFzZU91dFF1YXJ0JylcclxuICAgICAgYnJlYWtcclxuICAgICAgLy9tb3ZlIHJpZ2h0XHJcbiAgICAgIGNhc2UgMzk6XHJcbiAgICAgIGNhc2UgNjg6XHJcbiAgICAgICAgdXBkYXRlUG9zaXRpb24obW92ZW1lbnQsIG51bGwsIHNwZWVkLCAnZWFzZU91dFF1YXJ0JylcclxuICAgICAgYnJlYWtcclxuICAgIH1cclxuICB9XHJcbn0pXHJcblxyXG5cclxuZnVuY3Rpb24gc2V0UG9zaXRpb24odGFyZ2V0LCB4LCB5KSB7XHJcbiAgbGV0ICR0aGlzID0gJCh0aGlzKVxyXG4gICR0aGlzLnRhcmdldCA9IHRhcmdldFxyXG4gICR0aGlzLnBvc1ggPSB4XHJcbiAgJHRoaXMucG9zWSA9IHlcclxuXHJcbiAgaWYgKCR0aGlzLnBvc1ggIT0gbnVsbCAmJiAkdGhpcy5wb3NZICE9IG51bGwpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiUG9zaXRpb24gWFwiLCAkdGhpcy5wb3NYKVxyXG4gICAgY29uc29sZS5sb2coXCJQb3NpdGlvbiBZXCIsICR0aGlzLnBvc1kpXHJcbiAgICAkcGxheWVyLmNzcyh7XHJcbiAgICAgICdsZWZ0JzogJHRoaXMucG9zWCArICdweCcsXHJcbiAgICAgICd0b3AnOiAkdGhpcy5wb3NZICsgJ3B4J1xyXG4gICAgfSlcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS53YXJuKFwiVGhlcmUgaXMgYWN0dWFsbHkgYSBudWxsIFggb3IgWS4uLiBIb3BlZnVsbHkgaXRzIGludGVudGlvbmFsLi4uXCIpXHJcbiAgICBpZiAoJHRoaXMucG9zWCAhPSBudWxsKSB7XHJcbiAgICAgIHRhcmdldC5jc3Moe1xyXG4gICAgICAgICdsZWZ0JzogJHRoaXMucG9zWCArICdweCdcclxuICAgICAgfSlcclxuICAgIH1lbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKFwiWCBpcyByZXR1cm5pbmcgbnVsbFwiKVxyXG4gICAgfVxyXG4gICAgaWYgKCR0aGlzLnBvc1kgIT0gbnVsbCkge1xyXG4gICAgIHRhcmdldC5jc3Moe1xyXG4gICAgICAgICd0b3AnOiAkdGhpcy5wb3NZICsgJ3B4J1xyXG4gICAgICB9KVxyXG4gICAgfWVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oXCJZIGlzIHJldHVybmluZyBudWxsXCIpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVQb3NpdGlvbih4LCB5LCBkdCwgZWFzaW5nKSB7XHJcbiAgbGV0ICR0aGlzID0gJCh0aGlzKVxyXG4gICR0aGlzLm1vdmVYID0geFxyXG4gICR0aGlzLm1vdmVZID0geVxyXG4gICR0aGlzLm9mZnNldFggPSA1XHJcbiAgJHRoaXMub2Zmc2V0WSA9IDVcclxuICAkdGhpcy5kdCA9IGR0XHJcbiAgXHJcbiAgLy8gWCBNb3ZlbWVudFxyXG4gIGlmICgkdGhpcy5tb3ZlWCAhPSBudWxsKSB7XHJcbiAgICBpZiAoJHRoaXMubW92ZVggPCAwKSB7XHJcbiAgICAgICR0aGlzLm1vdmVYICo9IC0xXHJcbiAgICAgICRwbGF5ZXIuc3RvcCgpLmFuaW1hdGUoe1xyXG4gICAgICAgIGxlZnQ6ICctPScgKyAkdGhpcy5tb3ZlWCArICdweCdcclxuICAgICAgfSwgZHQsIGVhc2luZylcclxuICAgICAgJG1hcC5zdG9wKCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgbGVmdDogJys9JyArICgkdGhpcy5tb3ZlWCAtICR0aGlzLm9mZnNldFgpICsgJ3B4J1xyXG4gICAgICB9LCBkdCwgZWFzaW5nKSAgICAgIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJHBsYXllci5zdG9wKCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgbGVmdDogJys9JyArICR0aGlzLm1vdmVYICsgJ3B4J1xyXG4gICAgICB9LCBkdCwgZWFzaW5nKVxyXG4gICAgICAkbWFwLnN0b3AoKS5hbmltYXRlKHtcclxuICAgICAgICBsZWZ0OiAnLT0nICsgKCR0aGlzLm1vdmVYIC0gJHRoaXMub2Zmc2V0WCkgKyAncHgnXHJcbiAgICAgIH0sIGR0LCBlYXNpbmcpXHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIFkgTW92ZW1lbnRcclxuICBpZiAoJHRoaXMubW92ZVkgIT0gbnVsbCkge1xyXG4gICAgaWYgKCR0aGlzLm1vdmVZIDwgMCkge1xyXG4gICAgICAkdGhpcy5tb3ZlWSAqPSAtMVxyXG4gICAgICAkcGxheWVyLnN0b3AoKS5hbmltYXRlKHtcclxuICAgICAgICB0b3A6ICctPScgKyAkdGhpcy5tb3ZlWSArICdweCdcclxuICAgICAgfSwgZHQsIGVhc2luZylcclxuXHJcbiAgICAgICRtYXAuc3RvcCgpLmFuaW1hdGUoe1xyXG4gICAgICAgIHRvcDogJys9JyArICgkdGhpcy5tb3ZlWSAtICR0aGlzLm9mZnNldFkpICsgJ3B4J1xyXG4gICAgICB9LCBkdCwgZWFzaW5nKVxyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAkcGxheWVyLnN0b3AoKS5hbmltYXRlKHtcclxuICAgICAgICB0b3A6ICcrPScgKyAkdGhpcy5tb3ZlWSArICdweCdcclxuICAgICAgfSwgZHQsIGVhc2luZylcclxuXHJcbiAgICAgICRtYXAuc3RvcCgpLmFuaW1hdGUoe1xyXG4gICAgICAgIHRvcDogJy09JyArICgkdGhpcy5tb3ZlWSAtICR0aGlzLm9mZnNldFkpICsgJ3B4J1xyXG4gICAgICB9LCBkdCwgZWFzaW5nKVxyXG4gICAgICBcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiIsImxldCByb290ID0gbnVsbFxyXG5sZXQgdXNlSGFzaCA9IHRydWUgLy8gRGVmYXVsdHMgdG86IGZhbHNlXHJcbmxldCBoYXNoID0gJyMhJyAvLyBEZWZhdWx0cyB0bzogJyMnXHJcbmxldCByb3V0ZXIgPSBuZXcgTmF2aWdvKHJvb3QsIHVzZUhhc2gsIGhhc2gpXHJcblxyXG5mdW5jdGlvbiByb3V0ZXMoKSB7XHJcbiAgXHJcbiAgcm91dGVyLm9uKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUuaW5mbygnVGhlIFVuZGVyZ3JvdW5kJylcclxuICAgIGxvY2F0aW9uc0xvYWQoJ3RoZS11bmRlcmdyb3VuZCcpXHJcbiAgICBuZXdTb3VuZCgnc3RhcnQnKVxyXG4gICAgc2V0UG9zaXRpb24oJHBsYXllciwgNjIsIDMxMSlcclxuICB9KVxyXG4gIFxyXG4gIHJvdXRlci5ub3RGb3VuZChmdW5jdGlvbiAocXVlcnkpIHtcclxuICAgIGNvbnNvbGUuaW5mbygnNDA0IHBhZ2Ugbm90IGZvdW5kJylcclxuICAgIGxvY2F0aW9uc0xvYWQoJ3N0YXktZGV0ZXJtaW5lZCcpXHJcbiAgICBuZXdTb3VuZCgnZGV0ZXJtaW5hdGlvbicpXHJcbiAgICByb3V0ZXIubmF2aWdhdGUoXCIvNDA0XCIpXHJcbiAgICBkZWxldGVOYXYoKVxyXG4gICAgJChkb2N1bWVudCkua2V5ZG93bihmdW5jdGlvbiAoZSkge1xyXG4gICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZihcIjQwNFwiKSA+IC0xKSB7XHJcbiAgICAgICAgc2V0UG9zaXRpb24oJHBsYXllciwgNjIsIDMxMSlcclxuICAgICAgICByb3V0ZXIubmF2aWdhdGUoXCIvXCIpXHJcbiAgICAgICAgXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSlcclxuICBcclxuICBcclxuICByb3V0ZXJcclxuICAgIC5vbih7XHJcblxyXG4gICAgICAncnVpbnMnOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKCdSdWlucycpXHJcbiAgICAgICAgbG9jYXRpb25zTG9hZCgncnVpbnMnKVxyXG4gICAgICAgIG5ld1NvdW5kKCdydWlucycpXHJcbiAgICAgICAgc2V0UG9zaXRpb24oJHBsYXllciwgNjgwLCAzNzcpXHJcbiAgICAgIH0sXHJcbiAgICAgICdzbm93ZGluJzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUuaW5mbygnU25vd2RpbiBGb3Jlc3QnKVxyXG4gICAgICAgIGxvY2F0aW9uc0xvYWQoJ3Nub3dkaW4nKVxyXG4gICAgICAgIG5ld1NvdW5kKCdzbm93ZGluJylcclxuICAgICAgfSxcclxuICAgICAgJ3dhdGVyZmFsbCc6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmluZm8oJ0hvdGxhbmQnKVxyXG4gICAgICAgIGxvY2F0aW9uc0xvYWQoJ3dhdGVyZmFsbCcpXHJcbiAgICAgICAgbmV3U291bmQoJ3dhdGVyZmFsbCcpXHJcbiAgICAgIH0sXHJcbiAgICAgICdob3RsYW5kJzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUuaW5mbygnSG90bGFuZCcpXHJcbiAgICAgICAgbG9jYXRpb25zTG9hZCgnaG90bGFuZCcpXHJcbiAgICAgICAgbmV3U291bmQoJ2hvdGxhbmQnKVxyXG4gICAgICB9LFxyXG4gICAgICAndGhlLWNvcmUnOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKCdUaGUgQ29yZScpXHJcbiAgICAgICAgbG9jYXRpb25zTG9hZCgndGhlLWNvcmUnKVxyXG4gICAgICAgIG5ld1NvdW5kKCd0aGUtY29yZScpXHJcbiAgICAgIH0sXHJcbiAgICAgICduZXctaG9tZSc6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmluZm8oJ05ldyBIb21lJylcclxuICAgICAgICBsb2NhdGlvbnNMb2FkKCduZXctaG9tZScpXHJcbiAgICAgICAgbmV3U291bmQoJycpXHJcbiAgICAgIH1cclxuICAgIH0pLnJlc29sdmUoKVxyXG4gIFxyXG59XHJcbiJdfQ==
