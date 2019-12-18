'use strict';
var ESC_KEYCODE = 27;
var page = document.querySelector('.page');
var overlay = document.querySelector('.overlay');
var callback = document.querySelector('.button--callback');
var cbPopup = document.querySelector('.modal--callback');
var cbClose = cbPopup.querySelector('.modal__close');
var userName = cbPopup.querySelector('[name=user-name]');
var userPhone = cbPopup.querySelector('[name=phone-number]');
var cbText = cbPopup.querySelector('[name=user-question]');
var cbForm = cbPopup.querySelector('.callback');
var storagePhone = localStorage.getItem('userName');
var elementQuestion = document.querySelector('#user-phone-number');
var elementModal = document.querySelector('#user-phone-number-modal');
var inputAddress = document.querySelector('[name=footer-block-address]');
var inputMenu = document.querySelector('[name=footer-block-menu]');
var timeout = 1000 / 60;
var durationTime = 1500;

/*function onInputChange() {
  if (inputAddress.checked) {
    inputAddress.checked = !inputAddress.checked;
     inputMenu.checked = false;
  }
  if (inputMenu.checked) {
    inputMenu.checked = !inputMenu.checked;
    inputAddress.checked = false;
  }
}

if (inputAddress && inputMenu && formBlock) {
  formBlock.addEventListener('change', onInputChange);
} */

function onInputAdressChange() {
  if (inputAddress.checked) {
    inputMenu.checked = false;
  }
}

function onInputMenuChange() {
  if (inputMenu.checked) {
    inputAddress.checked = false;
  }
}

if (inputAddress && inputMenu) {
  inputAddress.addEventListener('change', onInputAdressChange)
}

if (inputAddress && inputMenu) {
  inputMenu.addEventListener('change', onInputMenuChange)
}

var isStorageSupport = true;
var storageName = '';

try {
  storageName = localStorage.getItem('userName');
} catch (err) {
  isStorageSupport = false;
}

if (callback && cbPopup && overlay) {
  callback.addEventListener('click', function (evt) {
    evt.preventDefault();
    cbPopup.classList.add('modal__show');
    overlay.classList.add('overlay--show');
    page.classList.add('no-scroll');

    if (storageName) {
      userName.value = storageName;
      if (storagePhone) {
        userPhone.value = storagePhone;
        cbText.focus();
      } else {
        userPhone.focus();
      }
    } else {
      userName.focus();
    }

  });
}

if (cbPopup) {
  cbClose.addEventListener('click', function (evt)  {
    evt.preventDefault();
    cbPopup.classList.remove('modal__show');
    cbPopup.classList.remove('modal__error');
    overlay.classList.remove('overlay--show');
    page.classList.remove('no-scroll');
  });
}

if (cbForm) {
  cbForm.addEventListener('submit', function (evt) {
    if (!userPhone.value || !cbText.value || !userName.value) {
      evt.preventDefault();
      cbPopup.classList.remove('modal__error');
      cbPopup.offsetWidth = cbPopup.offsetWidth;
      cbPopup.classList.add('modal__error');
    } else {
      if (isStorageSupport) {
        localStorage.setItem('userPhone', userPhone.value);
        localStorage.setItem('userName', userName.value);
        localStorage.setItem('cbText', cbText.value);
      }
    }
  });
}
if (cbPopup && overlay) {
  window.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc' || evt.keyCode === ESC_KEYCODE) {
      if (cbPopup.classList.contains('modal__show')) {
        evt.preventDefault();
        cbPopup.classList.remove('modal__show');
        cbPopup.classList.remove('modal__error');
        overlay.classList.remove('overlay--show');
        page.classList.remove('no-scroll');
      }
    }
  });
}

if (cbPopup && overlay) {
  overlay.addEventListener('click', function (evt) {
    evt.preventDefault();
    cbPopup.classList.remove('modal__show');
    overlay.classList.remove('overlay--show');
    page.classList.remove('no-scroll');
  });
}

var maskOptions = {
  mask: '+{7}(000)000-00-00',
  // lazy: false
};
var mask1 = IMask(elementQuestion, maskOptions);
var mask2 = IMask(elementModal, maskOptions);


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

function init() {
  //Links
  var anchor1Link  = document.querySelector('.button--promo');
  var anchor2Link  = document.querySelector('.promo__scroll');
  var anchor3Link  = document.querySelector('.footer-nav-list__item--about');
  var anchor4Link  = document.querySelector('.footer-nav-list__item--products');

  //Anchors
  var anchor1      = document.querySelector('#question-form');
  var anchor2      = document.querySelector('#advantages');
  var anchor3      = document.querySelector('#about');
  var anchor4      = document.querySelector('#products');

  anchor1Link.addEventListener('click', (evt) => { scrollTo(anchor1, evt, durationTime) }, false);

  anchor2Link.addEventListener('click', (evt) => { scrollTo(anchor2, evt, durationTime) }, false);
  anchor3Link.addEventListener('click', (evt) => { scrollTo(anchor3, evt, durationTime) }, false);
  anchor4Link.addEventListener('click', (evt) => { scrollTo(anchor4.offsetTop, evt, durationTime) }, false);
}

function scrollTopValue(domElement) { //DEBUG
  return 'scrollTopValue:', domElement.scrollTop;
}
function offsetTopValue(domElement) { //DEBUG
  return 'offsetTopValue:', domElement.offsetTop;
}

var requestAnimFrame = (function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
    window.setTimeout(callback, timeout);
  };
})();

function scrollTo(to, callback, duration) {


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
