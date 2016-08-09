import React from 'react'

import Column from 'app/components/shared/Column'

const Board = (props) => (
  <div className="board">
    <Column name="todo" title="Todo" cards={props.todo.cards} dragStarted={props.dragStarted} />
    <Column name="developing" title="Developing" cards={props.developing.cards} dragStarted={props.dragStarted} />
    <Column name="testing" title="Testing" cards={props.testing.cards} dragStarted={props.dragStarted} />
    <Column name="done" title="Done" cards={props.done.cards} dragStarted={props.dragStarted} />
    <Column name="live" title="Live" cards={props.live.cards} dragStarted={props.dragStarted} />
  </div>
)

export default Board
