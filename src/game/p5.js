import Firework from 'game/Firework'
import FireworkParticle from 'game/FireworkParticle'
import {random} from 'game/Utils'
import Vector2 from 'game/Vector2'

export default (p5, game) => {
  let canvas, parent
  const gravity = new Vector2(0, .1)

  p5.setup = () => {
    parent = p5.canvas.parentNode
    canvas = p5.createCanvas(parent.offsetWidth, parent.offsetHeight).canvas
    canvas.onselectstart = () => false
    canvas.oncontextmenu = () => false
    game.newGame(game.initMatrix)
  }

  p5.draw = () => {
    checkWindowResize() 
    p5.update()
    p5.clear()
    drawSquares()
    drawFireworks()
  }

  p5.update = () => {
    updateSquares()
    if(game.win && Math.random() < 0.0165)
      spawnFirework()
    updateFireworks()
  }

  p5.mousePressed = e => {
    if(e.type != 'mousedown') 
      return true
    let {m, n, squares} = game
    for(let i = 0; i < m; i++) {
      for(let j = 0; j < n; j++) {
        if(squares[i] && squares[i][j])
          squares[i][j].checkMouseClick(p5.mouseX, p5.mouseY)
      }
    }
  }

  p5.windowResized = () => {
    const {width, height} = parent.getBoundingClientRect()
    p5.resizeCanvas(width, height)
  }

  function updateSquares() {
    const {gap, n, m, squares} = game
    const {width, height} = p5
    if(height/m < width/n) {
      const size = height/m - gap - gap/m
      const initX = (width - n*(size+gap) - gap) / 2 + gap
      for(let i = 0, y = gap; i < m; i++, y += size+gap) {
        for(let j = 0, x = initX; j < n; j++, x += size+gap) {
          squares[i][j].update(x, y, size, size)
        }
      }
    }
    else {
      const size = width/n - gap - gap/n
      const initY = (height - m*(size+gap) - gap) / 2 + gap
      for(let i = 0, y = initY; i < m; i++, y += size+gap) {
        for(let j = 0, x = gap; j < n; j++, x += size+gap) {
          squares[i][j].update(x, y, size, size)
        }
      }
    }
  }

  function drawSquares() {
    const {m, n, squares} = game
    for(let i = 0; i < m; i++)
      for(let j = 0; j < n; j++)
        squares[i][j].draw(p5)
  }

  function updateFireworks() {
    const {fireworks, fireworkParticles} = game
    fireworks.forEach(x => {
      x.applyForce(gravity.x, gravity.y)
      x.update()
    })
    fireworkParticles.forEach(x => {
      x.applyForce(gravity.x, gravity.y)
      x.update()
    })
    game.fireworks = fireworks.filter(x => x.lifespan > 0)
    game.fireworkParticles = fireworkParticles.filter(x => x.lifespan > 0)
  }

  function drawFireworks() {
    const {fireworks, fireworkParticles} = game
    fireworks.forEach(x => x.draw(p5))
    fireworkParticles.forEach(x => x.draw(p5))
  }

  function spawnFirework() {
    const {width, height} = parent.getBoundingClientRect()
    const firework = new Firework(random(.3*width, .7*width), height, 6, p5.color(`hsl(${Math.floor(Math.random()*360)}, 100%, 50%)`), 100*3, game.fireworkParticles)
    const sqrtW = Math.sqrt(width), sqrtH = Math.sqrt(height)
    game.fireworks.push(firework)
    firework.applyForce(random(-.08*sqrtW, .08*sqrtW), random(-.45*sqrtH, -.2*sqrtH))
  }

  function checkWindowResize() {
    const {width, height} = parent.getBoundingClientRect()
    if(p5.width != width || p5.height != height) {
      p5.resizeCanvas(width, height)
    }
  }
}