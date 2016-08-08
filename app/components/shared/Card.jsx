import React from 'react'
import { markdown } from 'markdown'

class Card extends React.Component {
  state = { editing: false }

  render() {
    let bodyHTML = this.state.editing ? this.props.issue.name : markdown.toHTML(this.props.issue.name)

    return (
      <li className="card" draggable="true">
        <div className="header">{this.props.issue.id}</div>
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
