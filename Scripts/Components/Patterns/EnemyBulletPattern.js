

Game.components.EnemyBulletPattern = function(spec){
	//var math = Game.utilities.math;

	that = {};
	
	that.makeBullets = function(bulletArray, player){
		switch(spec.bulletPatternType){
			case 1:
				var bullet;
				Game.music.playRepeatedSounds('Audio/se_shot');
				var bulletSet = [];

				for(var i = 0; i < 4; i++){
					bulletSet.push({
						direction : {x : 0.1*i, y : 0.1},
						center : {x : spec.center.x + 0.01*i + 0.01, y : spec.center.y + 0.05*i},
					});
					bulletSet.push({
						direction : {x : -0.1*i, y : 0.1},
						center : {x : spec.center.x - 0.01*i -0.01, y : spec.center.y + 0.05*i}
					});
				}
				for(var index in bulletSet){
					bullet = Game.components.Bullet({
						direction: {x:bulletSet[index].direction.x, y:bulletSet[index].direction.y},
						center: {x:bulletSet[index].center.x, y:bulletSet[index].center.y},
						radius: .01,
						sprite: Game.components.AnimatedSprite({
							spriteSheet: Game.assets['enemy-bullet-red-small'],
							spriteCount: 1,
							spriteTime: [125],// 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125],
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
				Game.music.playRepeatedSounds('Audio/se_shot');
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
						sprite: Game.components.AnimatedSprite({
							spriteSheet: Game.assets['animated-player-bullet'],
							spriteCount: 12,
							spriteTime: [125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125],
							animationScale: spec.animationScale,
							spriteSize: {width: 0.05, height: 0.05},			// Maintain the size on the sprite
							spriteCenter: {x: bulletSet[index].center.x, y: bulletSet[index].center.y}		// Maintain the center on the sprite
							})
					});
					bullet.isAnimated = true;
					bulletArray.push(bullet);
				}
				break;
			case 3:
				var bullet;
				Game.music.playRepeatedSounds('Audio/se_shot');
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
						sprite: Game.components.AnimatedSprite({
							spriteSheet: Game.assets['animated-player-bullet'],
							spriteCount: 12,
							spriteTime: [125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125],
							animationScale: spec.animationScale,
							spriteSize: {width: 0.05, height: 0.05},			// Maintain the size on the sprite
							spriteCenter: {x: bulletSet[index].center.x, y: bulletSet[index].center.y}		// Maintain the center on the sprite
							})
					});
					bullet.isAnimated = true;
					bulletArray.push(bullet);
				}


				break;
		}
	}

	that.getPattern = function(){
		return bullets;
	}



	return that;
}
