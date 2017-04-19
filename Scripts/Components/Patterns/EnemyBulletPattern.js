

Game.components.EnemyBulletPattern = function(spec){
	that = {};
	
	that.makeBullets = function(bulletArray){
		switch(spec.patternType){
			case 1:
				var bullet;
				Game.music.playRepeatedSounds('Audio/se_shot');
				var bulletSet = [];
						bulletSet.push({
							direction : {x : 0, y : 0.75},
							center : {x : spec.center.x + 0.01, y : spec.center.y + 0.05},
						});
						bulletSet.push({
							direction : {x : 0, y : 0.75},
							center : {x : spec.center.x - 0.01, y : spec.center.y + 0.05},
						});
						bulletSet.push({
							direction : {x : 0.05, y : 0.75},
							center : {x : spec.center.x + 0.02, y : spec.center.y + 0.05},
						});
						bulletSet.push({
							direction : {x : -0.05, y : 0.75},
							center : {x : spec.center.x - 0.02, y : spec.center.y + 0.05},
						});
						bulletSet.push({
							direction : {x : 0.10, y : 0.75},
							center : {x : spec.center.x + 0.03, y : spec.center.y + 0.05},
						});
						bulletSet.push({
							direction : {x : -0.10, y : 0.75},
							center : {x : spec.center.x - 0.03, y : spec.center.y + 0.05},
						});
						bulletSet.push({
							direction : {x : 0.15, y : 0.75},
							center : {x : spec.center.x + 0.04, y : spec.center.y + 0.05},
						});
						bulletSet.push({
							direction : {x : -0.15, y : 0.75},
							center : {x : spec.center.x - 0.04, y : spec.center.y + 0.05},
						});
						bulletSet.push({
							direction : {x : 0.20, y : 0.75},
							center : {x : spec.center.x + 0.05, y : spec.center.y + 0.05},
						});
						bulletSet.push({
							direction : {x : -0.20, y : 0.75},
							center : {x : spec.center.x - 0.05, y : spec.center.y + 0.05},
						});
				for(var index in bulletSet){
					bullet = Game.components.Bullet({
						direction: {x:bulletSet[index].direction.x, y:bulletSet[index].direction.y},
						center: {x:bulletSet[index].center.x, y:bulletSet[index].center.y},
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

			case 2:
				var bullet;
				Game.music.playRepeatedSounds('Audio/se_shot');
				var bulletSet = [];
						bulletSet.push({
							direction : {x : 0, y : 0.75},
							center : {x : spec.center.x + 0.01, y : spec.center.y + 0.05},
						});
						bulletSet.push({
							direction : {x : 0, y : 0.75},
							center : {x : spec.center.x - 0.01, y : spec.center.y + 0.05},
						});
				for(var index in bulletSet){
					bullet = Game.components.Bullet({
						direction: {x:bulletSet[index].direction.x, y:bulletSet[index].direction.y},
						center: {x:bulletSet[index].center.x, y:bulletSet[index].center.y},
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
