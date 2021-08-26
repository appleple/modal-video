import 'custom-event-polyfill';

import {
  append,
  remove,
  getUniqId,
  addClass,
  triggerEvent
} from '../lib/util';

const assign = require('es6-object-assign').assign;

const defaults = {
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
  aria: {
    openMessage: 'You just openned the modal video',
    dismissBtnMessage: 'Close the modal by clicking here'
  }
};

export default class ModalVideo {

  constructor(ele, option) {
    const opt = assign({}, defaults, option);
    const selectors = typeof ele === 'string' ? document.querySelectorAll(ele) : ele;
    const body = document.querySelector('body');
    const classNames = opt.classNames;
    const speed = opt.animationSpeed;
    [].forEach.call(selectors, (selector) => {
      selector.addEventListener('click', (event) => {
        if (selector.tagName === 'A') {
          event.preventDefault();
        }
        const videoId = selector.dataset.videoId;
        const channel = selector.dataset.channel || opt.channel;
        const id = getUniqId();
        const videoUrl = selector.dataset.videoUrl || this.getVideoUrl(opt, channel, videoId);
        const html = this.getHtml(opt, videoUrl, id);
        append(body, html);
        const modal = document.getElementById(id);
        const btn = modal.querySelector('.js-modal-video-dismiss-btn');
        let timeout; // used for resize
        const resizeModalVideoWhenHeightGreaterThanWindowHeight = () => {
          clearTimeout(timeout);
          // Resize modal-video-iframe-wrap when window size changed when the height of the video is greater than the height of the window.
          timeout = setTimeout(() => {
            const width = this.getWidthFulfillAspectRatio(opt.ratio, window.innerHeight, window.innerWidth);

            const modalVideoInner = document.getElementById(`modal-video-inner-${id}`);
            if (modalVideoInner.style.maxWidth !== width) {
              modalVideoInner.style.maxWidth = width;
            }
          }, 10);
        };
        modal.focus();
        modal.addEventListener('click', () => {
          addClass(modal, classNames.modalVideoClose);
          window.removeEventListener('resize', resizeModalVideoWhenHeightGreaterThanWindowHeight);
          setTimeout(() => {
            remove(modal);
            selector.focus();
          }, speed);
        });
        modal.addEventListener('keydown', (e) => {
          if (e.which === 9) {
            e.preventDefault();
            if (document.activeElement === modal) {
              btn.focus();
            } else {
              modal.setAttribute('aria-label', '');
              modal.focus();
            }
          }
        });
        window.addEventListener('resize', resizeModalVideoWhenHeightGreaterThanWindowHeight);
        btn.addEventListener('click', () => {
          triggerEvent(modal, 'click');
        });
      });
    });
  }

  getPadding(ratio) {
    const arr = ratio.split(':');
    const width = Number(arr[0]);
    const height = Number(arr[1]);
    const padding = height * 100 / width;
    return `${padding}%`;
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
  getWidthFulfillAspectRatio(ratio, maxHeight, maxWidth) {
    const arr = ratio.split(':');
    const width = Number(arr[0]);
    const height = Number(arr[1]);

    // Height that fulfill the aspect ratio for maxWidth.
    const videoHeight = maxWidth * (height / width);

    if (maxHeight < videoHeight) {
      // when the height of the video is greater than the height of the window.
      // calculate the width that fulfill the aspect ratio for the height of the window.

      // ex: 16:9 aspect ratio
      // 16:9 = width : height
      // → width = 16 / 9 * height
      return `${Math.floor(width / height * maxHeight)}px`;
    }

    return '100%';
  }

  getQueryString(obj) {
    let url = '';
    Object.keys(obj)
      .forEach((key) => {
        url += `${key}=${obj[key]}&`;
      });
    return url.substr(0, url.length - 1);
  }

  getVideoUrl(opt, channel, videoId) {
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

  getVimeoUrl(vimeo, videoId) {
    const query = this.getQueryString(vimeo);
    return `//player.vimeo.com/video/${videoId}?${query}`;
  }

  getYoutubeUrl(youtube, videoId) {
    const query = this.getQueryString(youtube);
    if (youtube.nocookie === true) {
      return `//www.youtube-nocookie.com/embed/${videoId}?${query}`;
    }

    return `//www.youtube.com/embed/${videoId}?${query}`;
  }

  getFacebookUrl(facebook, videoId) {
    return `//www.facebook.com/v2.10/plugins/video.php?href=https://www.facebook.com/facebook/videos/${videoId}&${this.getQueryString(facebook)}`;
  }

  getHtml(opt, videoUrl, id) {
    const padding = this.getPadding(opt.ratio);
    const classNames = opt.classNames;
    return (`
      <div class="${classNames.modalVideo}" tabindex="-1" role="dialog" aria-label="${opt.aria.openMessage}" id="${id}">
        <div class="${classNames.modalVideoBody}">
          <div class="${classNames.modalVideoInner}" id="modal-video-inner-${id}">
            <div class="${classNames.modalVideoIframeWrap}" style="padding-bottom:${padding}">
              <button class="${classNames.modalVideoCloseBtn} js-modal-video-dismiss-btn" aria-label="${opt.aria.dismissBtnMessage}"></button>
              <iframe width='460' height='230' src="${videoUrl}" frameborder='0' allowfullscreen=${opt.allowFullScreen} tabindex="-1" allow="${opt.allowAutoplay ? 'autoplay;' : ''} accelerometer; encrypted-media; gyroscope; picture-in-picture" />
            </div>
          </div>
        </div>
      </div>
    `);
  }
}
