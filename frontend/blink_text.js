class BlinkText {
  constructor(props) {
    const {
      font, fillStyle, textAlign, text, x, y, interval
    } = props;
    this.font = font;
    this.fillStyle = fillStyle;
    // this.textAlign = textAlign;
    this.text = text;
    this.x = x;
    this.y = y;
    this.active = false;
    this.time = 0;
    this.toggle = true;
    this.interval = interval;
  }

  start(time) {
    this.time = time;
    this.active = true;
    this.toggle = true;
  }

  stop() {
    this.active = false;
  }

  draw(ctx) {
    if (this.active) {
      if (this.toggle) {
        ctx.font = this.font;
        ctx.fillStyle = this.fillStyle;
        ctx.textAlign = "center";
        ctx.textBaseline="middle";
        ctx.fillText(this.text, this.x, this.y);
      }

      let time = performance.now();
      if (time - this.time >= this.interval) {
        this.time = time;
        this.toggle = !this.toggle;
      }
    }
  }
}

export default BlinkText;
