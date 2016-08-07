import React from 'react'

import Card from 'app/components/shared/Card'

const Column = (props) => {
  let cards = props.issues ? props.issues.map(issue => <Card key={issue.id} issue={issue} />) : []
  return (
    <ul>{cards}</ul>
  )
}

export default Column
