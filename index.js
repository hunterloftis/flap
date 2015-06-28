var keyboard = Keyboard();
var sim = Simulator({}, keyboard.getState);
var canvas = document.getElementById('game');
var renderer = Renderer(sim.getState, canvas);
var loop = GameLoop(sim.step, 60);

keyboard.start();
renderer.start();
loop.start();
