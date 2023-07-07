'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('custom-event-polyfill');

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _util = require('../lib/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// const assign = require('es6-object-assign').assign;

var defaults = {
  channel: 'youtube',
  facebook: {},
  youtube: {
    autoplay: 1,
    cc_load_policy: 1,
    color: null,
    controls: 1,
    disablekb: 0,
    enablejsapi: 0,
    end: null,
    fs: 1,
    h1: null,
    iv_load_policy: 1,
    loop: 0,
    modestbranding: null,
    mute: 0,
    origin: null,
    playsinline: null,
    rel: 0,
    showinfo: 1,
    start: 0,
    wmode: 'transparent',
    theme: 'dark',
    nocookie: false
  },
  ratio: '16:9',
  vimeo: {
    api: false,
    autopause: true,
    autoplay: true,
    byline: true,
    callback: null,
    color: null,
    controls: true,
    height: null,
    loop: false,
    maxheight: null,
    maxwidth: null,
    muted: false,
    player_id: null,
    portrait: true,
    title: true,
    width: null,
    xhtml: false
  },
  allowFullScreen: true,
  allowAutoplay: true,
  animationSpeed: 300,
  classNames: {
    modalVideo: 'modal-video',
    modalVideoClose: 'modal-video-close',
    modalVideoBody: 'modal-video-body',
    modalVideoInner: 'modal-video-inner',
    modalVideoIframeWrap: 'modal-video-movie-wrap',
    modalVideoCloseBtn: 'modal-video-close-btn'
  },
  handleClassName: {
    modalVideoDismissBtn: 'js-modal-video-dismiss-btn'
  },
  aria: {
    openMessage: 'You just openned the modal video',
    dismissBtnMessage: 'Close the modal by clicking here'
  }
};

var ModalVideo = function () {
  function ModalVideo(ele, option) {
    _classCallCheck(this, ModalVideo);

    // Member variable
    this.opt = (0, _deepmerge2.default)(defaults, option);
    this.id = (0, _util.getUniqId)();
    this.boundIsModal = this.isModal.bind(this);
    this.selectors = typeof ele === 'string' ? document.querySelectorAll(ele) : ele;

    // Main methods
    this.add();
  }

  _createClass(ModalVideo, [{
    key: 'isModal',
    value: function isModal(event) {
      var _this = this;

      var selector = event.target;
      if (selector.tagName === 'A') {
        event.preventDefault();
      }

      // modal append
      var videoId = event.target.dataset.videoId;
      var channel = selector.dataset.channel || this.opt.channel;
      var videoUrl = selector.dataset.videoUrl || this.getVideoUrl(this.opt, channel, videoId);
      var body = document.querySelector('body');
      var html = this.getHtml(videoUrl);
      (0, _util.append)(body, html);

      // modal Handling
      var modal = document.getElementById(this.id);
      var btn = modal.querySelector('.' + this.opt.handleClassName.modalVideoDismissBtn);
      modal.focus();

      var timeout = void 0; // used for resize
      var resizeModalVideoWhenHeightGreaterThanWindowHeight = function resizeModalVideoWhenHeightGreaterThanWindowHeight() {
        clearTimeout(timeout);
        // Resize modal-video-iframe-wrap when window size changed when the height of the video is greater than the height of the window.
        timeout = setTimeout(function () {
          var width = _this.getWidthFulfillAspectRatio(_this.opt.ratio, window.innerHeight, window.innerWidth);
          var modalVideoInner = document.getElementById('modal-video-inner-' + _this.id);
          if (modalVideoInner.style.maxWidth !== width) {
            modalVideoInner.style.maxWidth = width;
          }
        }, 10);
      };
      modal.addEventListener('click', function () {
        (0, _util.addClass)(modal, _this.opt.classNames.modalVideoClose);
        window.removeEventListener('resize', resizeModalVideoWhenHeightGreaterThanWindowHeight());
        setTimeout(function () {
          (0, _util.remove)(modal);
          selector.focus();
        }, _this.opt.animationSpeed);
      });
      modal.addEventListener('keydown', function (e) {
        if (e.which === 9) {
          e.preventDefault();
          if (document.activeElement === modal) {
            btn.focus();
          } else {
            modal.setAttribute('aria-label', '');
            modal.focus();
          }
        }
        if (e.key === 'Escape') {
          (0, _util.triggerEvent)(modal, 'click');
        }
      });
      window.addEventListener('resize', resizeModalVideoWhenHeightGreaterThanWindowHeight());
      btn.addEventListener('click', function () {
        (0, _util.triggerEvent)(modal, 'click');
      });
    }

    /**
    * Calculate the width of the video fulfill aspect ratio.
    * When the height of the video is greater than the height of the window,
    * this function return the width that fulfill the aspect ratio for the height of the window.
    * In other cases, this function return '100%'(the height relative to the width is determined by css).
    *
    * @param string ratio
    * @param number maxHeight
    * @param number maxWidth
    * @returns string
    */

  }, {
    key: 'getWidthFulfillAspectRatio',
    value: function getWidthFulfillAspectRatio(ratio, maxHeight, maxWidth) {
      var arr = ratio.split(':');
      var width = Number(arr[0]);
      var height = Number(arr[1]);

      // Height that fulfill the aspect ratio for maxWidth.
      var videoHeight = maxWidth * (height / width);

      if (maxHeight < videoHeight) {
        // when the height of the video is greater than the height of the window.
        // calculate the width that fulfill the aspect ratio for the height of the window.

        // ex: 16:9 aspect ratio
        // 16:9 = width : height
        // → width = 16 / 9 * height
        return Math.floor(width / height * maxHeight) + 'px';
      }

      return '100%';
    }
  }, {
    key: 'getQueryString',
    value: function getQueryString(obj) {
      var url = '';
      Object.keys(obj).forEach(function (key) {
        url += key + '=' + obj[key] + '&';
      });
      return url.substr(0, url.length - 1);
    }
  }, {
    key: 'getVideoUrl',
    value: function getVideoUrl(opt, channel, videoId) {
      if (channel === 'youtube') {
        return this.getYoutubeUrl(opt.youtube, videoId);
      } else if (channel === 'vimeo') {
        return this.getVimeoUrl(opt.vimeo, videoId);
      } else if (channel === 'facebook') {
        return this.getFacebookUrl(opt.facebook, videoId);
      } else if (channel === 'custom') {
        return opt.url;
      }
      return '';
    }
  }, {
    key: 'getVimeoUrl',
    value: function getVimeoUrl(vimeo, videoId) {
      var query = this.getQueryString(vimeo);
      return '//player.vimeo.com/video/' + videoId + '?' + query;
    }
  }, {
    key: 'getYoutubeUrl',
    value: function getYoutubeUrl(youtube, videoId) {
      var query = this.getQueryString(youtube);
      if (youtube.nocookie === true) {
        return '//www.youtube-nocookie.com/embed/' + videoId + '?' + query;
      }
      return '//www.youtube.com/embed/' + videoId + '?' + query;
    }
  }, {
    key: 'getFacebookUrl',
    value: function getFacebookUrl(facebook, videoId) {
      return '//www.facebook.com/v2.10/plugins/video.php?href=https://www.facebook.com/facebook/videos/' + videoId + '&' + this.getQueryString(facebook);
    }
  }, {
    key: 'add',
    value: function add() {
      var _this2 = this;

      var eacquisition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (eacquisition) {
        this.selectors = typeof this.selectors === 'string' ? document.querySelectorAll(this.selectors) : this.selectors;
      }
      console.log(this.selectors);
      Array.from(this.selectors).forEach(function (selector) {
        selector.addEventListener('click', _this2.boundIsModal);
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this3 = this;

      Array.from(this.selectors).forEach(function (selector) {
        selector.removeEventListener('click', _this3.boundIsModal);
      });
    }
  }, {
    key: 'getPadding',
    value: function getPadding(ratio) {
      var arr = ratio.split(':');
      var width = Number(arr[0]);
      var height = Number(arr[1]);
      var padding = height * 100 / width;
      return padding + '%';
    }
  }, {
    key: 'getHtml',
    value: function getHtml(videoUrl) {
      var padding = this.getPadding(this.opt.ratio);

      return '\n      <div class="' + this.opt.classNames.modalVideo + '" tabindex="-1" role="dialog" aria-label="' + this.opt.aria.openMessage + '" id="' + this.id + '">\n        <div class="' + this.opt.classNames.modalVideoBody + '">\n          <div class="' + this.opt.classNames.modalVideoInner + '" id="modal-video-inner-' + this.id + '">\n            <div class="' + this.opt.classNames.modalVideoIframeWrap + '" style="padding-bottom:' + padding + '">\n            <button class="' + this.opt.classNames.modalVideoCloseBtn + ' ' + this.opt.handleClassName.modalVideoDismissBtn + '" aria-label="' + this.opt.aria.dismissBtnMessage + '"></button>\n              <iframe width=\'460\' height=\'230\' src="' + videoUrl + '" frameborder=\'0\' allowfullscreen=' + this.opt.allowFullScreen + ' tabindex="-1" allow="' + (this.opt.allowAutoplay ? 'autoplay;' : '') + ' accelerometer; encrypted-media; gyroscope; picture-in-picture" />\n\n            </div>\n          </div>\n        </div>\n      </div>\n    ';
    }
  }]);

  return ModalVideo;
}();

exports.default = ModalVideo;
module.exports = exports['default'];