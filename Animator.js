Animator = function () {
};

/*
 * @arrayOfAnimations = array of animation objects to run in parallel
 * ---- Note
 * ---- The first argument must include the animation
 * ---- type in a field named 'type'. For the rest of the
 * ---- arguments consult the desired animation
 */
Animator.prototype.parallel = function (arrayOfAnimations) {
    if (arrayOfAnimations) {
        var arrayOfAnimationsLength = arrayOfAnimations.length - 1;
        for (var i = 0; i <= arrayOfAnimationsLength; i++) {
            var animation = arrayOfAnimations[i];
            Animator.prototype[animation.type](animation);
        }
    }
};

/*
 * @arrayOfAnimations = array of animation objects to run in sequence (one by one in queue)
 * @repeated = should the animation be repeated endless
 * ---- Note
 * ---- The first argument must include the animation
 * ---- type in a field named 'type'. For the rest of the
 * ---- arguments consult the desired animation
 */
Animator.prototype.sequence = function (arrayOfAnimations) {
    var currentAnimation = 0;
    var lastAnimation;
    var arrayOfAnimationsLength = arrayOfAnimations.length - 1;

    runNextAnimation();

    function runNextAnimation() {
        // Call the next animation
        lastAnimation = Animator.prototype[arrayOfAnimations[currentAnimation].type](arrayOfAnimations[currentAnimation]);

        if (currentAnimation < arrayOfAnimationsLength) {
            lastAnimation.addEventListener('complete', onCompleteListener);
        }

        // Increase the current animation count
        currentAnimation = currentAnimation + 1;
    }

    function onCompleteListener(e) {
        lastAnimation.removeEventListener('complete', onCompleteListener);
        runNextAnimation();
    }
};

/*
 * @object = an object with the following required variables
 * @view = the actual view you want to animate
 * @value = string or hex value of the backgroundColor
 * @duration = duration of the animation
 * @onComplete = a function that you want to call after the animation ends
 * @delay = (optional) how many milliseconds to wait before doing the animation
 */
Animator.prototype.backgroundColor = function (options) {

    // defaults
    var view = options.view;
    var value = options.value;
    var duration = options.duration == null ? 300 : options.duration;
    var onComplete = options.onComplete;
    var onStart = options.onStart;
    var delay = options.delay || 0;

    var animation = Ti.UI.createAnimation({backgroundColor: value, duration: duration})

    if (delay > 0) {
        setTimeout(function () {
            view.animate(animation);
        }, delay);
    } else {
        if (view) {
            view.animate(animation);
        }
    }

    if (onStart) {
        animation.addEventListener('start', onStartListener);
    }

    function onStartListener(e) {
        onStart();
        animation.removeEventListener('start', onStartListener);
    }

    if (onComplete) {
        animation.addEventListener('complete', onCompleteListener);
    }

    function onCompleteListener(e) {
        onComplete();
        animation.removeEventListener('complete', onCompleteListener);
    }

    // return the animation so we can do the 'Sequence'
    return animation;
};

/*
 * @object = an object with the following required variables
 * @view = the actual view you want to animate
 * @value = value of the opacity (from 0 to 1)
 * @duration = duration of the animation
 * @onComplete = a function that you want to call after the animation ends
 * @delay = (optional) how many milliseconds to wait before doing the animation
 */
Animator.prototype.fade = function (options) {

    // defaults
    var view = options.view;
    var value = options.value;
    var duration = options.duration == null ? 300 : options.duration;
    var onComplete = options.onComplete;
    var onStart = options.onStart;
    var delay = options.delay || 0;

    var animation = Ti.UI.createAnimation({opacity: value, duration: duration})

    if (delay > 0) {
        setTimeout(function () {
            view.animate(animation);
        }, delay);
    } else {
        if (view) {
            view.animate(animation);
        }
    }

    if (onStart) {
        animation.addEventListener('start', onStartListener);
    }

    function onStartListener(e) {
        onStart();
        animation.removeEventListener('start', onStartListener);
    }

    if (onComplete) {
        animation.addEventListener('complete', onCompleteListener);
    }

    function onCompleteListener(e) {
        onComplete();
        animation.removeEventListener('complete', onCompleteListener);
    }

    // return the animation so we can do the 'Sequence'
    return animation;
};

/*
 * @object = an object with the following required variables
 * @view = the actual view you want to animate
 * @value = value of the scale (from 0 to 1)
 * @duration = duration of the animation
 * @onComplete = a function that you want to call after the animation ends
 * @delay = (optional) how many milliseconds to wait before doing the animation
 */
Animator.prototype.scale = function (options) {

    // defaults
    var view = options.view;
    var value = options.value;
    var duration = options.duration == null ? 300 : options.duration;
    var onComplete = options.onComplete;
    var delay = options.delay || 0;

    var targetedValue = Ti.UI.create2DMatrix({scale: value});
    var animation = Ti.UI.createAnimation({transform: targetedValue, duration: duration});

    if (delay > 0) {
        setTimeout(function () {
            view.animate(animation);
        }, delay);
    } else {
        view.animate(animation);
    }

    if (onComplete) {
        animation.addEventListener('complete', onCompleteListener);
    }

    function onCompleteListener(e) {
        onComplete();
        animation.removeEventListener('complete', onCompleteListener);
    }

    // return the animation so we can do the 'Sequence'
    return animation;
};

