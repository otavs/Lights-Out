import FireworkParticle from 'game/FireworkParticle'
import {random} from 'game/Utils'
import Vector2 from 'game/Vector2'
import game from 'game/game'

export default class FireWork {
  constructor(x, y, size, color, lifespan, particles) {
    this.pos = new Vector2(x, y)
    this.vel = new Vector2(0, 0)
    this.acc = new Vector2(0, 0)
    this.size = size
    this.color = color
    this.lifespan = this.initLifespan = lifespan
    this.particles = particles
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
    if(this.vel.y > 1)
      this.explode()
  }
  explode() {
    this.lifespan = 0
    for(let i = 0; i < 40; i++) {
      let particle = new FireworkParticle(this.pos.x, this.pos.y, this.size, this.color, 80)
      game.fireworkParticles.push(particle)
      const minAccY = -5, maxAccY = 1, accX = Math.abs(maxAccY-minAccY)/2
      particle.applyForce(random(-accX, accX), random(minAccY, maxAccY))
    }
  }
  draw(p5) {
    p5.push()
    p5.fill(this.color)
    p5.stroke(this.color)
    p5.circle(this.pos.x, this.pos.y, this.size)
    p5.pop()
  }
}