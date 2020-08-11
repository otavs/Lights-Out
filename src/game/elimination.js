// reduces the augmented matrix A to row echelon form with operations modulo 2
// returns [reduced A, pivots, isSolvable]
export default function elimination(A) {
  const m = A.length, n = A[0].length, pivots = {}
  let isSolvable = true, lastPivotRow = -1
  elimination:
  for(let i = 0, j = 0; i < m && j < n-1; i++, j++) {
    let pivotRow = findPivotInCol(i, j)
    while(pivotRow == -1) {
      if(++j >= n-1) break elimination
      pivotRow = findPivotInCol(i, j)
    }
    swapRows(i, pivotRow)
    eliminateRows(i, j)
    lastPivotRow = pivots[j] = i
  }
  for(let i = lastPivotRow+1; i < m; i++) {
    if(A[i][n-1] != 0) {
      isSolvable = false
      break
    }
  }
  return [A, pivots, isSolvable]

  // returns pivot row or -1 if no pivot found
  function findPivotInCol(startRow, col) {
    for(let i = startRow; i < m; i++)
      if(A[i][col] != 0)
        return i
    return -1
  }

  function swapRows(x, y) {
    [A[x], A[y]] = [A[y], A[x]]
  }

  function eliminateRows(pivotRow, pivotCol) {
    for(let i = pivotRow+1; i < m; i++) {
      if(A[i][pivotCol] == 0) continue
      for(let j = pivotCol; j < n; j++)
        A[i][j] = (A[i][j] + A[pivotRow][j]) % 2
    }
  }
}
