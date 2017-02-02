/*!
 * modal-video Ver.0.0.1 (https://www.appleple.com)
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

}));
