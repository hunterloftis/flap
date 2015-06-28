function Tree() {
  return {
    create: create
  };

  function create() {
    var depth = -10 + 40 * Math.random();
    return {
      x: 800 * Math.random(),
      width: 20 + 10 * Math.random(),
      depth: -20 + 50 * Math.random(),
      color: randomColor(depth)
    };
  }

  function randomColor(depth) {
    var rgba = [
      Math.floor(80 + depth),
      Math.floor(25 + depth),
      Math.floor(25 + depth),
      100
    ];
    return 'rgba(' + rgba.join(',') + ')';
  }
}
