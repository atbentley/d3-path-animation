function createPath(points) {
  return d3.select(document.createElementNS(d3.ns.prefix.svg, 'path'))
    .attr('d', d3.svg.line()
      .x(d => d[0])
      .y(d => d[1])
      .interpolate("linear")(points))
    .attr('fill', 'none');
}

export default createPath;
