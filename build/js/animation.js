(function() {
  function init() {
    //Links
    var anchor1Link  = document.querySelector('.button--promo');
    var anchor2Link  = document.querySelector('.promo__scroll');
    var anchor3Link  = document.querySelector('.footer-nav-list__item--about');
    var anchor4Link  = document.querySelector('.footer-nav-list__item--products');

    //Anchors
    var anchor1      = document.querySelector('#question-form');
    var anchor2      = document.querySelector('#end');
    var anchor3      = document.querySelector('#about');
    var anchor4      = document.querySelector('#products');

    anchor1Link.addEventListener('click', (e) => { scrollTo(anchor1, e) }, false);

    anchor2Link.addEventListener('click', (e) => { scrollTo(anchor2, e) }, false);
    anchor3Link.addEventListener('click', (e) => { scrollTo(anchor3, e) }, false);
    anchor4Link.addEventListener('click', (e) => { scrollTo(anchor4.offsetTop, e) }, false);
  }

  function scrollTopValue(domElement) { //DEBUG
    return 'scrollTopValue:', domElement.scrollTop;
  }
  function offsetTopValue(domElement) { //DEBUG
    return 'offsetTopValue:', domElement.offsetTop;
  }

  var requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  function scrollTo(to, callback, duration = 1500) {


    if (isDomElement(to)) {
      to = to.offsetTop;
    }

    function move(amount) {
      document.documentElement.scrollTop = amount;
      document.body.parentNode.scrollTop = amount;
      document.body.scrollTop = amount;
    }

    function position() {
      return document.documentElement.offsetTop || document.body.parentNode.offsetTop || document.body.offsetTop;
    }

    var start = position(),
      change = to - start,
      currentTime = 0,
      increment = 20;


    var animateScroll = function() {
      // increment the time
      currentTime += increment;
      // find the value with the quadratic in-out easing function
      var val = Math.easeInOutQuad(currentTime, start, change, duration);
      // move the document.body
      move(val);
      // do the animation unless its over
      if (currentTime < duration) {
        requestAnimFrame(animateScroll);
      }
      else {
        if (callback && typeof(callback) === 'function') {
          // the animation is done so lets callback
          callback();
        }
      }
    };

    animateScroll();
  }

  init();
})();

//-------------------- Unimportant js functions --------------------
// easing functions https://goo.gl/5HLl8
//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2;
  if (t < 1) {
    return c / 2 * t * t + b
  }
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

function isDomElement(obj) {
  return obj instanceof Element;
}

function isMouseEvent(obj) {
  return obj instanceof MouseEvent;
}

function findScrollingElement(element) { //FIXME Test this too
  do {
    if (element.clientHeight < element.scrollHeight || element.clientWidth < element.scrollWidth) {
      return element;
    }
  } while (element === element.parentNode);
}
