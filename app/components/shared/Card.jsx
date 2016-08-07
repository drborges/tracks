import React from 'react'

const Card = (props) => (
  <li className="card">
    <div className="header">{props.issue.id}</div>
    <div className="body">{props.issue.name}</div>
    <div className="footer"></div>
  </li>
)

export default Card
