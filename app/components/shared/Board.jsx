import React from 'react'

import Column from 'app/components/shared/Column'

const Board = (props) => (
  <div className="board">
    <Column title="Todo" issues={props.todo.issues} />
    <Column title="Developing" issues={props.developing.issues} />
    <Column title="Testing" issues={props.testing.issues} />
    <Column title="Done" issues={props.done.issues} />
    <Column title="Live" issues={props.live.issues} />
  </div>
)

export default Board
