D3 Path Animations
==================
Easily create D3 transitions that follow a path and that can be paused and resumed at any point.

Usage
-----
Include the file in just after including D3:
```{html}
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js" charset="utf-8"></script>
<script type="text/javascript" src="d3-path-animation.js"></script>
```

Create a D3 object:
```
var svg = d3.select("body").append("svg").width(1000).height(1000);
var cicle = svg.append("circle").attr("r", 5);
```

Create the animation object and kick off the animation:
```
var animation = new PathAnimation(circle);
// start(points, duration)
animation.start([[0, 0], [100, 0], [100, 100], [0, 100]], 3000);
```

A custom tweening function can be passed in as an optional third argument to start, see [attrTween](https://github.com/mbostock/d3/wiki/Transitions#attrTween) for info on how to write a tweening function usable by D3:
```
animation.start(points, duration, myTweeningFunction);
```

Pause and resume the animation:
```
animation.pause();
animation.resume();
```
