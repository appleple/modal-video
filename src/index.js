/*!
 * modal-video Ver.1.0.0 (https://www.appleple.com)
 * Copyright appleple | MIT License
 *
 */
;(function umd(factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
}(function modalVideo($) {

	const defaults = {
		channel:'youtube',
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

	function getQueryString (obj) {
		let url = "";
		for(var key in obj){
			if(obj.hasOwnProperty(key)){
				if(obj[key] !== null){
					url += `${key}=${obj[key]}&`;
				}
			}
		}
		return url.substr(0, url.length - 1);
	}


	function getYoutubeUrl (youtube, videoId) {
		const query = getQueryString(youtube);
		return `//www.youtube.com/embed/${videoId}?${query}`;
	}

	function getVimeoUrl (vimeo, videoId) {
		const query = getQueryString(vimeo);
		return `//player.vimeo.com/video/${videoId}?${query}`;
	}

	function getVideoUrl (opt,videoId) {
		if(opt.channel === 'youtube'){
			return getYoutubeUrl(opt.youtube, videoId);
		}else if(opt.channel === 'vimeo'){
			return getVimeoUrl(opt.vimeo, videoId);
		}
	}

	function getPadding (ratio) {
		const arr = ratio.split(':');
		const width = Number(arr[0]);
		const height = Number(arr[1]);
		const padding = height * 100 / width;
		return `${padding}%`;
	}

	function getHtml(opt,videoId) {
		const videoUrl = getVideoUrl(opt,videoId);
		const padding = getPadding(opt.ratio);
		return `
					<div class="${opt.classNames.modalVideo}" tabindex="-1" role="dialog" aria-label="${opt.aria.openMessage}">
						<div class="${opt.classNames.modalVideoBody}">
							<div class="${opt.classNames.modalVideoInner}">
								<div class="${opt.classNames.modalVideoIframeWrap}" style="padding-bottom:${padding}">
									<button class="${opt.classNames.modalVideoCloseBtn} js-modal-video-dismiss-btn" aria-label="${opt.aria.dismissBtnMessage}"/>
									<iframe width='460' height='230' src="${videoUrl}" frameborder='0' allowfullscreen=${opt.allowFullScreen} tabindex="-1"/>
								</div>
							</div>
						</div>
					</div>
			`;
	}

	$.fn.modalVideo = function(opt){
		opt = $.extend({}, defaults, opt);
		$(this).each(function(){
			if(!$(this).data('video-id')){
				$(this).data('video-id',opt.videoId);
			}
		});
		$(this).click(function(){
			const $me = $(this);
			const videoId = $me.data('video-id');
			const html = getHtml(opt,videoId);
			const $modal = $(html);
			const $btn = $modal.find('.js-modal-video-dismiss-btn');
			const speed = opt.animationSpeed;
			$('body').append($modal);
			$modal.focus();
			$modal.on('click',function(){
				const $self = $(this);
				$self.addClass(opt.classNames.modalVideoClose);
				$self.off('click');
				$self.off('keydown');
				$btn.off('click');
				setTimeout(function(){
					$self.remove();
					$me.focus();
				},speed);
			});
			$btn.on('click',function(){
				$modal.trigger('click');
			});
			$modal.on('keydown',function(e){
				if (e.which === 9) {
					e.preventDefault();
					if($modal.is(':focus')){
						$btn.focus();
					}else{
						$modal.attr('aria-label','');
						$modal.focus();
					}
				}
			});
		});
	}
}));
