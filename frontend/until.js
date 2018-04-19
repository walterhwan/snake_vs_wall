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

export const collide = (a, b) => {
  // a, b should have x, y, width, height properties
  let diffX =
    (a.x + (a.width / 2)) - (b.x + (b.width / 2));
  let diffY =
    (a.y + (a.height / 2)) - (b.y + (b.height / 2));
  let minDisX = (a.width / 2) + (b.width / 2);
  let minDisY = (a.height / 2) + (b.height / 2);
  let collDir = {};

  if (Math.abs(diffX) < minDisX && Math.abs(diffY) < minDisY) {
    let oX = minDisX - Math.abs(diffX);
    let oY = minDisY - Math.abs(diffY);

    if (oX >= oY) {
      collDir.direction = diffY > 0 ? 'top' : 'bottom';
    } else {
      collDir.direction = diffX > 0 ? 'left' : 'right';
    }

      // collDir.overlap = { oX, oY };
  }
  return collDir;
};

export const getScores = (callBack) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'api/scores');
  xhr.onload = function() {
    callBack(null, JSON.parse(xhr.responseText));
  };
  xhr.onerror = function() {
    callBack(JSON.parse(xhr.responseText));
  };
  xhr.send();
};

export const createScore = (score, callBack) => {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'api/scores');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    callBack(null, JSON.parse(xhr.responseText));
  };
  // xhr.onerror = function() {
  //   callBack(JSON.parse(xhr.responseText));
  // };
  xhr.send(JSON.stringify(score));
};
