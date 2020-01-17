export default class VolumeLevel {
  constructor(p, x, y, t, c) {
    this.p = p;
    this.position = p.createVector(x, y);
    this.theta = t;
    this.color = c;
    this.height = 100;
    this.width = 10;
  }
  update(vol) {
    if (vol != null) {
      this.height = this.height + vol > 155 ? 155 : this.height + vol;
    }
    this.height -= 3;
    this.height = this.height < 9 ? 9 : this.height;
  }
  display() {
    this.p.push();
    this.p.noStroke();
    this.p.translate(this.position.x, this.position.y);
    this.p.rotate(this.theta);
    this.p.fill(this.color);
    this.p.beginShape();
    if (this.height > 30) {
      this.p.vertex(0 - this.width / 2, 0);
      this.p.vertex(0 - this.width / 2, this.height);
      this.p.vertex(this.width / 2, this.height);
      this.p.vertex(this.width / 2, 0);
    } else {
      this.p.vertex(0 - this.width / 2 - 5, 0);
      this.p.vertex(0 - this.width / 2 - 5, this.height);
      this.p.vertex(this.width / 2 + 5, this.height);
      this.p.vertex(this.width / 2 + 5, 0);
    }
    this.p.endShape();
    this.p.pop();
  }
}
