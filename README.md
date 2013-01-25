#Animator:
**Animator** is a helper class to ease your mind when working with animations on Titanium.

##Usage:
In your app.js (or elsewhere), call:

```javascript
// Load the animator helper
var Animator = require("Animator");
```

Now that you have the module initialised you can call one of these 4 animation functions:

* **scale**: increases or decreases the size of the view
* **rotate**: rotates the view
* **fade**: changes the opacity of the view
* **moveTo**: moves the view in the X and Y coordinates

Let's for example scale a window to 80% of its size

```javascript
// Load the animator helper
new Animator().scale({ view: window, value: 0.8, duration: 500 }); 
```

##Helpers inside the helper

Queuing animations can be a pain. That is why you can also find two specials methods called:

* **sequence**: uses an array of animations and queues them one after the other
* **parallel**: uses an array of animations and runs them all at once

Let's do a quick example

```javascript
// do a bunch of animations one after the other	
new Animator().sequence([
{ 
	type: "scale", 
	view: pink, 
	value: 1.5, 
	duration: 500 }, 
{ 
	type: "rotate", 
	view: pink, 
	value: 57, 
	duration: 500 } ,
{ 
	type: "fade", 
	view: blue, 
	value: 0.8, 
	duration: 500 } ,
{ 
	type: "moveTo", 
	view: pink, 
	value: {x: 0, y: 200 }, 
	duration: 500 }, 
]);
```

Without the **sequence** method, achieving the same result without the previous code will be a nesting nightmare.

##More examples
For more information check out the [examples.js](https://github.com/raulriera/Animator/blob/master/examples.js) file. Or browse around the [Animator.js](https://github.com/raulriera/Animator/blob/master/Animator.js) file. You can find in there support for GET, POST, PUT and DELETE (called destroy for reserved words problems)

##About:
Created by Raul Riera, [@raulriera](http://twitter.com/raulriera)  
