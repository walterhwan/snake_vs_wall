import * as _ from 'lodash';

CanvasRenderingContext2D.prototype
.roundRect = function (x, y, w, h, rad, fillStyle) {
  if (w < 2 * rad) rad = w / 2;
  if (h < 2 * rad) rad = h / 2;
  this.beginPath();
  this.moveTo(x+rad, y);
  this.arcTo(x+w, y,   x+w, y+h, rad);
  this.arcTo(x+w, y+h, x,   y+h, rad);
  this.arcTo(x,   y+h, x,   y,   rad);
  this.arcTo(x,   y,   x+w, y,   rad);
  this.closePath();
  this.fillStyle = fillStyle;
  this.fill();
  return this;
};

document.addEventListener("DOMContentLoaded", () => {
  console.log('js loaded');
  // Canvas size 480 x 600
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  let snakeLength = 5;
  for (const offset of _.range(5)) {
    ctx.roundRect(240, 500 + offset*(12 + 3), 12, 12, 3, 'red');
  }


});
