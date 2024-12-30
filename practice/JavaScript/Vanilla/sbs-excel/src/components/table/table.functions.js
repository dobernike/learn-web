import {range} from '@core/utils'

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function nextSelector(key, {col, row}, rowsCount) {
  const MIN_VALUE = 0
  const MAX_ROW_VALUE = rowsCount - 1
  const MAX_COL_VALUE = 25

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row = row + 1 > MAX_ROW_VALUE ? MAX_ROW_VALUE : row + 1
      break
    case 'Tab':
    case 'ArrowRight':
      col = col + 1 > MAX_COL_VALUE ? MAX_COL_VALUE : col + 1
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break
  }

  return `[data-id="${row}:${col}"]`
}
