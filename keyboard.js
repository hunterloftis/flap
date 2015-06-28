function Keyboard() {
  var state = { left: false, right: false, space: false };
  var bindings = { 37: 'left', 39: 'right', 32: 'space' };

  return {
    start: start,
    stop: stop,
    getState: getState
  };

  function start() {
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
  }

  function stop() {
    document.removeEventListener('keydown', onKeyDown, false);
    document.removeEventListener('keyup', onKeyUp, false);
  }

  function getState() {
    return state;
  }

  function onKeyDown(e) {
    onKey(e, true);
  }

  function onKeyUp(e) {
    onKey(e, false);
  }

  function onKey(e, value) {
    var binding = bindings[e.keyCode];
    if (!binding) return;

    state[binding] = value;

    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
  }
}
