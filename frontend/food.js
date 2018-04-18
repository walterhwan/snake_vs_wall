class Food {
  constructor(props) {
    const {
      x, y, width, size, life, speed
    } = props;
    this.x = x;
    this.y = y;
    this.size = size;
    this.width = size * 2;
    this.height = size * 2;
    this.life = life;
    this.speed = speed;

    if (life === 0) {
      this.destroyed = true;
    } else {
      this.destroyed = false;
    }
  }

  move() {
    this.y += this.speed;
  }

  draw(ctx) {
    if (this.destroyed) return null;
    ctx.fillStyle = '#26931f';
    ctx.roundRect(this.x, this.y, this.width, this.height, this.width);

    // life
    ctx.font = "10px Arcade";
    ctx.fillStyle = 'white';
    ctx.fillText(
      this.life,
      this.x + 11,
      this.y + 11
    );
  }
}

export default Food;
