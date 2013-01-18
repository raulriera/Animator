Animator = function() {};

/*
 * @arrayOfAnimations = array of animation objects to run in parallel
 * ---- Note
 * ---- The first argument must include the animation
 * ---- type in a field named "type". For the rest of the
 * ---- arguments consult the desired animation 
 */
Animator.prototype.parallel = function(arrayOfAnimations) {
	if (arrayOfAnimations) {
		var arrayOfAnimationsLength = arrayOfAnimations.length;
		for (var i = arrayOfAnimationsLength - 1; i >= 0; i--){
		    var animation = arrayOfAnimations[i];
			Animator.prototype[animation.type](animation);
		};	
	}
};

/*
 * @arrayOfAnimations = array of animation objects to run in sequence (one by one in queue)
 * ---- Note
 * ---- The first argument must include the animation
 * ---- type in a field named "type". For the rest of the
 * ---- arguments consult the desired animation 
 */
Animator.prototype.sequence = function(arrayOfAnimations) {
	var currentAnimation = 0;
	var lastAnimation;
	var arrayOfAnimationsLength = arrayOfAnimations.length-1;

	runNextAnimation();
	
	function runNextAnimation() {
		// Call the next animation
		lastAnimation = Animator.prototype[arrayOfAnimations[currentAnimation].type](arrayOfAnimations[currentAnimation]);
		
		if (currentAnimation < arrayOfAnimationsLength) {
			lastAnimation.addEventListener("complete", onCompleteListener);
		}
		
		// Increase the current animation count
		currentAnimation = currentAnimation+1;
	}
		
	function onCompleteListener(e) {
		lastAnimation.removeEventListener("complete", onCompleteListener);
		runNextAnimation();
	}
		
};

/*
 * @object = an object with the following required variables
	 * @view = the actual view you want to animate
	 * @value = value of the opacity (from 0 to 1)
	 * @duration = duration of the animation
	 * @onComplete = a function that you want to call after the animation ends
 */
Animator.prototype.fade = function(options) {
	
	// defaults
	var view = options.view;
	var value = options.value;
	var duration = options.duration;
	var onComplete = options.onComplete;
	//var delay = delay || 0;
	
	var animation = Titanium.UI.createAnimation({ "opacity": value, "duration": duration})
		
	view.animate(animation);
	
	if (onComplete) {
		animation.addEventListener("complete", onCompleteListener);
	}
	
	function onCompleteListener(e){
		onComplete();
		animation.removeEventListener("complete", onCompleteListener);
	}
	
	// return the animation so we can do the "Sequence"
	return animation;
};

/*
 * @object = an object with the following required variables
	 * @view = the actual view you want to animate
	 * @value = value of the scale (from 0 to 1)
	 * @duration = duration of the animation
	 * @onComplete = a function that you want to call after the animation ends
 */
Animator.prototype.scale = function(options) {
	
	// defaults
	var view = options.view;
	var value = options.value;
	var duration = options.duration;
	var onComplete = options.onComplete;
	//var delay = delay || 0;
	
	var targetedValue = Titanium.UI.create2DMatrix({ "scale": value });
	var animation = Titanium.UI.createAnimation({ "transform": targetedValue, "duration": duration})
	
	view.animate(animation);
	
	if (onComplete) {
		animation.addEventListener("complete", onCompleteListener);
	}
	
	function onCompleteListener(e){
		onComplete();
		animation.removeEventListener("complete", onCompleteListener);
	}
	
	// return the animation so we can do the "Sequence"
	return animation;
};

/*
 * @object = an object with the following required variables
	 * @view = the actual view you want to animate
	 * @value = value of the rotation (in degrees)
	 * @duration = duration of the animation
	 * @onComplete = a function that you want to call after the animation ends
 */
Animator.prototype.rotate = function(options) {
	
	// defaults
	var view = options.view;
	var value = options.value;
	var duration = options.duration;
	var onComplete = options.onComplete;
	//var delay = delay || 0;
	
	var targetedValue = Titanium.UI.create2DMatrix({ "rotate": value });
	var animation = Titanium.UI.createAnimation({ "transform": targetedValue, "duration": duration})
	
	view.animate(animation);
	
	if (onComplete) {
		animation.addEventListener("complete", onCompleteListener);
	}
	
	function onCompleteListener(e){
		onComplete();
		animation.removeEventListener("complete", onCompleteListener);
	}
	
	// return the animation so we can do the "Sequence"
	return animation;
};

/*
 * @object = an object with the following required variables
	 * @view = the actual view you want to animate
	 * @value = value of the coordinates (an object with the X and Y properties)
	 * @duration = duration of the animation
	 * @onComplete = a function that you want to call after the animation ends
 */
Animator.prototype.moveTo = function(options) {
	
	// defaults
	var view = options.view;
	var value = options.value;
	var duration = options.duration;
	var onComplete = options.onComplete;
	//var delay = delay || 0;	
	
	var targetedValue = Titanium.UI.create2DMatrix();
	targetedValue = targetedValue.translate(value.x, value.y); // Looks like I can't do this one in one line
	
	var animation = Titanium.UI.createAnimation({ "transform": targetedValue, "duration": duration})
	
	view.animate(animation);
	
	if (onComplete) {
		animation.addEventListener("complete", onCompleteListener);
	}
	
	function onCompleteListener(e){
		onComplete();
		animation.removeEventListener("complete", onCompleteListener);
	}
	
	// return the animation so we can do the "Sequence"
	return animation;
};


module.exports = Animator;
