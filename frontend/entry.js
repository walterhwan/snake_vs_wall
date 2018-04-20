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
  this.moveTo(x + rad, y);
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
    // Music
    this.audio = document.getElementById('audio1');
    this.muted = false;
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
    document.getElementById('mute').onclick = () => {
      this.muteOnClick();
    };

    // score board
    this.scores = [];
    Util.getScores((err, datums) => {
      if (err) console.log(err);
      this.scores = Object.values(datums);
    });

    // canvas
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext('2d');
    this.gameStart = false;

    // Game Speed
    this.DEFAULT_SPEED = 20;
    this.gameSpeed = this.DEFAULT_SPEED;

    // difficulity
    this.difficulity = 0;

    // Game score
    this.playerScore = 0;

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
      speed: this.gameSpeed + 10,
      maxX: this.canvasProps.width,
      input: this.input,
    };
    this.snake = new Snake(snakeProps);
  }

  setup() {
    // input
    this.input.rightKey = false;
    this.input.leftKey = false;

    // blink text
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
      const life = wallStrength + Math.floor(Math.random() * 7 - 4) - this.difficulity;
      const foodProps = {
        x: 30 + idx * 60,
        y: foodsStartY,
        size,
        life: life < 0 ? 0 : life,
        speed: this.gameSpeed
      };

      this.foods.push(new Food(foodProps));
    }

    // divider
    const dividerStartY = startY + 60;
    this.dividers = [];
    const numDividers = 5;
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
    this.gameSpeed = gameSpeed;
    this.snake.speed = gameSpeed + 10;
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

  renderScoreBar() {
    // score
    this.ctx.beginPath();

    this.ctx.rect(0, 0, this.canvasProps.width, 20);
    this.ctx.fillStyle = "black";
    this.ctx.fill();
    this.ctx.font = "10px Arcade";
    this.ctx.textAlign = "start";
    this.ctx.fillStyle = "#BB3040";
    this.ctx.fillText("score", 10, 10);
    this.ctx.fillStyle = "#26931f";
    this.ctx.fillText(this.playerScore, 70, 10);

    this.ctx.closePath();

    // difficulity
    const diffText = ['normal', 'hard', 'expert', 'legendary'];
    this.ctx.font = "10px Arcade";
    this.ctx.textAlign = "end";
    // this.ctx.fillStyle = "#BB3040";
    // this.ctx.fillText("difficulity", 180, 10);
    this.ctx.fillStyle = "#26931f";
    this.ctx.fillText(diffText[this.difficulity], 350, 10);
  }

  renderScoreBoard() {
    this.scores = this.scores.sort((a, b) => {
      return b.value - a.value;
    }).slice(0, 5);
    this.scores.forEach((score, idx) => {
      this.renderScoreItem(score, idx);
    });
  }

  renderScoreItem(score, idx) {
    this.ctx.font = "15px Arcade";
    this.ctx.textAlign = "start";
    if (idx === 0) {
      this.ctx.fillStyle = "red";
    } else {
      this.ctx.fillStyle = "white";
    }
    this.ctx.fillText(score.name, 50, 350 + idx * 30);

    this.ctx.font = "15px Arcade";
    this.ctx.textAlign = "end";
    if (idx === 0) {
      this.ctx.fillStyle = "red";
    } else {
      this.ctx.fillStyle = "white";
    }
    this.ctx.fillText(score.value, 300, 350 + idx * 30);
  }

  muteOnClick() {
    const muteImg = document.getElementById('mute_img');
    if (this.muted) {
      muteImg.src = "sound_icon.png";
    } else {
      muteImg.src = "mute_icon.png";
    }
    this.muted = !this.muted;

    if (this.audio.volume !== 0) {
      this.audio.volume = 0;
    } else {
      this.audio.volume = 1;
    }
  }

  update() {
    const width = this.canvasProps.width;
    const height = this.canvasProps.height;
    this.ctx.clearRect(0, 0, this.canvasProps.width, this.canvasProps.height);

    // Decrease speed by space bar
    if (this.input.spaceReleased() && this.snake.life > 10 && this.gameSpeed > 50) {
      this.player += 1000;
      this.gameSpeed -= 30;
      this.snake.life -= 10;
      this.input.spaceReset();
      this.setObjectsSpeed(this.gameSpeed);
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

      this.renderScoreBoard();

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
          this.playerScore += 100 * (1 + this.difficulity);
          food.destroyed = true;
          oneFoodDestroyed = true;
          this.snake.life += food.life;
        }
        food.move();
        food.draw(this.ctx);
      });
      if (oneFoodDestroyed) {this.foods = [];}

      // Dividers
      for (let i = 0; i < this.dividers.length; i++) {
        const divider = this.dividers[i];
        divider.move();
        divider.draw(this.ctx);
      }

      this.renderScoreBar();

      // Snake
      this.snake.move(this.dividers);
      this.snake.draw(this.ctx);


      if (this.snake.life <= 0) {
        let name = prompt(`Game over! Your score is ${this.playerScore}\nPlease enter your name: `);
        if (name === null) {name = 'AAA';}
        Util.createScore({
          name: name.slice(0, 6),
          value: this.playerScore
        }, (err, returnScore) => {
          this.scores.push(returnScore);
        });
        this.setObjectsSpeed(this.DEFAULT_SPEED);
        this.difficulity = 0;
        this.player = 0;
        this.gameStart = false;
        this.setup();
        this.setupSnake();
      } else if (this.snake.life > 50 && this.difficulity < 3) {
        this.difficulity += 1;
        this.snake.life -= 25;
        this.setObjectsSpeed(this.DEFAULT_SPEED + this.difficulity + 1);

      } else if (this.walls[0].y > this.canvasProps.height) {
        this.setup();
        if (this.gameSpeed > 60 && this.gameSpeed < 110) {
          this.setObjectsSpeed(this.gameSpeed + 5);
        } else {
          this.setObjectsSpeed(this.gameSpeed + 2);
        }
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
