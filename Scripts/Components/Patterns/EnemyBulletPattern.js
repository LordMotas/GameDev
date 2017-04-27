Game.components.EnemyBulletPattern = function(spec){
	//var math = Game.utilities.math;

	that = {};
	var angle = 0;
	var circles = 0;

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
						}),
						isPlayerBullet : false,
						isEnemyBullet : true,
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
							}),
							isPlayerBullet : false,
							isEnemyBullet : true,
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
							}),
							isPlayerBullet : false,
							isEnemyBullet : true,
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
				for(var i = 0; i < 20; i++){
					bulletSet.push({
						direction : Random.nextHalfCircleVector(1),
						center : {x : spec.center.x, y : spec.center.y},
						moveRate : Random.nextRange(50, 250) /1000
					});
				}

				for(var index in bulletSet){
					bullet = Game.components.Bullet({
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
							}),
							isPlayerBullet : false,
							isEnemyBullet : true,
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
				for(var i = 0; i < 10; i++){
					bulletSet.push({
						direction : Random.nextHalfCircleVector(1),
						center : {x : spec.center.x, y : spec.center.y},
						moveRate : 150 /1000
					});
				}

				for(var index in bulletSet){
					bullet = Game.components.Bullet({
						direction: {x:bulletSet[index].direction.x, y:bulletSet[index].direction.y},
						center: {x:bulletSet[index].center.x, y:bulletSet[index].center.y},
						moveRate : bulletSet[index].moveRate,
						radius: .0375,
						sprite: Game.components.AnimatedSprite({
							spriteSheet: Game.assets['enemy-bullet-red-large'],
							spriteCount: 1,
							spriteTime: [125],
							animationScale: spec.animationScale,
							spriteSize: {width: 0.1, height: 0.1},			// Maintain the size on the sprite
							spriteCenter: {x: bulletSet[index].center.x, y: bulletSet[index].center.y}		// Maintain the center on the sprite
							}),
							isPlayerBullet : false,
							isEnemyBullet : true,
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
				for(var i = 0; i < 30; i++){
					bulletSet.push({
						direction : Random.nextHalfCircleVector(1),
						center : {x : spec.center.x, y : spec.center.y},
						moveRate : Random.nextRange(50, 250) /1000
					});
				}

				for(var index in bulletSet){
					bullet = Game.components.Bullet({
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
							}),
							isPlayerBullet : false,
							isEnemyBullet : true,
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
								spriteSize: {width: 0.1, height: 0.1},			// Maintain the size on the sprite
								spriteCenter: {x: bulletSet[index].center.x, y: bulletSet[index].center.y}		// Maintain the center on the sprite
								}),
								isPlayerBullet : false,
								isEnemyBullet : true,
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
								}),
								isPlayerBullet : false,
								isEnemyBullet : true,
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
								}),
								isPlayerBullet : false,
								isEnemyBullet : true,
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
				for(var i = 0; i < 40; i++){
					bulletSet.push({
						direction : Random.nextHalfCircleVector(1),
						center : {x : spec.center.x, y : spec.center.y},
						moveRate : Random.nextRange(50, 250) /1000
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
							}),
							isPlayerBullet : false,
							isEnemyBullet : true,
					});
					bullet.isAnimated = true;
					bulletArray.push(bullet);
				}
				break;
			//Changing circles
			case 9:
				var bullet;
				Game.music.playRepeatedSounds('Audio/se_tan0');
				var bulletSet = [];

				//Circle in waves
				for(var i = 0; i < 20; i++){
					bulletSet.push({
						direction : Random.nextHalfCircleVector(1),
						center : {x : spec.center.x, y : spec.center.y},
						moveRate : 150 /1000
					});
				}
				if(circles % 9 === 0 || circles % 9 === 1 || circles % 9 === 2){
					for(var index in bulletSet){
						bullet = Game.components.Bullet({
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
								}),
								isPlayerBullet : false,
								isEnemyBullet : true,
						});
						bullet.isAnimated = true;
						bulletArray.push(bullet);
					}
				}
				if(circles % 9 === 3 || circles % 9 === 4 || circles % 9 === 5){
					for(var index in bulletSet){
						bullet = Game.components.Bullet({
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
								}),
								isPlayerBullet : false,
								isEnemyBullet : true,
						});
						bullet.isAnimated = true;
						bulletArray.push(bullet);
					}
				}
				if(circles % 9 === 6 || circles % 9 === 7 || circles % 9 === 8){
					for(var index in bulletSet){
						bullet = Game.components.Bullet({
							direction: {x:bulletSet[index].direction.x, y:bulletSet[index].direction.y},
							center: {x:bulletSet[index].center.x, y:bulletSet[index].center.y},
							moveRate : bulletSet[index].moveRate,
							radius: .0375,
							sprite: Game.components.AnimatedSprite({
								spriteSheet: Game.assets['enemy-bullet-red-large'],
								spriteCount: 1,
								spriteTime: [125],
								animationScale: spec.animationScale,
								spriteSize: {width: 0.1, height: 0.1},			// Maintain the size on the sprite
								spriteCenter: {x: bulletSet[index].center.x, y: bulletSet[index].center.y}		// Maintain the center on the sprite
								}),
								isPlayerBullet : false,
								isEnemyBullet : true,
						});
						bullet.isAnimated = true;
						bulletArray.push(bullet);
					}
				}
				circles++;
				break;
			//Basic pattern + 3 (random)
			case 10:
				var bullet;
				Game.music.playRepeatedSounds('Audio/se_tan0');
				var bulletSet = [];

				//Pure random
				for(var i = 0; i < 50; i++){
					bulletSet.push({
						direction : Random.nextHalfCircleVector(1),
						center : {x : spec.center.x, y : spec.center.y},
						moveRate : Random.nextRange(50, 250) /1000
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
							}),
							isPlayerBullet : false,
							isEnemyBullet : true,
					});
					bullet.isAnimated = true;
					bulletArray.push(bullet);
				}
				break;
			//Final pattern (Double Spiral)
			case 11:
				var bullet;
				Game.music.playRepeatedSounds('Audio/se_tan0');
				var bulletSet = [];

				bulletSet.push({
					direction : {x: Math.cos(angle), y: Math.sin(angle)},
					center : {x : spec.center.x, y : spec.center.y},
					moveRate : 150 /1000
				});
				angle = -(angle);
				bulletSet.push({
					direction : {x: -1*Math.cos(angle), y: -1*Math.sin(angle)},
					center : {x : spec.center.x, y : spec.center.y},
					moveRate : 150 /1000
				});
				angle = -(angle);
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
								}),
								isPlayerBullet : false,
								isEnemyBullet : true,
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
								}),
								isPlayerBullet : false,
								isEnemyBullet : true,
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
								}),
								isPlayerBullet : false,
								isEnemyBullet : true,
						});
						bullet.isAnimated = true;
						bulletArray.push(bullet);
					}
				}
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
