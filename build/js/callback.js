'use strict';
var ESC_KEYCODE = 27;
var overlay = document.querySelector('.overlay');
var callback = document.querySelector('.button--callback');
var cbPopup = document.querySelector('.modal--callback');
var cbClose = cbPopup.querySelector('.modal__close');
var userName = cbPopup.querySelector('[name=user-name]');
var userPhone = cbPopup.querySelector('[name=phone-number]');
var cbText = cbPopup.querySelector('[name=user-question]');
var cbForm = cbPopup.querySelector('.callback');
var storagePhone = localStorage.getItem('userName');


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
      }
    }
  });
}

if (cbPopup && overlay) {
  overlay.addEventListener('click', function (evt) {
    evt.preventDefault();
    cbPopup.classList.remove('modal__show');
    overlay.classList.remove('overlay--show');
  });
}
