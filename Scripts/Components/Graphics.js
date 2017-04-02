

Game.components.Graphics = (function(){
	var canvas = document.getElementById('canvas-main');
	var context = canvas.getContext('2d');

	CanvasRenderingContext2D.prototype.clear = function() {
		this.save();
		this.setTransform(1, 0, 0, 1, 0, 0);
		this.clearRect(0, 0, canvas.width, canvas.height);
		this.restore();
	};

	function clear(){
		context.clear();
	}

	function Texture(spec){
		var that = {};
		var ready = false;
		var image = new Image();

		image.onload = function(){
			ready = true;
		};

		image.src = spec.image;

		that.draw = function() {
			if(ready){
				context.save();
				context.drawImage(
					image,
					spec.center.x - spec.width/2,
					spec.center.y - spec.height/2,
					spec.width,spec.height);

					context.restore();
				)
			};
			return that;
		}

		return {
			clear:clear,
			Texture:Texture
		};
	}());

})
