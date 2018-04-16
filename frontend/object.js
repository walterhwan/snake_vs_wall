class ObjectX {
  constructor(props) {
    const {
      x, y, length, speed
    } = props;
    [this.x, this.y] = [x, y];
    this.speed = speed;
    this.width = length;
    this.height = length;
  }
}

export default ObjectX;
