function Player() {
  var GRAVITY = 60;

  return {
    create: create,
    step: step
  };

  function create(x, y) {
    return {
      position: Particle.create(x, y),
      speed: 500,
      traction: 70,
      drag: 20,
      onGround: false,
      jumpPower: 1200,
      springTime: 0.05,
      spring: 0,
      jumpPowerAvailable: 0,
      direction: 1
    };
  }

  function step(state, platforms, seconds, input) {
    Particle.step(state.position, seconds);

    fall(state, seconds);
    findGround(state, platforms);

    if (input.left && !input.right) walkLeft(state, seconds);
    else if (input.right && !input.left) walkRight(state, seconds);
    else stop(state, seconds);

    if (input.space) spring(state, seconds)
    else if (state.spring > 0) jump(state, seconds);

    Particle.box(state.position, 10, 0, 800 - 10, 600);
  }

  function fall(state, seconds) {
    Particle.force(state.position, 0, GRAVITY * seconds);
  }

  function walkLeft(state, seconds) {
    if (true) {
      var vel = Particle.getVelocity(state.position).x;
      if (vel > -state.speed) {
        Particle.force(state.position, -state.traction * seconds, 0);
      }
      state.direction = 0;
    }
  }

  function walkRight(state, seconds) {
    if (true) {
      var vel = Particle.getVelocity(state.position).x;
      if (vel < state.speed) {
        Particle.force(state.position, state.traction * seconds, 0);
      }
      state.direction = 1;
    }
  }

  function stop(state, seconds) {
    var friction = state.onGround ? state.traction : state.drag;
    var vel = Particle.getVelocity(state.position).x;
    var force = Math.min(Math.abs(vel), Math.abs(friction));
    var sign = -Math.sign(vel);
    Particle.force(state.position, force * seconds * sign, 0);
  }

  function findGround(state, platforms) {
    var pos = Particle.getPosition(state.position);
    if (pos.y >= 600) {
      state.onGround = true;
      state.jumpPowerAvailable = state.jumpPower;
    }
    else {
      var vel = Particle.getVelocity(state.position);
      if (vel.y >= 0) {
        for (var i = 0; i < platforms.length; i++) {
          var p = platforms[i];
          if (pos.y >= p.y && pos.y <= p.y + 30 && Math.abs(pos.x - p.x) < (p.width * 0.5)) {
            state.onGround = true;
            state.jumpPowerAvailable = state.jumpPower;
            Particle.setY(state.position, p.y);
          }
        }
      }
    }
  }

  function spring(state, seconds) {
    state.spring = Math.min(state.springTime, state.spring + seconds);
  }

  function jump(state, seconds) {
    if (state.jumpPowerAvailable > 1) {
      var spring = state.spring / state.springTime;
      var power = -state.jumpPowerAvailable * spring * spring;
      state.spring = 0;
      state.jumpPowerAvailable *= 0.5;
      Particle.force(state.position, 0, power * seconds);
    }
  }
}
