import game from 'game/game'
import elimination from 'game/elimination'

export default function solve() {
  game.time('solve')
  let {m, n} = game
  let A = buildAugmentedMatrix()
  let [_, pivots, isSolvable] = elimination(A)
  if(!isSolvable) {
    game.timeEnd('solve')
    return [buildEmpty(), true]
  }
  let x = [], N = A.length
  // assign value to free variables
  for(let j = 0; j < N; j++)
    if(!(j in pivots))
      x[j] = 0
  // compute x
  for(let j = N-1; j >= 0; j--) {
    if(!(j in pivots)) continue
    let i = pivots[j]
    x[j] = A[i][N]
    for(let j_ = j+1; j_ < N; j_++)
      x[j] = (x[j] + A[i][j_] * x[j_]) % 2
  }
  // convert solution vector x to matrix
  let sol = []
  for(let i = 0; i < m; i++) {
    sol[i] = []
    for(let j = 0; j < n; j++)
      sol[i][j] = x[i*n+j]
  }
  game.timeEnd('solve')
  return [sol, false]
}

function buildAugmentedMatrix() {
  const {m, n, matrix} = game
  const pos = (i, j) => {
    if(i < 0 || j < 0 || i >= m || j >= n) 
      return -1
    return i*n + j
  }
  const A = []
  for(let i = 0; i < m; i++) {
    for(let j = 0; j < n; j++) {
      let I = pos(i, j)
      A[I] = []
      for(let k = 0; k < m*n; k++)
        A[I][k] = 0
      ;[pos(i, j), pos(i-1, j), pos(i, j-1), pos(i+1, j), pos(i, j+1)]
      .filter(x => x != -1).forEach(x => A[I][x] = 1)
      A[I][m*n] = matrix[i][j]
    }
  }
  return A
}

function buildEmpty() {
  const {m, n} = game
  let res = []
  for(let i = 0; i < m; i++) {
    res[i] = []
    for(let j = 0; j < n; j++) {
      res[i][j] = 0
    }
  }
  return res
}
