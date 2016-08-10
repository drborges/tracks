import React from 'react'

import { store } from 'app/store'
import * as actions from 'app/actions'
import Card from 'app/components/shared/Card'

const Column = (props) => {
  let title = props.name.toUpperCase()
  let badgeCount = props.cards ? props.cards.length : 0
  let style = props.draggingOver ? "column drag-target" : "column"
  let cards = props.cards ?
    props.cards.map((card, i) =>
      <Card key={i} index={i} dragStarted={props.dragStarted} column={props.name} card={card} />) : []

  return (
    <div className={style}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => store.dispatch(actions.dragEnter(props.name))}
      onDragLeave={() => store.dispatch(actions.dragLeave(props.name))}
      onDrop={(e) => {
        let data = JSON.parse(e.dataTransfer.getData('application/json'))
        store.dispatch(actions.dragStop())
        store.dispatch(actions.dragLeave(props.name))
        store.dispatch(actions.dropCard(data.index, props.column))
        store.dispatch(actions.addCard(props.name, data.card))
      }}>

      <h4 className="title">
        {title} <span className="count-badge">{badgeCount}</span>
      </h4>
      <ul className="cards">{cards}</ul>
    </div>
  )
}

export default Column
