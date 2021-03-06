class Input {
  constructor(doc) {
    this.KEY_RT = 39; this.KEY_LT = 37; this.SPACE = 32;
    this.ENTER = 13;
    this.KEY_A = 65; this.KEY_D = 68;
    this.KEY_UP = 38; this.KEY_DOWN = 40;

    this.leftKey = false;
    this.rightKey = false;
    this.upKey = false;
    this.downKey = false;
    this.enterKey = false;

    doc.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case this.KEY_LT:
        case this.KEY_A:
          this.leftKey = true;
          break;
        case this.KEY_RT:
        case this.KEY_D:
          this.rightKey = true;
          break;
        case this.KEY_UP:
          this.upKey = true;
          break;
        case this.KEY_DOWN:
          this.downKey = true;
          break;
        case this.ENTER:
          this.enterKey = true;
          break;
        // case this.SPACE:
        //   this.spaceKey = true;
        //   break;
        default:
          // console.log(e.keyCode);
      }
    });

    doc.addEventListener('keyup', (e) => {
      switch (e.keyCode) {
        case this.KEY_LT:
        case this.KEY_A:
          this.leftKey = false;
          break;
        case this.KEY_RT:
        case this.KEY_D:
          this.rightKey = false;
          break;
        case this.KEY_UP:
          this.upKey = false;
          break;
        case this.KEY_DOWN:
          this.downKey = false;
          break;
        case this.ENTER:
          this.enterKey = false;
          break;
        case this.SPACE:
          this.spaceKey = true;
          break;
        default:
          // console.log(e.keyCode);
      }
    });
  }

  leftPressed() {
    return this.leftKey;
  }


  rightPressed() {
    return this.rightKey;
  }

  enterPressed() {
    return this.enterKey;
  }

  spaceReleased() {
    return this.spaceKey;
  }

  spaceReset() {
    this.spaceKey = false;
  }

}

export default Input;
