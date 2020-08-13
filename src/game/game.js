import solve from 'game/solve'
import Square from 'game/Square'
import setupP5 from 'game/p5'

const game = {
  debug: false,
  m: 6,
  n: 6,
  showSolution: false,
  editMode: false,
  gap: 3,
  state: 'PLAY',
  initMatrix: [
    [1,1,0,1,0,0],
    [1,1,1,0,1,0],
    [0,1,1,0,0,1],
    [1,0,0,1,1,0],
    [0,1,0,1,1,1],
    [0,0,1,0,1,1]
  ],
  matrix: null,
  squares: null,
  solution: null,
  isImpossible: false,
  setImpossibleGUI: () => {},
  fireworks: [],
  fireworkParticles: [],
  win: true,
  updateSolution() {
    [this.solution, this.isImpossible] = solve(this.matrix)
    this.setImpossibleGUI(this.isImpossible)
    this.win = this.isSolved()
  },
  isSolved() {
    for(let i = 0; i < this.m; i++)
      for(let j = 0; j < this.n; j++)
        if(this.matrix[i][j])
          return false
    return true
  },
  reset() {
    this.newGame()
  },
  updateN(n) {
    this.n = n
    this.newGame()
  },
  updateM(m) {
    this.m = m
    this.newGame()
  },
  newGame(initMatrix) {
    let tries = 0
    do {
      this.updateSquares(initMatrix)
    } while ((this.isImpossible && ++tries < 250) || this.win)
    if(game.debug) console.log(`tries: ${tries}`)
  },
  updateSquares(initMatrix) {
    this.matrix = []
    this.squares = []
    for(let i = 0; i < this.m; i++) {
      this.matrix[i] = []
      this.squares[i] = []
      for(let j = 0; j < this.n; j++) {
        this.matrix[i][j] = initMatrix ? initMatrix[i][j] : Math.floor(Math.random()*2)
        this.squares[i][j] = new Square(i, j)
      }
    }
    this.updateSolution()
  },
  toggleSquare(i, j) {
    this.matrix[i][j] = (this.matrix[i][j] + 1) % 2
  },
  initP5(p5) {
    setupP5(p5, this)
  },
  time(label) {
    if(this.debug) console.time(label)
  },
  timeEnd(label) {
    if(this.debug) console.timeEnd(label)
  }
}

export default game
