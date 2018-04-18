import * as _ from 'lodash';
import * as Util from './until';
import Input from './input';
import Snake from './snake';
import Wall from './wall';
import Food from './food';
import Divider from './divider';
import BlinkText from './blink_text';

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

    // Music
    this.audio = document.getElementById('audio2');
    document.getElementById('play-pause').onclick = () => {
      if (this.audio.paused) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    };
    document.getElementById('stop').onclick = () => {
      this.audio.pause();
      this.audio.currentTime = 0;
    };

    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext('2d');
    this.gameStart = false;
    this.gameSpeed = 2;

    this.input = new Input(document);
    this.canvasProps = {
      width: 365,
      height: 600,
    };
    this.canvas.width = this.canvasProps.width;
    this.canvas.height = this.canvasProps.height;

    this.setupSnake();

    this.setup();

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

    const blinkTextProps = {
      font: '14px Arcade',
      fillStyle: '#314cb6',
      text: 'Press Enter to Start',
      x: this.canvasProps.width/2,
      y: this.canvasProps.height/2,
      interval: 800,
    };
    this.startText = new BlinkText(blinkTextProps);
    this.startText.start(performance.now());

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
        speed: this.gameSpeed
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
        speed: this.gameSpeed
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
        speed: this.gameSpeed
      };
      if (Math.floor(Math.random() * 2) === 0) {
        this.dividers.push(new Divider(dividerProps));
      }
    }
  }

  setObjectsSpeed(gameSpeed) {
    this.snake.speed = gameSpeed + 1;
    this.walls.forEach(wall => {
      wall.speed = gameSpeed;
    });
    this.walls.forEach(wall => {
      wall.speed = gameSpeed;
    });
    this.foods.forEach(food => {
      food.speed = gameSpeed;
    });
    this.dividers.forEach(divider => {
      divider.speed = gameSpeed;
    });
  }

  update() {
    const width = this.canvasProps.width;
    const height = this.canvasProps.height;
    this.ctx.clearRect(0, 0, this.canvasProps.width, this.canvasProps.height);

    if (this.input.spaceReleased() && this.snake.life > 10 && this.gameSpeed > 4) {
      this.gameSpeed -= 2;
      this.snake.life -= 10;
      this.input.spaceReset();

    }

    if (this.input.enterPressed()) {
      this.gameStart = true;
    }
    // Start Menu
    if (!this.gameStart) {
      this.ctx.font = "40px Arcade";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = "#26931f";
      this.ctx.fillText("Snake", width/2, 100);
      this.ctx.fillStyle = "#6e6d6c";
      this.ctx.fillText("VS", width/2, 100 + 60);
      this.ctx.fillStyle = "#BB3040";
      this.ctx.fillText("Wall", width/2, 100 + 120);

      this.startText.draw(this.ctx);
    } else {
      // Walls
      this.walls.forEach((wall) => {
        if (!wall.destroyed && Util.doesCollide(wall, this.snake)) {
          wall.destroyed = true;
          this.snake.life -= wall.strength;
        }
        wall.move();
        wall.draw(this.ctx);
      });

      // Foods
      let oneFoodDestroyed = false;
      this.foods.forEach((food) => {
        if (!food.destroyed && Util.doesCollide(food, this.snake)) {
          food.destroyed = true;
          oneFoodDestroyed = true;
          this.snake.life += food.life;
        }
        food.move();
        food.draw(this.ctx);
      });
      if (oneFoodDestroyed) {this.foods = [];}

      // Dividers
      this.dividers.forEach(divider => {
        divider.move();
        divider.draw(this.ctx);
      });

      // Snake
      this.snake.move(this.dividers);
      this.snake.draw(this.ctx);


      if (this.snake.life <= 0) {
        // alert('Game over');
        this.gameSpeed = 2;
        this.gameStart = false;
        this.setup();
        this.setupSnake();
      } else if (this.walls[0].y > this.canvasProps.height) {
        this.setup();
        if (this.gameSpeed > 6 && this.gameSpeed < 12) {
          this.gameSpeed += 0.5;
        } else {
          this.gameSpeed += 0.2;
        }
        console.log(this.gameSpeed);
      }
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
