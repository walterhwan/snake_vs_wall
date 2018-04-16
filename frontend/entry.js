import * as _ from 'lodash';
import * as Util from './until';
import Input from './input';
import Snake from './snake';
import Wall from './wall';

CanvasRenderingContext2D.prototype
.roundRect = function (x, y, w, h, rad, wallValue) {
  if (w < 2 * rad) rad = w / 2;
  if (h < 2 * rad) rad = h / 2;
  this.beginPath();
  this.moveTo(x+rad, y);
  this.arcTo(x + w, y    , x + w, y + h, rad);
  this.arcTo(x + w, y + h, x,     y + h, rad);
  this.arcTo(x,     y + h, x,     y,     rad);
  this.arcTo(x,     y,     x + w, y,     rad);
  this.closePath();

  if (wallValue <= 5) {
    this.fillStyle = 'green';
  } else if (wallValue <= 10) {
    this.fillStyle = 'orange';
  } else {
    this.fillStyle = 'red';
  }

  this.fill();
  return this;
};

class Game {
  constructor() {
    console.log("game loaded");

    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext('2d');

    this.input = new Input(document);
    this.canvasProps = {
      width: 485,
      height: 600,
    };
    this.canvas.width = this.canvasProps.width;
    this.canvas.height = this.canvasProps.height;

    // this.snake = new Snake(240, 500, 3, this.canvasProps);
    const snakeProps = {
      x: 240,
      y: 500,
      life: 5,
      length: 12,
      maxX: this.canvasProps.width,
      input: this.input,
    };

    const startY = -80;
    this.snake = new Snake(snakeProps);
    this.walls = [];
    for (const idx of _.range(6)) {
      const wallProps = {
        x: 5 + idx * 80,
        y: startY,
        length: 75,
        strength: Math.floor(Math.random() * 12 + 1),
        speed: 4
      };
      this.walls.push(new Wall(wallProps));
    }
    // this.level = new Level(this.canvasProps);
    // this.hud = new HUD(this.player);

    window.addEventListener("load", () => {
      this.update();
    });
  }

  // doesCollide(snake) {
  //   this.walls.forEach(wall => {
  //     if (Util.doesCollide(wall, snake)) return true;
  //   });
  //
  //   return false;
  // }

  update() {
    this.ctx.clearRect(0, 0, this.canvasProps.width, this.canvasProps.height);

    // Snake
    this.snake.move();
    this.snake.draw(this.ctx);

    // Walls
    this.walls.forEach((wall) => {
      if (!wall.destroyed && Util.doesCollide(wall, this.snake)) {
        wall.destroyed = true;
        this.snake.life -= wall.strength;
      }
      wall.move();
      wall.draw(this.ctx);
    });

    // check collisions
    // this.level.collide(this.player);

    //draw
    // this.player.draw(this.ctx);
    // this.level.draw(this.ctx);
    // this.hud.draw(this.ctx);

    if (this.snake.life <= 0) {
      alert('Game over');

    } else {
      window.requestAnimationFrame(() => { this.update(); });
    }

  }
}

document.addEventListener("DOMContentLoaded", () => {
  let requestAnimationFrame =
    window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  let game = new Game();
});
