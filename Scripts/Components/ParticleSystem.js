/*jslint browser: true, white: true, plusplus: true */
/*global Random */
Game.components.ParticleSystem = function(spec, graphics) {
	'use strict';
	var that = {},
		nextName = 1,	// unique identifier for the next particle
		particles = {},	// Set of all active particles
		imageSrcPlayer = spec.image.player,
		imageSrcEnemy = spec.image.enemy,
		imageSrcBullet = spec.image.bullet;

	//
	// Replace the spec.image (file to load), with the actual
	// image that should be rendered.
	spec.image.player = new Image();
	spec.image.enemy = new Image();
	spec.image.bullet = new Image();

	spec.image.player.isReady = false;
	spec.image.enemy.isReady = false;
	spec.image.bullet.isReady = false;

	spec.image.player.onload = function(){
		spec.image.player.isReady = true;
	}

	spec.image.enemy.onload = function(){
		spec.image.enemy.isReady = true;
	}

	spec.image.bullet.onload = function(){
		spec.image.bullet.isReady = true;
	}

	spec.image.player.src = imageSrcPlayer;
	spec.image.enemy.src = imageSrcEnemy;
	spec.image.bullet.src = imageSrcBullet;

	//------------------------------------------------------------------
	//
	// This creates a death effect
	//
	//------------------------------------------------------------------
	that.create = function(entity) {
		var p;
		for(var i = 0; i < 15; i++){
			
			p = {
				size: Random.nextGaussian(.01, .01),
				center: {x: entity.center.x, y: entity.center.y},
				direction: Random.nextCircleVector(1),
				speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev), // pixels per second
				rotation: 0,
				lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev),	// How long the particle should live, in seconds
				alive: 0	// How long the particle has been alive, in seconds
			};
			switch(entity.particleType){
				case 1:
					if(spec.image.player.isReady){
						p.image = spec.image.player;
					}
					break;		
				case 2: 
					if(spec.image.enemy.isReady){
						p.image = spec.image.enemy;
					}
					break;
				case 3:
					if(spec.image.bullet.isReady){
						p.image = spec.image.bullet;
						p.speed = Random.nextGaussian(spec.speed.mean/2, spec.speed.stdev/2);
					}
					break;
			}
			
			//
			// Ensure we have a valid size - gaussian numbers can be negative
			p.size = Math.max(.001, p.size);
			//
			// Same thing with lifetime
			p.lifetime = Math.max(0.01, p.lifetime);
			//
			// Assign a unique name to each particle
			particles[nextName++] = p;
		}
	};
	
	//------------------------------------------------------------------
	//
	// Update the state of all particles.  This includes remove any that 
	// have exceeded their lifetime.
	//
	//------------------------------------------------------------------
	that.update = function(elapsedTime) {
		var removeMe = [],
			value,
			particle;
			
		//
		// We work with time in seconds, elapsedTime comes in as milliseconds
		elapsedTime = elapsedTime / 1000;
		
		for (value in particles) {
			if (particles.hasOwnProperty(value)) {
				particle = particles[value];
				//
				// Update how long it has been alive
				particle.alive += elapsedTime;
				
				//
				// Update its position
				particle.center.x += (elapsedTime * particle.speed * particle.direction.x);
				particle.center.y += (elapsedTime * particle.speed * particle.direction.y);
				
				//
				// Rotate proportional to its speed
				particle.rotation += particle.speed / 500;
				
				//
				// If the lifetime has expired, identify it for removal
				if (particle.alive > particle.lifetime) {
					removeMe.push(value);
				}
			}
		}

		//
		// Remove all of the expired particles
		for (particle = 0; particle < removeMe.length; particle++) {
			delete particles[removeMe[particle]];
		}
		removeMe.length = 0;
	};
	
	//------------------------------------------------------------------
	//
	// When a particle system is first created, this function is empty.
	// Once the texture for the particle system is loaded, this function
	// gets replaced with one that will actually render things.
	//
	//------------------------------------------------------------------
	// that.render = function() {
	// };
	that.render = function() {
		var value,
			particle;
		
		for (value in particles) {
			if (particles.hasOwnProperty(value)) {
				particle = particles[value];
				if(particle.image.isReady){
					graphics.drawParticle(particle);
				} else {
					console.log("What?!?");
				}
			}
		}
	};



	return that;
}
