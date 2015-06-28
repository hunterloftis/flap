function Renderer(getState, el) {
  var running = false;
  var ctx = el.getContext('2d');
  var grd = ctx.createLinearGradient(0, 0, 0, 600);

  grd.addColorStop(0, '#F2BE96');
  grd.addColorStop(1, '#DB4646');

  return {
    start: start,
    stop: stop
  };

  function start() {
    running = true;
    requestAnimationFrame(render);
  }

  function stop() {
    running = false;
  }

  function render() {
    if (!running) return;
    var state = getState();

    clear();
    state.trees.forEach(renderBackgroundTree);
    renderDude(state.dude);
    state.trees.forEach(renderForegroundTree);
    state.platforms.forEach(renderPlatform);

    requestAnimationFrame(render);
  }

  function clear() {
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 800, 600);
  }

  function renderPlatform(state) {
    ctx.save();
    ctx.translate(state.x, state.y);
    ctx.fillStyle = '#113322';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#338844';
    var left = -state.width * 0.5;
    var right = state.width * 0.5;
    var size = 30;
    var count = Math.floor(state.width / (size + 2));
    var step = state.width / count;
    for (var x = left; x < right; x += step) {
      ctx.beginPath();
      ctx.rect(x, 0, size, size);
      ctx.fill();
      ctx.stroke();
    }
    for (var x = left + step; x <= right - step; x += step * 2) {
      ctx.beginPath();
      ctx.rect(x - 10, size + 7, 14, 14);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  function renderBackgroundTree(state) {
    if (state.depth < 0) return;
    ctx.save();
    ctx.translate(state.x, 600);
    ctx.fillStyle = state.color;
    ctx.fillRect(-state.width * 0.5, -600, state.width, 600);
    ctx.restore();
  }

  function renderForegroundTree(state) {
    if (state.depth >= 0) return;
    ctx.save();
    ctx.translate(state.x, 600);
    ctx.fillStyle = state.color;
    ctx.fillRect(-state.width * 0.5, -600, state.width, 600);
    ctx.restore();
  }

  function renderDude(state) {
    var pos = Particle.getPosition(state.position);
    var spring = state.spring / state.springTime;
    var tailFlip = spring * -5;

    ctx.save();
    ctx.translate(pos.x, pos.y);
    if (state.direction === 0) ctx.scale(-1, 1);

    // legs
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(-5, 0);
    ctx.lineTo(-5, -10);
    ctx.moveTo(-10, 0);
    ctx.lineTo(-10, -10);
    ctx.stroke();

    // bob
    ctx.translate(0, -2);
    if (state.onGround) {
      ctx.translate(0, pos.x % 30 * -0.2);
    }

    // body
    ctx.beginPath();
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(-20, -40 + spring * 20, 40, 40 - spring * 20);

    ctx.translate(0, spring * 13);

    // eye
    ctx.beginPath();
    ctx.moveTo(5, -23);
    ctx.lineTo(8, -25);
    ctx.lineTo(11, -23);
    ctx.stroke();

    // beak
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(15, -20, 10, 5);

    // feathers
    ctx.lineWidth = 2;
    ctx.fillStyle = '#00ffff';
    ctx.strokeStyle = '#00cccc';
    ctx.beginPath();
    ctx.moveTo(-19, -30);
    ctx.lineTo(-35, -35 + tailFlip);
    ctx.moveTo(-19, -30);
    ctx.lineTo(-35, -45 + tailFlip);
    ctx.stroke();

    // wings
    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    ctx.rect(-5, -25, -20, -5);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

}
