import * as _ from 'lodash';
import * as Util from './until';
import ObjectX from './objectX';

class Snake {
  constructor(props) {
    const {
      x, y, life, length, maxX, input, speed
    } = props;
    this.x = x;
    this.y = y;
    this.life = life;
    this.history = [];
    this.width = length;
    this.height = length;
    this.maxX = maxX;
    this.input = input;
    this.speed = speed;

    // this.draw = this.draw.bind(this);
  }

  move(dividers) {
    const input = this.input;
    if (input.rightPressed()) {
      this.x += this.speed;
    } else if (input.leftPressed()) {
      this.x -= this.speed;
    }
    this.x = Util.clamp(this.x, 0, this.maxX - this.width);

    // check collision with dividers
    dividers.forEach(divider => {
      const snake = this;
      const collDir = Util.collide(divider, snake);
      switch (collDir.direction) {
        case 'top':
          snake.x = divider.x - this.width;
          break;
        case 'bottom':
          const divCenter = divider.x + divider.width / 2;
          const snakeCenter = snake.x + snake.width / 2;
          if (divCenter > snakeCenter) {
            snake.x = divider.x - snake.width;
          } else {
            snake.x = divider.x + divider.width;
          }
          break;
        case 'right':
          snake.x = divider.x + divider.width;
          break;
        case 'left':
          snake.x = divider.x - snake.width;
          break;
      }
    });

    this.history.unshift([this.x, this.y]);
    this.history = this.history.slice(0, this.life);
  }

  draw(ctx) {
    ctx.font = "15px Arcade";
    ctx.fillStyle = 'white';
    ctx.textBaseline="middle";
    ctx.textAlign="start";
    ctx.fillText(
      this.life,
      this.x + 20,
      this.y + 20);

    if (this.life <= 5) {
      ctx.fillStyle = '#63AEE1';
    } else if (this.life <= 10) {
      ctx.fillStyle = '#0A81D1';
    } else {
      ctx.fillStyle = '#0A34D1';
    }
    for (const idx of _.range(this.life)) {
      if (this.history[idx]) {
        const [x, y] = this.history[idx];
        const width = this.width;
        ctx.roundRect(
          x, y + idx * (width + 3),
          width, width, 3, this.life);
      }
    }
  }
}

export default Snake;
