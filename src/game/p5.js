export default (p5, game) => {
  let canvas, parent
  p5.setup = () => {
    parent = p5.canvas.parentNode
    canvas = p5.createCanvas(parent.offsetWidth, parent.offsetHeight).canvas
    canvas.onselectstart = () => false
    canvas.oncontextmenu = () => false
    game.reset()
  }

  p5.draw = () => {
    p5.clear()
    checkWindowResize()
    let {m, n, squares} = game
    for(let i = 0; i < m; i++) {
      for(let j = 0; j < n; j++) {
        squares[i][j].update(p5)
        updateSquares()
        squares[i][j].draw(p5)
      }
    }
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
    let {width, height} = parent.getBoundingClientRect()
    p5.resizeCanvas(width, height)
  }

  function updateSquares() {
    let {gap, n, m, squares} = game
    let {width, height} = p5
    if(height/m < width/n) {
      let size = height/m - gap - gap/m
      let initX = (width - n*(size+gap) - gap) / 2 + gap
      for(let i = 0, y = gap; i < m; i++, y += size+gap) {
        for(let j = 0, x = initX; j < n; j++, x += size+gap) {
          squares[i][j].update(x, y, size, size)
        }
      }
    }
    else {
      let size = width/n - gap - gap/n
      let initY = (height - m*(size+gap) - gap) / 2 + gap
      for(let i = 0, y = initY; i < m; i++, y += size+gap) {
        for(let j = 0, x = gap; j < n; j++, x += size+gap) {
          squares[i][j].update(x, y, size, size)
        }
      }
    }
  }

  function checkWindowResize() {
    let {width, height} = parent.getBoundingClientRect()
    if(p5.width != width || p5.height != height) {
      p5.resizeCanvas(width, height)
    }
  }
}