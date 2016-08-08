import React from 'react'

import Board from 'app/components/shared/Board'

const Home = (props) => {
  return (
    <section className="page">
      <Board
        todo={props.todo}
        developing={props.developing}
        testing={props.testing}
        done={props.done}
        live={props.live}
        />
    </section>
  )
}

export default Home
