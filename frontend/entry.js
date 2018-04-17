import * as _ from 'lodash';
import * as Util from './until';
import Input from './input';
import Snake from './snake';
import Wall from './wall';
import Food from './food';
import Divider from './divider';
// import

CanvasRenderingContext2D.prototype
.roundRect = function (x, y, w, h, rad) {
  if (w < 2 * rad) rad = w / 2;
  if (h < 2 * rad) rad = h / 2;
  this.beginPath();
  this.moveTo(x+rad, y);
  this.arcTo(x + w, y    , x + w, y + h, rad);
  this.arcTo(x + w, y + h, x,     y + h, rad);
  this.arcTo(x,     y + h, x,     y,     rad);
  this.arcTo(x,     y,     x + w, y,     rad);
  this.closePath();

  this.fill();
  return this;
};

class Game {
  constructor() {
    console.log("game loaded");

    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext('2d');
    this.gameStart = false;

    this.input = new Input(document);
    this.canvasProps = {
      width: 365,
      height: 600,
    };
    this.canvas.width = this.canvasProps.width;
    this.canvas.height = this.canvasProps.height;

    this.setupSnake();

    this.setup();
    // this.level = new Level(this.canvasProps);
    // this.hud = new HUD(this.player);

    window.addEventListener("load", () => {
      this.update();
    });
  }

  setupSnake() {
    const snakeProps = {
      x: 150,
      y: 500,
      life: 5,
      length: 17,
      speed: 3,
      maxX: this.canvasProps.width,
      input: this.input,
    };
    this.snake = new Snake(snakeProps);
  }

  setup() {
    this.input.rightKey = false;
    this.input.leftKey = false;

    const levelSpeed = 2;

    // Walls
    const startY = -300;
    // const startY = 0;
    this.walls = [];
    for (const idx of _.range(6)) {
      const wallProps = {
        x: 5 + idx * 60,
        y: startY,
        length: 55,
        strength: Math.floor(Math.random() * 12 + 1),
        speed: levelSpeed
      };
      this.walls.push(new Wall(wallProps));
    }

    // Foods
    const foodsStartY = startY + 150;
    this.foods = [];
    const numFoods = 6;
    const size = 10;
    for (const idx of _.range(numFoods)) {
      const wallStrength = this.walls[idx].strength;
      const foodProps = {
        x: 30 + idx * 60,
        y: foodsStartY,
        size,
        life: Math.abs(wallStrength + Math.floor(Math.random() * 7 - 3)),
        speed: levelSpeed
      };

      this.foods.push(new Food(foodProps));
    }

    // divider
    const dividerStartY = startY + 60;
    this.dividers = [];
    const numDividers = 6;
    const width = 5;
    const height = 200;
    for (const idx of _.range(numDividers)) {
      const dividerProps = {
        x: 65 + idx * 60,
        y: dividerStartY,
        width,
        height,
        speed: levelSpeed
      };
      if (Math.floor(Math.random() * 2) === 0) {
        this.dividers.push(new Divider(dividerProps));
      }
    }
  }


  update() {
    this.ctx.clearRect(0, 0, this.canvasProps.width, this.canvasProps.height);

    // Start button
    this.ctx.font = "14px Arcade";
    this.ctx.fillText("Press Enter to Start", 180, 100);

    // if (this.gameStart = )

    // Snake
    this.snake.move(this.dividers);
    this.snake.draw(this.ctx);

    // Walls
    this.walls.forEach((wall) => {
      if (!wall.destroyed && Util.doesCollide(wall, this.snake)) {
        wall.destroyed = true;
        this.snake.life -= wall.strength;
      }
      // wall.move();
      wall.draw(this.ctx);
    });

    // Foods
    this.foods.forEach((food) => {
      if (!food.destroyed && Util.doesCollide(food, this.snake)) {
        food.destroyed = true;
        this.snake.life += food.life;
      }
      // food.move();
      food.draw(this.ctx);
    });

    // Dividers
    this.dividers.forEach(divider => {
      // divider.move();
      divider.draw(this.ctx);
    });

    // check collisions
    // this.level.collide(this.player);

    //draw
    // this.player.draw(this.ctx);
    // this.level.draw(this.ctx);
    // this.hud.draw(this.ctx);

    if (this.snake.life <= 0) {
      // alert('Game over');
      this.setup();
      this.setupSnake();
    } else if (this.walls[0].y > this.canvasProps.height) {
      this.setup();
    }
    window.requestAnimationFrame(() => {
      this.update();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let requestAnimationFrame =
    window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  let game = new Game();
});
