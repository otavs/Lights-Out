import game from 'game/game'

export default class Square {
  constructor(i, j) {
    this.x = this.y = this.w = this.h = 0
    this.i = i
    this.j = j
  }
  
  update(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  draw(p5) {
    p5.push()
    p5.fill(this.getColor())
    p5.rect(this.x, this.y, this.w, this.h)
    if(game.showSolution && game.solution[this.i][this.j]) {
      let r = .05 * this.w,
      cx = this.x + this.w - r - .04*this.w,
      cy = this.y + this.h - r - .04*this.h
      p5.fill('#ff0000')
      p5.stroke('#ffffff')
      p5.strokeWeight(.2)
      p5.circle(cx, cy, 2*r)
    }
    p5.pop()
  }

  checkMouseClick(x, y) {
    if(x >= this.x && x <= this.x+this.w && y >= this.y && y <= this.y+this.h) {
      const {m, n, editMode} = game
      const {i, j} = this
      game.toggleSquare(i, j)
      if(!editMode) {
        if(i-1 >= 0) game.toggleSquare(i-1, j)
        if(j-1 >= 0) game.toggleSquare(i, j-1)
        if(i+1 < m) game.toggleSquare(i+1, j)
        if(j+1 < n) game.toggleSquare(i, j+1)
      }
      game.updateSolution()
    }
  }

  getColor() {
    switch(game.matrix[this.i][this.j]) {
      case 0: return '#000000'
      case 1: return '#f2fc32'
      default: return '#ffffff'
    }
  }
}