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
    this.destroyed = false;
  }

  move() {
    this.y += this.speed;
  }

  draw(ctx) {
    if (this.destroyed) return null;

    const [x, y] = [this.x, this.y];
    const [width, height] = [this.width, this.height];
    ctx.roundRect(x, y, width, height, 5, this.strength);
    ctx.font = "30px Arial";
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
