function Simulator(initialState, getInput) {
  var player = Player();
  var tree = Tree();
  var platform = Platform();
  var state = _.extend({
    dude: player.create(400, 100),
    trees: range(5).map(tree.create),
    platforms: [
      platform.create(600, 300, 150),
      platform.create(200, 400, 75)
    ]
  }, initialState);

  return {
    getState: getState,
    step: step
  };

  function getState() {
    return state;
  }

  function step(seconds) {
    var input = getInput();

    player.step(state.dude, state.platforms, seconds, input);

    return state;
  }

  function range(n) {
    var arr = [];
    while (n--) arr.push(n);
    return arr.reverse();
  }
}
