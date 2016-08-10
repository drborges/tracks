import React from 'react'
import { Link } from 'react'
import { markdown } from 'markdown'

import { store } from 'app/store'
import * as actions from 'app/actions'

const Card = (props) => {
  let style = !props.dragStarted || props.card.dragging ? 'card' : 'card no-pointer-events'
  let bodyHTML = props.card.editing ?
    props.card.name : markdown.toHTML(props.card.name)

  return (
    <li
      className={style}
      draggable="true"
      onDragEnd={() => {
        store.dispatch(actions.dragStop())
        store.dispatch(actions.dropCard(props.index, props.column))
      }}
      onDragStart={(e) => {
        store.dispatch(actions.dragStart())
        store.dispatch(actions.dragCard(props.index, props.column))
        e.dataTransfer.setData('application/json', JSON.stringify({ card: props.card, index: props.index }))
      }}>
      <div className="header">
        <a href={`https://www.pivotaltracker.com/story/show/${props.card.id}`} target="_blank" className="tracker-link">
          <img width="20px" height="20px" className="tracker-logo" src="/app/assets/img/pivotaltracker-logo.png" />
          <span className="card-number">{props.card.id}</span>
        </a>
      </div>
      <div
        className="body"
        contentEditable="true"
        onFocus={() => actions.editCardStart(props.card.id, props.column)}
        onBlur={()  => actions.editCardEnd(props.card.id, props.column)}
        dangerouslySetInnerHTML={{ __html: bodyHTML }} />
      <div className="footer"></div>
    </li>
  )
}

export default Card
