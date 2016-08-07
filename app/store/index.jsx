import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'

import reducer from 'app/reducers'

const defaultState = {}
const reduxDevToolsAvailable = window.devToolsExtension && window.devToolsExtension()
const enhancer = compose(applyMiddleware(thunk), reduxDevToolsAvailable)

export const store = createStore(reducer, defaultState, enhancer)
export const history = syncHistoryWithStore(browserHistory, store)
