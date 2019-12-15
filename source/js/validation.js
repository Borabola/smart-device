'use strict';
var elementQuestion = document.querySelector('#user-phone-number');
var elementModal = document.querySelector('#user-phone-number-modal');
var maskOptions = {
  mask: '+{7}(000)000-00-00',
  // lazy: false
};
var mask1 = IMask(elementQuestion, maskOptions);
var mask2 = IMask(elementModal, maskOptions);
