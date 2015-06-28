function GameLoop(step, fps) {
  var tick = 1000 / fps;
  var tickSeconds = tick / 1000;
  var maxDelta = 100;
  var lastTime = 0;
  var buffer = 0;
  var running = false;

  return {
    start: start,
    stop: stop
  };

  function start() {
    running = true;
    requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
  }

  function frame() {
    if (!running) return;

    var now = performance.now();
    var delta = now - lastTime;
    lastTime = now;

    if (delta <= maxDelta) buffer += delta;

    while (buffer >= tick) {
      step(tickSeconds);
      buffer -= tick;
    }

    requestAnimationFrame(frame);
  }
}
