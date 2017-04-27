Game.components.EnemyBulletPattern = function(spec){
	//var math = Game.utilities.math;

	that = {};
	var angle = 0;

	that.makeBullets = function(bulletArray, player){
		switch(spec.bulletPatternType){
			case 1:
				var bullet;
				Game.music.playRepeatedSounds('Audio/se_tan0');
				var bulletSet = [];

				for(var i = 0; i < 4; i++){
					bulletSet.push({
						direction : {x : 0.1*i + .05, y : 0.1},
						center : {x : spec.center.x + 0.01*i + 0.01, y : spec.center.y + 0.05*i},
					});
					bulletSet.push({
						direction : {x : -0.1*i + .05, y : 0.1},
						center : {x : spec.center.x - 0.01*i -0.01, y : spec.center.y + 0.05*i}
					});
				}
				for(var index in bulletSet){
					bullet = Game.components.Bullet({
						direction: {x:bulletSet[index].direction.x, y:bulletSet[index].direction.y},
						center: {x:bulletSet[index].center.x, y:bulletSet[index].center.y},
						radius: .01,
						particleType: 3,
						sprite: Game.components.AnimatedSprite({
							spriteSheet: Game.assets['enemy-bullet-red-small'],
							spriteCount: 1,
							spriteTime: [125],
							animationScale: spec.animationScale,
							spriteSize: {width: 0.015, height: 0.015},			// Maintain the size on the sprite
							spriteCenter: {x: bulletSet[index].center.x, y: bulletSet[index].center.y}		// Maintain the center on the sprite
							})
					});
					bullet.isAnimated = true;
					bulletArray.push(bullet);
				}
				break;
			case 2:
				var bullet;
				Game.music.playRepeatedSounds('Audio/se_tan0');
				var bulletSet = [];
						bulletSet.push({
							direction : {x : 0, y : 0.75},
							center : {x : spec.center.x + 0.01, y : spec.center.y + 0.05}
						});
						bulletSet.push({
							direction : {x : 0, y : 0.75},
							center : {x : spec.center.x - 0.01, y : spec.center.y + 0.05}
						});
				for(var index in bulletSet){
					bullet = Game.components.Bullet({
						direction: {x:bulletSet[index].direction.x, y:bulletSet[index].direction.y},
						center: {x:bulletSet[index].center.x, y:bulletSet[index].center.y},
						radius: .005,
						particleType: 3,
						sprite: Game.components.AnimatedSprite({
							spriteSheet: Game.assets['enemy-bullet-blue-small'],
							spriteCount: 1,
							spriteTime: [125],
							animationScale: spec.animationScale,
							spriteSize: {width: 0.015, height: 0.015},			// Maintain the size on the sprite
							spriteCenter: {x: bulletSet[index].center.x, y: bulletSet[index].center.y}		// Maintain the center on the sprite
							})
					});
					bullet.isAnimated = true;
					bulletArray.push(bullet);
				}
				break;
			case 3:
				var bullet;
				Game.music.playRepeatedSounds('Audio/se_tan0');
				var bulletSet = [];
						bulletSet.push({
							direction : {x : 0, y : 0.75},
							center : {x : spec.center.x + 0.01, y : spec.center.y + 0.05}
						});
						bulletSet.push({
							direction : {x : 0, y : 0.75},
							center : {x : spec.center.x - 0.01, y : spec.center.y + 0.05}
						});
				for(var index in bulletSet){
					bullet = Game.components.Bullet({
						direction: {x:bulletSet[index].direction.x, y:bulletSet[index].direction.y},
						center: {x:bulletSet[index].center.x, y:bulletSet[index].center.y},
						radius: .005,
						particleType: 3,
						sprite: Game.components.AnimatedSprite({
							spriteSheet: Game.assets['enemy-bullet-blue-small'],
							spriteCount: 1,
							spriteTime: [125],
							animationScale: spec.animationScale,
							spriteSize: {width: 0.015, height: 0.015},			// Maintain the size on the sprite
							spriteCenter: {x: bulletSet[index].center.x, y: bulletSet[index].center.y}		// Maintain the center on the sprite
							})
					});
					bullet.isAnimated = true;
					bulletArray.push(bullet);
				}
				break;
			//Start of boss patterns
			//Basic pattern (random)
			case 4:
				var bullet;
				Game.music.playRepeatedSounds('Audio/se_tan0');
				var bulletSet = [];

				//Pure random
				for(var i = 0; i < 50; i++){
					bulletSet.push({
						direction : Random.nextCircleVector(1),
						center : {x : spec.center.x, y : spec.center.y},
						moveRate : Random.nextRange(50, 350) /1000
					});
				}

				for(var index in bulletSet){
					bullet = Game.components.Bullet({
						direction: {x:bulletSet[index].direction.x, y:bulletSet[index].direction.y},
						center: {x:bulletSet[index].center.x, y:bulletSet[index].center.y},
						moveRate : bulletSet[index].moveRate,
						radius: .015,
						sprite: Game.components.AnimatedSprite({
							spriteSheet: Game.assets['enemy-bullet-blue'],
							spriteCount: 1,
							spriteTime: [125],
							animationScale: spec.animationScale,
							spriteSize: {width: 0.03, height: 0.03},			// Maintain the size on the sprite
							spriteCenter: {x: bulletSet[index].center.x, y: bulletSet[index].center.y}		// Maintain the center on the sprite
							})
					});
					bullet.isAnimated = true;
					bulletArray.push(bullet);
				}
				break;
			//Circle in waves
			case 5:
				var bullet;
				Game.music.playRepeatedSounds('Audio/se_tan0');
				var bulletSet = [];

				//Circle in waves
				for(var i = 0; i < 100; i++){
					bulletSet.push({
						direction : Random.nextCircleVector(1),
						center : {x : spec.center.x, y : spec.center.y},
						moveRate : 200 /1000
					});
				}

				for(var index in bulletSet){
					bullet = Game.components.Bullet({
						direction: {x:bulletSet[index].direction.x, y:bulletSet[index].direction.y},
						center: {x:bulletSet[index].center.x, y:bulletSet[index].center.y},
						moveRate : bulletSet[index].moveRate,
						radius: .0015,
						sprite: Game.components.AnimatedSprite({
							spriteSheet: Game.assets['enemy-bullet-red'],
							spriteCount: 1,
							spriteTime: [125],
							animationScale: spec.animationScale,
							spriteSize: {width: 0.03, height: 0.03},			// Maintain the size on the sprite
							spriteCenter: {x: bulletSet[index].center.x, y: bulletSet[index].center.y}		// Maintain the center on the sprite
							})
					});
					bullet.isAnimated = true;
					bulletArray.push(bullet);
				}
				break;
			//Basic pattern + 1 (random)
			case 6:
				var bullet;
				Game.music.playRepeatedSounds('Audio/se_tan0');
				var bulletSet = [];

				//Pure random
				for(var i = 0; i < 100; i++){
					bulletSet.push({
						direction : Random.nextCircleVector(1),
						center : {x : spec.center.x, y : spec.center.y},
						moveRate : Random.nextRange(50, 350) /1000
					});
				}

				for(var index in bulletSet){
					bullet = Game.components.Bullet({
						direction: {x:bulletSet[index].direction.x, y:bulletSet[index].direction.y},
						center: {x:bulletSet[index].center.x, y:bulletSet[index].center.y},
						moveRate : bulletSet[index].moveRate,
						radius: .0015,
						sprite: Game.components.AnimatedSprite({
							spriteSheet: Game.assets['enemy-bullet-blue'],
							spriteCount: 1,
							spriteTime: [125],
							animationScale: spec.animationScale,
							spriteSize: {width: 0.03, height: 0.03},			// Maintain the size on the sprite
							spriteCenter: {x: bulletSet[index].center.x, y: bulletSet[index].center.y}		// Maintain the center on the sprite
							})
					});
					bullet.isAnimated = true;
					bulletArray.push(bullet);
				}
				break;
			//Spiral pattern
			case 7:
				var bullet;
				Game.music.playRepeatedSounds('Audio/se_tan0');
				var bulletSet = [];

				//Harder pattern
				bulletSet.push({
					direction : {x: Math.cos(angle), y: Math.sin(angle)},
					center : {x : spec.center.x, y : spec.center.y},
					moveRate : 150 /1000
				});
				angle++;

				for(var index in bulletSet){
					if(angle % 3 === 0){
						var bullet = Game.components.Bullet({
							direction: {x:bulletSet[index].direction.x, y:bulletSet[index].direction.y},
							center: {x:bulletSet[index].center.x, y:bulletSet[index].center.y},
							moveRate : bulletSet[index].moveRate,
							radius: .0375,
							sprite: Game.components.AnimatedSprite({
								spriteSheet: Game.assets['enemy-bullet-red-large'],
								spriteCount: 1,
								spriteTime: [125],
								animationScale: spec.animationScale,
								spriteSize: {width: 0.075, height: 0.075},			// Maintain the size on the sprite
								spriteCenter: {x: bulletSet[index].center.x, y: bulletSet[index].center.y}		// Maintain the center on the sprite
								})
						});
						bullet.isAnimated = true;
						bulletArray.push(bullet);
					} else if(angle % 2 === 0){
						var bullet = Game.components.Bullet({
							direction: {x:bulletSet[index].direction.x, y:bulletSet[index].direction.y},
							center: {x:bulletSet[index].center.x, y:bulletSet[index].center.y},
							moveRate : bulletSet[index].moveRate,
							radius: .015,
							sprite: Game.components.AnimatedSprite({
								spriteSheet: Game.assets['enemy-bullet-red'],
								spriteCount: 1,
								spriteTime: [125],
								animationScale: spec.animationScale,
								spriteSize: {width: 0.03, height: 0.03},			// Maintain the size on the sprite
								spriteCenter: {x: bulletSet[index].center.x, y: bulletSet[index].center.y}		// Maintain the center on the sprite
								})
						});
						bullet.isAnimated = true;
						bulletArray.push(bullet);
					} else {
						var bullet = Game.components.Bullet({
							direction: {x:bulletSet[index].direction.x, y:bulletSet[index].direction.y},
							center: {x:bulletSet[index].center.x, y:bulletSet[index].center.y},
							moveRate : bulletSet[index].moveRate,
							radius: .0075,
							sprite: Game.components.AnimatedSprite({
								spriteSheet: Game.assets['enemy-bullet-red-small'],
								spriteCount: 1,
								spriteTime: [125],
								animationScale: spec.animationScale,
								spriteSize: {width: 0.015, height: 0.015},			// Maintain the size on the sprite
								spriteCenter: {x: bulletSet[index].center.x, y: bulletSet[index].center.y}		// Maintain the center on the sprite
								})
						});
						bullet.isAnimated = true;
						bulletArray.push(bullet);
					}
				}
				break;
			//Basic pattern + 2 (random)
			case 8:
				var bullet;
				Game.music.playRepeatedSounds('Audio/se_tan0');
				var bulletSet = [];

				//Pure random
				for(var i = 0; i < 150; i++){
					bulletSet.push({
						direction : Random.nextCircleVector(1),
						center : {x : spec.center.x, y : spec.center.y},
						moveRate : Random.nextRange(50, 350) /1000
					});
				}

				for(var index in bulletSet){
					bullet = Game.components.Bullet({
						direction: {x:bulletSet[index].direction.x, y:bulletSet[index].direction.y},
						center: {x:bulletSet[index].center.x, y:bulletSet[index].center.y},
						moveRate : bulletSet[index].moveRate,
						radius: .0015,
						sprite: Game.components.AnimatedSprite({
							spriteSheet: Game.assets['enemy-bullet-blue'],
							spriteCount: 1,
							spriteTime: [125],
							animationScale: spec.animationScale,
							spriteSize: {width: 0.03, height: 0.03},			// Maintain the size on the sprite
							spriteCenter: {x: bulletSet[index].center.x, y: bulletSet[index].center.y}		// Maintain the center on the sprite
							})
					});
					bullet.isAnimated = true;
					bulletArray.push(bullet);
				}
				break;
			//Harder move
			case 9:
				break;
			//Basic pattern + 3 (random)
			case 10:
				var bullet;
				Game.music.playRepeatedSounds('Audio/se_tan0');
				var bulletSet = [];

				//Pure random
				for(var i = 0; i < 200; i++){
					bulletSet.push({
						direction : Random.nextCircleVector(1),
						center : {x : spec.center.x, y : spec.center.y},
						moveRate : Random.nextRange(50, 350) /1000
					});
				}

				for(var index in bulletSet){
					bullet = Game.components.Bullet({
						direction: {x:bulletSet[index].direction.x, y:bulletSet[index].direction.y},
						center: {x:bulletSet[index].center.x, y:bulletSet[index].center.y},
						moveRate : bulletSet[index].moveRate,
						radius: .0015,
						sprite: Game.components.AnimatedSprite({
							spriteSheet: Game.assets['enemy-bullet-blue'],
							spriteCount: 1,
							spriteTime: [125],
							animationScale: spec.animationScale,
							spriteSize: {width: 0.03, height: 0.03},			// Maintain the size on the sprite
							spriteCenter: {x: bulletSet[index].center.x, y: bulletSet[index].center.y}		// Maintain the center on the sprite
							})
					});
					bullet.isAnimated = true;
					bulletArray.push(bullet);
				}
				break;
			//Final pattern
			case 11:
				break;
			default:
				break;

		}
	}

	that.getPattern = function(){
		return bullets;
	}



	return that;
}
