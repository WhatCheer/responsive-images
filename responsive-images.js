if( 'undefined' == typeof WhatCheer ) { window.WhatCheer = {}; }
WhatCheer.Responsive = {

	getWindowWidth: function () {
		var width = null;
		// IE
		if (document.body && document.body.offsetWidth) {
			width = document.body.offsetWidth;
		}
		if (document.compatMode=='CSS1Compat' && document.documentElement && document.documentElement.offsetWidth) {
			width = document.documentElement.offsetWidth;
		}
		// Everyone else
		if (window.innerWidth && window.innerHeight) {
			width = window.innerWidth;
		}
		return width;
	},

	updateImages: function () {
		var width  = WhatCheer.Responsive.getWindowWidth(),
				images = document.getElementsByTagName( 'img' ),
		    format = null,
		    breaks = null,
		    size   = null,
		    name   = null,
		    path   = null,
				i = 0,
				j = 0;

		for( i = 0; i < images.length; ++i ) {
			format = images[i].getAttribute('data-format');
			breaks = images[i].getAttribute('data-breaks');
			if( format && breaks ) {
				breaks = breaks.split(';');
				for( j = 0; j < breaks.length; ++j ) {
					if( -1 == breaks[j].indexOf( ':' ) ) {
					  size = parseInt( breaks[j] );
						name = breaks[j];
					}
					else {
						size = parseInt( breaks[j].slice( 0, breaks[j].indexOf( ':' ) ) )
						name = breaks[j].slice( breaks[j].indexOf( ':' ) + 1 )
					}
					if( size < width ) {
						path = format.replace( '{s}', name );
						if( images[i].src != path ) {
							( function () {
								var tmp = new Image(),
										img = images[i],
										src = path;
								tmp.onload = function () {
									img.src = src;
									delete tmp;
								}
								tmp.onerror = function () {
									delete tmp;
								}
								tmp.src = src;
							} ).call();
						}
						break;
					}
				}
			}
		}
	}
};
