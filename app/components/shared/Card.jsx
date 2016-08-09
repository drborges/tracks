import React from 'react'
import { markdown } from 'markdown'

import { store } from 'app/store'
import * as actions from 'app/actions'

class Card extends React.Component {
  state = { editing: false, dragging: false }

  render() {
    let style = this.state.dragging || !this.props.dragStarted ? 'card' : 'card no-pointer-events'
    let bodyHTML = this.state.editing ?
      this.props.card.name :
      markdown.toHTML(this.props.card.name)

  return (
      <li
        className={style}
        draggable="true"
        onDragEnd={() => {
          this.setState({ dragging: false })
          store.dispatch(actions.stopDrag())
        }}
        onDragStart={(e) => {
          console.log('starting drag...')
          this.setState({ dragging: true })
          store.dispatch(actions.startDrag())
          e.dataTransfer.setData('application/json', JSON.stringify({ card: this.props.card, cardIndex: this.props.index, source: this.props.column }))
        }}>
        <div className="header">{this.props.card.id}</div>
        <div
          className="body"
          contentEditable="true"
          onFocus={() => this.setState({ editing: true})}
          onBlur={()  => this.setState({ editing: false})}
          dangerouslySetInnerHTML={{ __html: bodyHTML }} />
        <div className="footer"></div>
      </li>
    )
  }
}

export default Card
