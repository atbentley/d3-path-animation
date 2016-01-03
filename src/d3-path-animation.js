import createPath from './create-path';
import linear from './tweens';

class PathAnimation {
  constructor(target) {
    this._target = target;
    this._duration = null;
    this._points = null;
    this._path = null;
    this._tween = null;
    this._progress = 0.0;
  }

  tween(ease) {
    return linear(this, ease);
  }

  start(points, duration, tween) {
    this._points = points;
    this._duration = duration;
    this._tween = tween || this.tween();
    this._path = createPath(this._points)
    this._moveToStart();
    this._animate(this._tween);
  }

  pause() {
    this._target
        .transition()
        .duration(0.0);
  }

  resume() {
    this._progress += eval(this._target.attr("_progress")) * (1 - this._progress);
    this._animate(this._tween);
  }

  _animate(tween) {
    this._resetProgress();
    this._target
      .transition()
        .duration(this._duration - this._duration * this._progress)
        .ease("linear")
        .attr("_progress", 1.0)
        .attrTween("cx", (d, i, a) => (time) => tween(d, i, a)(this._progress + (1 - this._progress) * time)[0])
        .attrTween("cy", (d, i, a) => (time) => tween(d, i, a)(this._progress + (1 - this._progress) * time)[1])
        .each("end", () => {
          this._progress = 0.0;
          this._animate(tween)
        });
  }

  _resetProgress() {
    this._target
        .attr("_progress", 0.0);
  }

  _moveToStart() {
    this._target
        .attr("cx", this._points[0][0])
        .attr("cy", this._points[0][1]);
  }
}

function distance(p1, p2) {
  return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
}

export default PathAnimation;
