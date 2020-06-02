# Modal Video
Modal Video Library

## Features

- Not affected by dom structure.
- Beautiful transition
- Accessible for keyboard navigation and screen readers.
- Rich options for youtube API and Vimeo API

## Installation
- [npm](https://www.npmjs.com/package/modal-video)
- [standalone](https://raw.githubusercontent.com/appleple/modal-video/master/js/modal-video.js)

via npm
```shell
npm install modal-video --save
```

or yarn

```shell
yarn add modal-video
```

## Short Sample

### Basic

```html
<button class="js-modal-btn" data-video-id="XJS_UYNq4No">Open Video</button>
```

```js
new ModalVideo('.js-modal-video');
```

### Vimeo

```html
<button class="js-modal-btn" data-video-id="202177974">Open Vimeo</button>
```

```js
// import ModalVideo from 'modal-video';
new ModalVideo('.js-modal-video', {channel: 'vimeo'});
```

## Options

About YouTube options, please refer to https://developers.google.com/youtube/player_parameters?hl=en

About Vimeo options, please refer to https://developer.vimeo.com/apis/oembed

<table style="min-width:100%;">
	<tbody><tr>
		<th colspan="2">properties</th>
		<th>default</th>
	</tr>
	<tr>
		<td colspan="2">channel</td>
		<td>'youtube'</td>
	</tr>
	<tr>
		<td rowspan="22">youtube</td>
		<td>autoplay</td>
		<td>1</td>
	</tr>
	<tr>
		<td>cc_load_policy</td>
		<td>1</td>
	</tr>
	<tr>
		<td>color</td>
		<td>null</td>
	</tr>
	<tr>
		<td>controls</td>
		<td>1</td>
	</tr>
	<tr>
		<td>disablekb</td>
		<td>0</td>
	</tr>
	<tr>
		<td>enablejsapi</td>
		<td>0</td>
	</tr>
	<tr>
		<td>end</td>
		<td>null</td>
	</tr>
	<tr>
		<td>fs</td>
		<td>1</td>
	</tr>
	<tr>
		<td>h1</td>
		<td>null</td>
	</tr>
	<tr>
		<td>iv_load_policy</td>
		<td>1</td>
	</tr>
	<tr>
		<td>list</td>
		<td>null</td>
	</tr>
	<tr>
		<td>listType</td>
		<td>null</td>
	</tr>
	<tr>
		<td>loop</td>
		<td>0</td>
	</tr>
	<tr>
		<td>modestbranding</td>
		<td>null</td>
	</tr>
	<tr>
		<td>mute</td>
		<td>0</td>
	</tr>
	<tr>
		<td>origin</td>
		<td>null</td>
	</tr>
	<tr>
		<td>playlist</td>
		<td>null</td>
	</tr>
	<tr>
		<td>playsinline</td>
		<td>null</td>
	</tr>
	<tr>
		<td>rel</td>
		<td>0</td>
	</tr>
	<tr>
		<td>showinfo</td>
		<td>1</td>
	</tr>
	<tr>
		<td>start</td>
		<td>0</td>
	</tr>
	<tr>
		<td>wmode</td>
		<td>'transparent'</td>
	</tr>
	<tr>
		<td>theme</td>
		<td>'dark'</td>
	</tr>
	<tr>
		<td>nocookie</td>
		<td>false</td>
	</tr>
	<tr>
		<td rowspan="15">vimeo</td>
		<td>api</td>
		<td>false</td>
	</tr>
	<tr>
		<td>autopause</td>
		<td>true</td>
	</tr>
	<tr>
		<td>autoplay</td>
		<td>true</td>
	</tr>
	<tr>
		<td>byline</td>
		<td>true</td>
	</tr>
	<tr>
		<td>callback</td>
		<td>null</td>
	</tr>
	<tr>
		<td>color</td>
		<td>null</td>
	</tr>
	<tr>
		<td>controls</td>
		<td>true</td>
	</tr>
	<tr>
		<td>height</td>
		<td>null</td>
	</tr>
	<tr>
		<td>loop</td>
		<td>false</td>
	</tr>
	<tr>
		<td>maxheight</td>
		<td>null</td>
	</tr>
	<tr>
		<td>maxwidth</td>
		<td>null</td>
	</tr>
	<tr>
		<td>player_id</td>
		<td>null</td>
	</tr>
	<tr>
		<td>portrait</td>
		<td>true</td>
	</tr>
	<tr>
		<td>title</td>
		<td>true</td>
	</tr>
	<tr>
		<td>width</td>
		<td>null</td>
	</tr>
	<tr>
		<td>xhtml</td>
		<td>false</td>
	</tr>
	<tr>
		<td colspan="2">ratio</td>
		<td>'16:9'</td>
	</tr>
	<tr>
		<td colspan="2">allowFullScreen</td>
		<td>true</td>
	</tr>
	<tr>
		<td colspan="2">animationSpeed</td>
		<td>300</td>
	</tr>
	<tr>
		<td rowspan="6">classNames</td>
		<td>modalVideo</td>
		<td>'modal-video'</td>
	</tr>
	<tr>
		<td>modalVideoClose</td>
		<td>'modal-video-close'</td>
	</tr>
	<tr>
		<td>modalVideoBody</td>
		<td>'modal-video-body'</td>
	</tr>
	<tr>
		<td>modalVideoInner</td>
		<td>'modal-video-inner'</td>
	</tr>
	<tr>
		<td>modalVideoIframeWrap</td>
		<td>'modal-video-movie-wrap'</td>
	</tr>
	<tr>
		<td>modalVideoCloseBtn</td>
		<td>'modal-video-close-btn'</td>
	</tr>
	<tr>
		<td rowspan="2">aria</td>
		<td>openMessage</td>
		<td>'You just openned the modal video'</td>
	</tr>
	<tr>
		<td>dismissBtnMessage</td>
		<td>'Close the modal by clicking here'</td>
	</tr>
</tbody></table>
