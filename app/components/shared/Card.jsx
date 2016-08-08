import React from 'react'
import { markdown } from 'markdown'

const Card = (props) => (
  <li className="card" draggable="true">
    <div className="header">{props.issue.id}</div>
    <div className="body" dangerouslySetInnerHTML={{ __html: markdown.toHTML(props.issue.name) }} />
    <div className="footer"></div>
  </li>
)

export default Card
