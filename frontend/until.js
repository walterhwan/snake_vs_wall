export const clamp = (val, min, max) => {
  if (val < min) return min;
  if (val > max) return max;
  return val;
};

export const doesCollide = (a, b) => {
  // a, b should have x, y, width, height properties
  let diffX =
    (a.x + (a.width / 2)) - (b.x + (b.width / 2));
  let diffY =
    (a.y + (a.height / 2)) - (b.y + (b.height / 2));
  let minDisX = (a.width / 2) + (b.width / 2);
  let minDisY = (a.height / 2) + (b.height / 2);

  if (Math.abs(diffX) < minDisX
    && Math.abs(diffY) < minDisY) {
    return true;
  }
  return false;
};
