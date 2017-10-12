'use strict';

var ModalVideo = require('../index');

var applyJQuery = function applyJQuery(jQuery) {
  jQuery.fn.modalVideo = function (settings) {
    if (typeof settings === 'strings') {} else {
      new ModalVideo(this, settings);
    }
    return this;
  };
};

if (typeof define === 'function' && define.amd) {
  define(['jquery'], applyJQuery);
} else {
  var jq = window.jQuery ? window.jQuery : window.$;
  if (typeof jq !== 'undefined') {
    applyJQuery(jq);
  }
}

module.exports = applyJQuery;