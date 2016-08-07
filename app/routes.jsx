import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Layout from 'app/components/Layout'
import Home from 'app/components/pages/Home'
import About from 'app/components/pages/About'

import * as actions from 'app/actions'

const routes = (store) => (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} onEnter={() => store.dispatch(actions.fetchTrack(1438516))} />
    <Route  path="about" component={About} />
  </Route>
)

export default routes
