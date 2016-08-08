import React from 'react'

import Card from 'app/components/shared/Card'

const Column = (props) => {
  let cards = props.issues ? props.issues.map(issue => <Card key={issue.id} issue={issue} />) : []
  return (
    <div className="column">
      <h4 className="title">{props.title}</h4>
      <ul className="cards">{cards}</ul>
    </div>
  )
}

export default Column
