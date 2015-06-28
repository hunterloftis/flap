(function(exports) {

  exports.Particle = {
    create: create,
    step: step,
    force: force,
    getPosition: getPosition,
    getVelocity: getVelocity,
    getAcceleration: getAcceleration,
    box: box
  };

  function create(x, y) {
    return [[x, y, 1], [x, y, 1], [x, y, 1]];
  }

  function step(state, seconds) {
    var pos = state[0];
    var prev = state[1];
    var vx = (pos[0] - prev[0]) / pos[2];
    var vy = (pos[1] - prev[1]) / pos[2];
    state.unshift([pos[0] + vx * seconds, pos[1] + vy * seconds, seconds]);
    state.pop();
  }

  function force(state, dx, dy) {
    var pos = state[0];
    pos[0] += dx;
    pos[1] += dy;
  }

  function getPosition(state) {
    return {
      x: state[0][0],
      y: state[0][1]
    };
  }

  function getVelocity(state) {
    return {
      x: (state[0][0] - state[1][0]) / state[0][2],
      y: (state[0][1] - state[1][1]) / state[0][2]
    };
  }

  function getAcceleration(state) {
    var vx0 = (state[0][0] - state[1][0]) / state[0][2];
    var vy0 = (state[0][1] - state[1][1]) / state[0][2];
    var vx1 = (state[1][0] - state[2][0]) / state[1][2];
    var vy1 = (state[1][1] - state[2][1]) / state[1][2];
    return {
      x: vx0 - vx1,
      y: vy0 - vy1
    };
  }

  function box(state, left, top, right, bottom) {
    var pos = state[0];
    if (pos[0] < left) pos[0] = left;
    else if (pos[0] > right) pos[0] = right;
    if (pos[1] < top) pos[1] = top;
    else if (pos[1] > bottom) pos[1] = bottom;
  }

})(window);
