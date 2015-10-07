function linear(animation, ease=d3.ease("linear")) {
  return function(d, i) {
    return function(time) {
      time = ease(time);
      var length = animation._path.node().getTotalLength();
      var point = animation._path.node().getPointAtLength(time * length);
      return [point.x, point.y];
    }
  }
}

export default linear;
