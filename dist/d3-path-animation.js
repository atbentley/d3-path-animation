(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PathAnimation = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.__esModule = true;
function createPath(points) {
  return d3.select(document.createElementNS(d3.ns.prefix.svg, 'path')).attr('d', d3.svg.line().x(function (d) {
    return d[0];
  }).y(function (d) {
    return d[1];
  }).interpolate("linear")(points)).attr('fill', 'none');
}

exports['default'] = createPath;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _createPath = require('./create-path');

var _createPath2 = _interopRequireDefault(_createPath);

var _tweens = require('./tweens');

var _tweens2 = _interopRequireDefault(_tweens);

var PathAnimation = (function () {
  function PathAnimation(target) {
    _classCallCheck(this, PathAnimation);

    this._target = target;
    this._duration = null;
    this._points = null;
    this._path = null;
    this._tween = null;
    this._progress = 0.0;
  }

  PathAnimation.prototype.tween = function tween(ease) {
    return _tweens2['default'](this, ease);
  };

  PathAnimation.prototype.start = function start(points, duration, tween) {
    this._points = points;
    this._duration = duration;
    this._tween = tween || this.tween();
    this._path = _createPath2['default'](this._points);
    this._moveToStart();
    this._animate(this._tween);
  };

  PathAnimation.prototype.pause = function pause() {
    this._target.transition().duration(0.0);
  };

  PathAnimation.prototype.resume = function resume() {
    this._progress += eval(this._target.attr("_progress")) * (1 - this._progress);
    this._animate(this._tween);
  };

  PathAnimation.prototype._animate = function _animate(tween) {
    var _this = this;

    this._resetProgress();
    this._target.transition().duration(this._duration - this._duration * this._progress).ease("linear").attr("_progress", 1.0).attrTween("cx", function (d, i, a) {
      return function (time) {
        return tween(d, i, a)(_this._progress + (1 - _this._progress) * time)[0];
      };
    }).attrTween("cy", function (d, i, a) {
      return function (time) {
        return tween(d, i, a)(_this._progress + (1 - _this._progress) * time)[1];
      };
    }).each("end", function () {
      _this._progress = 0.0;
      _this._animate(tween);
    });
  };

  PathAnimation.prototype._resetProgress = function _resetProgress() {
    this._target.attr("_progress", 0.0);
  };

  PathAnimation.prototype._moveToStart = function _moveToStart() {
    this._target.attr("cx", this._points[0][0]).attr("cy", this._points[0][1]);
  };

  return PathAnimation;
})();

function distance(p1, p2) {
  return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
}

exports['default'] = PathAnimation;
module.exports = exports['default'];

},{"./create-path":1,"./tweens":3}],3:[function(require,module,exports){
"use strict";

exports.__esModule = true;
function linear(animation) {
  var ease = arguments.length <= 1 || arguments[1] === undefined ? d3.ease("linear") : arguments[1];

  return function (d, i) {
    return function (time) {
      time = ease(time);
      var length = animation._path.node().getTotalLength();
      var point = animation._path.node().getPointAtLength(time * length);
      return [point.x, point.y];
    };
  };
}

exports["default"] = linear;
module.exports = exports["default"];

},{}]},{},[2])(2)
});