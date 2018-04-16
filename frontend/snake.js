import * as _ from 'lodash';
import * as Util from './until';

class Snake {
  constructor(props) {
    const {
      x, y, life, length, maxX, input
    } = props;
    this.x = x;
    this.y = y;
    this.life = life;
    this.history = [];
    this.width = length;
    this.height = length;
    this.maxX = maxX;
    this.input = input;

    // this.draw = this.draw.bind(this);
  }

  move() {
    const dx = 4;
    const input = this.input;
    if (input.rightPressed()) {
      this.x += dx;
    } else if (input.leftPressed()) {
      this.x -= dx;
    }
    this.x = Util.clamp(this.x, 0, this.maxX - this.width);

    this.history.unshift([this.x, this.y]);
    this.history = this.history.slice(0, this.life);
  }

  draw(ctx) {
    ctx.font = "10px Arial";
    ctx.fillStyle = 'white';
    // ctx.textBaseline="middle";
    // ctx.textAlign="center";
    ctx.fillText(
      this.life,
      this.x + 25,
      this.y + 15);

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