/*
 * @object = an object with the following required variables
 * @view = the actual view you want to animate
 * @value = (optional) object with the flip scale -1,1 for example
 * @duration = duration of the animation
 * @onComplete = a function that you want to call after the animation ends
 * @delay = (optional) how many milliseconds to wait before doing the animation
 */
Animator.prototype.flip = function (options) {

    // defaults
    var view = options.view;
    var value = options.value || {x: -1, y: 1};
    var duration = options.duration == null ? 300 : options.duration;
    var onComplete = options.onComplete;
    var delay = options.delay || 0;

    var targetedValue = Ti.UI.create2DMatrix();
    targetedValue = targetedValue.scale(value.x, value.y);
    var animation = Ti.UI.createAnimation({transform: targetedValue, duration: duration});

    if (delay > 0) {
        setTimeout(function () {
            view.animate(animation);
        }, delay);
    } else {
        view.animate(animation);
    }

    if (onComplete) {
        animation.addEventListener('complete', onCompleteListener);
    }

    function onCompleteListener(e) {
        onComplete();
        animation.removeEventListener('complete', onCompleteListener);
    }

    // return the animation so we can do the 'Sequence'
    return animation;
};

/*
 * @object = an object with the following required variables
 * @view = the actual view you want to animate
 * @value = value of the rotation (in degrees)
 * @duration = duration of the animation
 * @onComplete = a function that you want to call after the animation ends
 * @delay = (optional) how many milliseconds to wait before doing the animation
 */
Animator.prototype.rotate = function (options) {

    // defaults
    var view = options.view;
    var value = options.value;
    var duration = options.duration == null ? 300 : options.duration;
    var onComplete = options.onComplete;
    var delay = options.delay || 0;

    var targetedValue = Ti.UI.create2DMatrix({rotate: value});
    var animation = Ti.UI.createAnimation({transform: targetedValue, duration: duration});

    if (delay > 0) {
        setTimeout(function () {
            view.animate(animation);
        }, delay);
    } else {
        view.animate(animation);
    }

    if (onComplete) {
        animation.addEventListener('complete', onCompleteListener);
    }

    function onCompleteListener(e) {
        onComplete();
        animation.removeEventListener('complete', onCompleteListener);
    }

    // return the animation so we can do the 'Sequence'
    return animation;
};

/*
 * @object = an object with the following required variables
 * @view = the actual view you want to animate
 * @value = value of the coordinates (an object with the X and Y properties)
 * @duration = duration of the animation
 * @onComplete = a function that you want to call after the animation ends
 * @delay = (optional) how many milliseconds to wait before doing the animation
 */
Animator.prototype.moveTo = function (options) {

    // defaults
    var view = options.view;
    var value = options.value;
    var duration = options.duration == null ? 300 : options.duration;
    var onComplete = options.onComplete;
    var delay = options.delay || 0;

    var targetedValue = Ti.UI.create2DMatrix();
    targetedValue = targetedValue.translate(value.x, value.y); // Looks like I can't do this one in one line

    var animation = Ti.UI.createAnimation({transform: targetedValue, duration: duration});

    if (delay > 0) {
        setTimeout(function () {
            view.animate(animation);
        }, delay);
    } else {
        view.animate(animation);
    }

    if (onComplete) {
        animation.addEventListener('complete', onCompleteListener);
    }

    function onCompleteListener(e) {
        onComplete();
        animation.removeEventListener('complete', onCompleteListener);
    }

    // return the animation so we can do the 'Sequence'
    return animation;
};

/*
 * @object = an object with the following required variables
 * @view = the actual view you want to animate
 * @value = (optional) object with the dimensions
 * @duration = duration of the animation
 * @onComplete = a function that you want to call after the animation ends
 * @delay = (optional) how many milliseconds to wait before doing the animation
 */
Animator.prototype.sizeTo = function (options) {

    // defaults
    var view = options.view;
    var value = options.value || {};
    var duration = options.duration == null ? 300 : options.duration;
    var onComplete = options.onComplete;
    var onStart = options.onStart;
    var delay = options.delay || 0;

    var animation = Ti.UI.createAnimation({duration: duration});
    if (value.width !== undefined) {
        animation.width = value.width;
    }
    if (value.height !== undefined) {
        animation.height = value.height;
    }
    if (value.top !== undefined) {
        animation.top = value.top;
    }
    if (value.bottom !== undefined) {
        animation.bottom = value.bottom;
    }
    if (value.left !== undefined) {
        animation.left = value.left;
    }
    if (value.right !== undefined) {
        animation.right = value.right;
    }

    if (delay > 0) {
        setTimeout(function () {
            view.animate(animation);
        }, delay);
    } else {
        view.animate(animation);
    }

    if (onStart) {
        animation.addEventListener('start', onStartListener);
    }

    function onStartListener(e) {
        onStart();
        animation.removeEventListener('start', onStartListener);
    }

    if (onComplete) {
        animation.addEventListener('complete', onCompleteListener);
    }

    function onCompleteListener(e) {
        onComplete();
        animation.removeEventListener('complete', onCompleteListener);
    }

    return animation;
};

module.exports = Animator;
