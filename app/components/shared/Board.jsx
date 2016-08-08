import React from 'react'

import Column from 'app/components/shared/Column'

const Board = (props) => (
  <div className="board">
    <Column name="todo" title="Todo" cards={props.todo.cards} />
    <Column name="developing" title="Developing" cards={props.developing.cards} />
    <Column name="testing" title="Testing" cards={props.testing.cards} />
    <Column name="done" title="Done" cards={props.done.cards} />
    <Column name="live" title="Live" cards={props.live.cards} />
  </div>
)

export default Board
