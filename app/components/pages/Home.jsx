import React from 'react'

import Board from 'app/components/shared/Board'

const Home = (props) => (
  <section className="page">
    <Board {...props.board} />
  </section>
)

export default Home
