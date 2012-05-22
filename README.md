# What is this?

This repository holds What Cheer's spin on the JavaScript solution to the [responsive](http://www.bram.us/2012/03/01/the-slow-elephant-in-the-responsive-images-room/) [images](http://blog.cloudfour.com/the-real-conflict-behind-picture-and-srcset/) [problem](http://www.alistapart.com/articles/responsive-images-and-web-standards-at-the-turning-point/).

Our JavaScript follows the existing pattern of storing the sizes in DOM attributes, similar to projects like [HiSRC](https://github.com/teleject/hisrc), but with the twist of having only two attributes.

We have used this code in production but it is still a little wobbly, so YMMV.

# How do I use it?

This is a full client side/markup solution, so you'd better be able to edit all your HTML. If you can't, or need something a little more automatic, perhaps [Adaptive Images](http://adaptive-images.com/).

## The JavaScript

This library has no dependencies, so you can just drop in <tt>responsive-images.min.js</tt> and then call <tt>WhatCheer.Responsive.updateImages</tt> whenever you need to.  Here's an example:

```html
<script src="responsive-images.min.js"></script>
<script>
	window.onresize = WhatCheer.Responsive.updateImages;
	document.body.onload = WhatCheer.Responsive.updateImages;
</script>
```

You may find it better to de-bounce your <tt>window.onresize</tt> calls a bit.  The code to prevent multiple requests for image assets does not exist, so it's your responsibility, if you care.

```html
<script>
	( function () {
		WhatCheer.Responsive.updateImages();
		var resizeDebounce = null;
		window.onresize = function () {
			window.clearTimeout( resizeDebounce );
			resizeDebounce = window.setTimeout( WhatCheer.Responsive.updateImages, 150 );
		};
	} );
</script>
```

## The Markup

Your HTML communicates to the script through two attributes, <tt>data-format</tt> and <tt>data-breaks</tt>.

### data-format

This attribute communicates the format of the path for image versions.  We assume you keep all of your files together in one place and have a reasonable, consistent naming scheme.

In the path format string any instances of the string <tt>{{s}}</tt> will be replaced with the breakpoint name to create the final path for a file.

```html
<img data-format="images/{{s}}.png" />
```

### data-breaks

This attribute specifies the width-based breakpoints for images.  These breakpoints are given in pixel values, with a semicolon <tt>;</tt> delimeter.  They should proceed from largest to smallest.

```html
<img data-breaks="900;600;400" />
```

Optionally these breakpoints can have name strings, which are separated from the size value by a colon <tt>:</tt>.

```html
<img data-breaks="900;600:medium;400" />
```

# Examples

## Regular

```html
<!doctype html>
<html>
	<head>
		<title>Responsive Images</title>
	</head>
	<body>
		<img src="images/400.jpg" data-format="images/{s}.jpg" data-breaks="900;600:medium;400" />
		<script src="responsive-images.min.js"></script>
		<script>
			window.onresize = WhatCheer.Responsive.updateImages;
			document.body.onload = WhatCheer.Responsive.updateImages;
		</script>
	</body>
</html>
```

## Weird Files All Over The Place

```html
<!doctype html>
<html>
	<head>
		<title>Responsive Images</title>
	</head>
	<body>
		<img src="images/400.jpg" data-format="{s}" data-breaks="900:http://google.com/secret-files/900.jpg;600:http://loljk.s3.aws.com/medium.jpg;400:images/400.jpg" />
		<script src="responsive-images.min.js"></script>
		<script>
			window.onresize = WhatCheer.Responsive.updateImages;
			document.body.onload = WhatCheer.Responsive.updateImages;
		</script>
	</body>
</html>
```

# Contributing

We aren't perfect.  If you see a bug, please let us know via the issues tab!

