const defaults = {
  channel: 'youtube',
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
    list: null,
    listType: null,
    loop: 0,
    modestbranding: null,
    origin: null,
    playlist: null,
    playsinline: null,
    rel: 0,
    showinfo: 1,
    start: 0,
    wmode: 'transparent',
    theme: 'dark'
  },
  ratio: '16:9',
  vimeo: {
    api: false,
    autopause: true,
    autoplay: true,
    byline: true,
    callback: null,
    color: null,
    height: null,
    loop: false,
    maxheight: null,
    maxwidth: null,
    player_id: null,
    portrait: true,
    title: true,
    width: null,
    xhtml: false
  },
  allowFullScreen: true,
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
}

export default class ModalVideo {

  constructor (opt) {
    const selectors = typeof ele === 'string' ? document.querySelectorAll(ele) : ele;
    [].forEach.call(selectors, (selector, index) => {
      selector.dataset('video-id', videoId);
      selector.addEventListener('click', () => {
        
      });
    });
  }

  getPadding (ratio) {
    const arr = ratio.split(':');
    const width = Number(arr[0]);
    const height = Number(arr[1]);
    const padding = height * 100 / width;
    return `${padding}%`;
  }

  getQueryString (obj) {
    let url = "";
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] !== null) {
          url += `${key}=${obj[key]}&`;
        }
      }
    }
    return url.substr(0, url.length - 1);
  }

  getVideourl (opt, videoId) {
    if (opt.channel === 'youtube') {
      return this.getYoutubeUrl(opt.youtube, videoId);
    } else if (opt.channel === 'vimeo') {
      return this.getVimeoUrl(opt.vimeo, videoId);
    }
  }

  getVimeoUrl (vimeo, videoId) {
    const query = this.getQueryString(vimeo);
    return `//player.vimeo.com/video/${videoId}?${query}`;
  }

  getYoutubeUrl (youtube, videoId) {
    const query = this.getQueryString(youtube);
    return `//www.youtube.com/embed/${videoId}?${query}`;
  }

  gethtml (opt, videoId) {
    const videoUrl = this.getVideoUrl(opt, videoId);
    const padding = this.getPadding(opt.ratio);
    const classNames = opt.classNames;
    return (`
      <div class="${classNames.modalVideo}" tabindex="-1" role="dialog" aria-label="${opt.aria.openMessage}">
        <div class="${classNames.modalVideoBody}">
          <div class="${classNames.modalVideoInner}">
            <div class="${classNames.modalVideoIframeWrap}" style="padding-bottom:${padding}">
              <button class="${classNames.modalVideoCloseBtn} js-modal-video-dismiss-btn" aria-label="${opt.aria.dismissBtnMessage}"/>
              <iframe width='460' height='230' src="${videoUrl}" frameborder='0' allowfullscreen=${opt.allowFullScreen} tabindex="-1"/>
            </div>
          </div>
        </div>
      </div>
    `);
  }
}


