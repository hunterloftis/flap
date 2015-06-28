function Simulator(initialState, getInput) {
  var player = Player();
  var tree = Tree();
  var state = _.extend({
    dude: player.create(0, 0),
    trees: range(10).map(tree.create)
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

    player.step(state.dude, seconds, input);

    return state;
  }

  function range(n) {
    var arr = [];
    while (n--) arr.push(n);
    return arr.reverse();
  }
}
