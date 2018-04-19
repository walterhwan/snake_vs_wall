class Divider {
  constructor(props) {
    const {
      x, y, width, height, speed
    } = props;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  move() {
    this.y += this.speed / 10;
  }

  draw(ctx) {
    ctx.fillStyle = 'grey';
    ctx.roundRect(
      this.x,
      this.y,
      this.width,
      this.height,
      5
    );
  }
}

export default Divider;
