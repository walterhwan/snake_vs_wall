class Wall {
  constructor(props) {
    const {
      x, y, strength, length, speed
    } = props;
    [this.x, this.y] = [x, y];
    this.speed = speed;
    this.strength = strength;
    this.width = length;
    this.height = length;
  }

  move() {
    this.y += this.speed / 10;
  }

  draw(ctx) {
    if (this.destroyed) return null;

    // rect
    const [x, y] = [this.x, this.y];
    const [width, height] = [this.width, this.height];

    if (this.strength <= 5) {
      ctx.fillStyle = 'green';
    } else if (this.strength <= 10) {
      ctx.fillStyle = 'orange';
    } else {
      ctx.fillStyle = 'red';
    }
    ctx.roundRect(x, y, width, height, 5);

    // strength
    ctx.font = "25px Arcade";
    ctx.fillStyle = 'white';
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillText(
      this.strength,
      x + width / 2,
      y + height / 2);
  }
}

export default Wall;
