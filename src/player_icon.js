export default class PlayerIcon {
  constructor(p, x, y, mode = false) {
    this.p = p;
    this.position = p.createVector(x, y);
    this.height = 40;
    this.width = 40;
    this.mode = mode;
    this.color = "#EEE";
    this.distance = this.mode ? 0 : 40;
  }
  update(mode) {
    if (mode != null) {
      this.mode = mode;
    }
    if (this.mode) {
      this.distance = this.distance > 0 ? (this.distance -= 4) : 0;
    } else {
      this.distance = this.distance < 40 ? (this.distance += 4) : 40;
    }
  }
  display() {
    this.p.push();

    this.p.noStroke();
    this.p.translate(this.position.x, this.position.y);
    this.p.fill(this.color);
    this.p.beginShape();

    this.p.vertex(-this.width / 2, -this.height / 2);
    this.p.vertex(this.width / 2, -this.height / 2 + this.distance / 2);
    this.p.vertex(this.width / 2, this.height / 2 - this.distance / 2);
    this.p.vertex(-this.width / 2, this.height / 2);

    this.p.endShape();
    this.p.pop();
  }
}
