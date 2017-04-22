/*jslint browser: true, white: true, plusplus: true */
/*global Random */



//Is this even gonna work right? Essentially copied from Dr. Mathias'
//Particle - 4 effect
Game.components.PlayerParticle = function(spec, graphics) {
	'use strict';
	var that = {},
		nextName = 1,	// unique identifier for the next particle
		particles = {},	// Set of all active particles
		imageSrc = spec.image;

	//
	// Replace the spec.image (file to load), with the actual
	// image that should be rendered.
	spec.image = new Image();
	spec.image.onload = function() {
		//
		// Replace the render function!  This approach eliminates the need to have a boolean
		// that we test on every draw call.
		that.render = function() {
			var value,
				particle;
			
			for (value in particles) {
				if (particles.hasOwnProperty(value)) {
					particle = particles[value];
					graphics.drawImage(particle);
				}
			}
		};
	};
	spec.image.src = imageSrc;

	//------------------------------------------------------------------
	//
	// This creates one new particle
	//
	//------------------------------------------------------------------
	that.create = function() {
		var p = {
				image: spec.image,
				size: Random.nextGaussian(10, 4),
				center: {x: spec.center.x, y: spec.center.y},
				direction: Random.nextCircleVector(),
				speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev), // pixels per second
				rotation: 0,
				lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev),	// How long the particle should live, in seconds
				alive: 0	// How long the particle has been alive, in seconds
			};
		
		//
		// Ensure we have a valid size - gaussian numbers can be negative
		p.size = Math.max(1, p.size);
		//
		// Same thing with lifetime
		p.lifetime = Math.max(0.01, p.lifetime);
		//
		// Assign a unique name to each particle
		particles[nextName++] = p;
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
	that.render = function() {
	};
	
	return that;
}
