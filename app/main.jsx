import React from 'react';
import ReactDOM from 'react-dom';
import { Router} from 'react-router'
import { Provider } from 'react-redux'

import { store, history } from 'app/store'
import routes from 'app/routes'

import 'app/assets/css/main.scss'

const router = (
  <Provider store={store}>
    <Router routes={routes(store)} history={history} />
  </Provider>
)

ReactDOM.render(router, document.getElementById('app'))
