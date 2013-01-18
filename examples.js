var window = Titanium.UI.createWindow();

var pink = Titanium.UI.createView({
	backgroundColor: "#ff88ff",
	width: 50,
	height: 50,
	top: 20
});

var blue = Titanium.UI.createView({
	backgroundColor: "#0000ff",
	width: 50,
	height: 50,
	bottom: 20
});

window.add(pink);
window.add(blue);

// Load the animator helper
var Animator = require("/Animator");

// Do animations in parallel manually
new Animator().scale({ view: pink, value: 2, duration: 500 }); 
new Animator().scale({ view: blue, value: 0.5, duration: 1500 });

// Do animations in sequence manually
new Animator().scale({ 
	view: pink, value: 2, duration: 500, onComplete: function(){
		new Animator().scale({ view: blue, value: 0.5, duration: 500 });
	} 
}); 

// do a couple of animations at the same time
new Animator().parallel([
{ 
	type: "scale", 
	view: pink, 
	value: 1.5, 
	duration: 500 }, 
{ 
	type: "scale", 
	view: blue, 
	value: 0.5, 
	duration: 500 } 
]);

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

