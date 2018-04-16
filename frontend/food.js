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
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();

    // life
    ctx.font = "15px Arial";
    ctx.fillStyle = 'white';
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillText(
      this.life,
      this.x,
      this.y
    );
  }
}

export default Food;
