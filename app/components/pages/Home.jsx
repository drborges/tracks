import React from 'react'

import Column from 'app/components/shared/Column'

const Home = (props) => {
  return (
    <section className="page">
      <h1>Home Page &hearts;</h1>

      <Column title="Backlog" issues={props.backlog.issues} />
      <Column title="Todo" issues={props.todo.issues} />
      <Column title="Developing" issues={props.developing.issues} />
      <Column title="Testing" issues={props.testing.issues} />
      <Column title="Building" issues={props.building.issues} />
      <Column title="Live" issues={props.live.issues} />

      <button onClick={() => props.fetchIssues(1438516, 'backlog')}>Fetch Backlog stories</button>
      <button onClick={() => props.fetchIssues(1438516, 'todo')}>Fetch Todos stories</button>
      <button onClick={() => props.fetchIssues(1438516, 'developing')}>Fetch In Progress stories</button>
      <button onClick={() => props.fetchIssues(1438516, 'testing')}>Fetch In Test stories</button>
      <button onClick={() => props.fetchIssues(1438516, 'building')}>Fetch Building stories</button>
      <button onClick={() => props.fetchIssues(1438516, 'live')}>Fetch Live stories</button>
    </section>
  )
}

export default Home
