//This namespace provides the core rendering code for the game
Game.renderer.core = (function(){
	'use strict';
	var canvas = null,
		context = null,
		totalSeconds = 0,
		world = {
			size: 0,
			top: 0,
			left: 0
		};

	//Used to set the size of the canvas to match the size of the browser
	function resizeCanvas(){
		var smallestSize = 0,
			handler = null;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		//Find the upper left corner of the world
		if(canvas.width < canvas.height){
			smallestSize = canvas.width;
			world.size = smallestSize * 0.9;
			world.left = Math.floor(canvas.width * 0.05);
			world.top = (canvas.height - world.size) / 2;
		}else {
			smallestSize = canvas.height;
			world.size = smallestSize * 0.9;
			world.top = Math.floor(canvas.height * 0.05);
			world.left = (canvas.width - world.size) / 2;
		}
	}

	//Clear the whole canvas
	function clearCanvas(){
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	//The initialization of the canvas
	function initialize(){
		canvas = document.getElementById('canvas-main');
		context = canvas.getContext('2d');

		window.addEventListener('resize', function(){
			resizeCanvas();
		}, false);
		window.addEventListener('orientationchange', function(){
			resizeCanvas();
		}, false);
		window.addEventListener('deviceorientation', function(){
			resizeCanvas();
		}, false);

		//Resize the canvas to be the correct size
		resizeCanvas();
	}

	function drawBackground(background){
		if(background.image.isReady){
			background.y += background.speed;
			context.drawImage(background.image, 240, background.y);
			context.drawImage(background.image, 240, background.y + background.speed);
			if(background.y >= -41){
				background.y = -512;
			}
		}
	}

	//Renders the text based on the provided spec
	function drawText(spec){
		context.font = spec.font;
		context.fillStyle = spec.fill;
		context.textBaseline = 'top';

		context.fillText(
			spec.text,
			world.left + spec.pos.x * world.size,
			world.top + spec.pos.y * world.size);
	}

	//This returns the height of the specified font
	function measureTextHeight(spec){
		var height = 0;
		context.save();

		context.font = spec.font;
		context.fillStyle = spec.fill;

		height = context.measureText('m').width / world.size;

		context.restore();

		return height;
	}

	//This returns the width of the specified font
	function measureTextWidth(spec){
		var width = 0;
		context.save();

		context.font = spec.font;
		context.fillStyle = spec.fill;

		width = context.measureText(spec.text).width / world.size;

		context.restore();

		return width;
	}

	//Draw a line segment
	function drawLine(style, pt1, pt2){
		context.strokeStyle = style;
		context.beginPath();
		context.moveTo(
			0.5 + world.left + (pt1.x * world.size),
			0.5 + world.top + (pt1.y * world.size));
		context.lineTo(
			0.5 + world.left + (pt2.x * world.size),
			0.5 + world.top + (pt2.y * world.size));
		context.stroke();
	}

	//Draw a circle
	function drawCircle(style, center, radius){
		//0.5, 0.5 is to ensure an actual 1 pixel line is drawn.
		context.strokeStyle = style;
		context.beginPath();
		context.arc(
			0.5 + world.left + (center.x * world.size),
			0.5 + world.top + (center.y * world.size),
			radius * world.size,
			0, 2 * Math.PI);
		context.stroke();
	}

	//Draws a rectangle
	function drawRectangle(style, left, top, width, height, fillStyle){
		//0.5, 0.5 is to ensure an actual 1 pixel line is drawn.
		context.strokeStyle = style;
		if(fillStyle !== undefined){
			context.fillStyle = fillStyle;
			context.fillRect(
				0.5 + world.left + (left * world.size),
				0.5 + world.top + (top * world.size),
				width * world.size,
				height * world.size);
		} else {
		context.strokeRect(
			0.5 + world.left + (left * world.size),
			0.5 + world.top + (top * world.size),
			width * world.size,
			height * world.size);
		}
	}

	//Draws an image
	function drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
		//Convert from pixel to world coordinates on a few items
		context.drawImage(
			image,
			sx, sy,
			sWidth, sHeight,
			dx * world.size + world.left, dy * world.size + world.top,
			dWidth * world.size, dHeight * world.size);
	}

	return {
		initialize: initialize,
		clearCanvas: clearCanvas,
		drawText: drawText,
		measureTextHeight: measureTextHeight,
		measureTextWidth: measureTextWidth,
		drawLine: drawLine,
		drawRectangle: drawRectangle,
		drawCircle: drawCircle,
		drawImage: drawImage,
		drawBackground: drawBackground
	};

}());
