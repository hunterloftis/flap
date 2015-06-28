function Platform() {
  return {
    create: create
  };

  function create(x, y, width) {
    return {
      x: x,
      y: y,
      width: width
    };
  }
}
