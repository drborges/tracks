import React from 'react'

import Column from 'app/components/shared/Column'

const Board = (props) => {
  return (
    <div className="board">
      <Column {...props.board.columns.todo} dragStarted={props.board.dragStarted} />
      <Column {...props.board.columns.developing} dragStarted={props.board.dragStarted} />
      <Column {...props.board.columns.testing} dragStarted={props.board.dragStarted} />
      <Column {...props.board.columns.done} dragStarted={props.board.dragStarted} />
      <Column {...props.board.columns.live} dragStarted={props.board.dragStarted} />
    </div>
  )
}

export default Board
