import Vector2 from 'game/Vector2'

export default class FireworkParticle {
  constructor(x, y, size, color, lifespan) {
    this.pos = new Vector2(x, y)
    this.vel = new Vector2(0, 0)
    this.acc = new Vector2(0, 0)
    this.size = size
    this.color = color
    this.lifespan = this.initLifespan = lifespan
  }
  applyForce(x, y) {
    this.acc.x += x
    this.acc.y += y
  }
  update() {
    this.lifespan--
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.mult(0)
    this.color.setAlpha(this.lifespan / this.initLifespan * 255)
  }
  draw(p5) {
    p5.push()
    p5.fill(this.color)
    p5.stroke(this.color)
    p5.circle(this.pos.x, this.pos.y, this.size)
    p5.pop()
  }
}