export default class Vector2 {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add(v) {
    this.x += v.x
    this.y += v.y
    return this
  }

  sub(v) {
    this.x -= v.x
    this.y -= v.y
    return this
  }

  mult(k) {
    this.x *= k
    this.y *= k
    return this
  }

  div(k) {
    this.x /= k
    this.y /= k
    return this
  }

  mag() {
    return Math.sqrt(this.x*this.x + this.y*this.y)
  }

  normalize() {
    let k = this.mag()
    if(k == 0) this.mult(0)
    else this.div(k)
    return this
  }

  dot(v) {
    return this.x * v.x + this.y * v.y 
  }

  angle() {
    return Math.atan2(this.y, this.x)
  }

  angleBetween(v) {
    return v.angle() - this.angle()
  }

  rotate(theta) {
    let cos = Math.cos(theta), sin = Math.sin(theta), x = this.x, y = this.y
    this.x = x*cos - y*sin
    this.y = x*sin + y*cos
    return this
  }
}

Vector2.random = () => new Vector2(Math.random()*2-1, Math.random()*2-1)
Vector2.randomUnit = () => Vector2.random().normalize()