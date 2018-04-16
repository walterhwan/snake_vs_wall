class ObjectX {
  constructor(props) {
    const {
      x, y, width, height, speed
    } = props;
    [this.x, this.y] = [x, y];
    this.speed = speed;
    this.width = width;
    this.height = height;
  }
}

export default ObjectX;
