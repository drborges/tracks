import React from 'react'

import { store } from 'app/store'
import * as actions from 'app/actions'
import Card from 'app/components/shared/Card'


class Column extends React.Component {
  state = { draggingOver: false }

  render() {
    let badgeCount = this.props.cards ? this.props.cards.length : 0
    let style = this.state.draggingOver ? "column drag-target" : "column"
    let cards = this.props.cards ?
      this.props.cards.map((card, i) => <Card key={card.id} index={i} column={this.props.name} card={card} />) : []

    return (
      <div className={style}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => this.setState({ draggingOver: true })}
        onDragLeave={() => this.setState({ draggingOver: false })}
        onDrop={(e) => {
          this.setState({ draggingOver: false })
          let data = JSON.parse(e.dataTransfer.getData('application/json'))
          let fromColumn = data.source
          let toColumn = this.props.name
          store.dispatch(actions.moveCard(data.card, data.cardIndex, fromColumn, toColumn))
        }}>

        <h4 className="title">
          {this.props.title} <span className="count-badge">{badgeCount}</span>
        </h4>
        <ul className="cards">{cards}</ul>
      </div>
    )
  }
}

export default Column
