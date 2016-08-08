import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const track = (state = {}, action) => {
  if (action.type == 'FETCH_TRACK') {
    return action.track
  }

  return state
}

const createFetchCards = (column) =>
  (state = [], action) =>
    (action.type == `FETCH_${column.toUpperCase()}`) ?
      { cards: action.cards } : state

const createMoveCardFromColumn = (source) =>
  (state = [], action) =>
    (action.type == "MOVE_CARD" && action.source == source) ?
      { cards: state.cards.slice(0, action.cardIndex).concat(state.cards.slice(action.cardIndex + 1)) } : state

const createMoveCardToColumn = (target) =>
  (state = [], action) =>
    (action.type == "MOVE_CARD" && action.target == target) ?
      { cards: [action.card].concat(state.cards) } : state

const todo = (state = [], action) => {
  state = createFetchCards('todo')(state, action)
  state = createMoveCardFromColumn('todo')(state, action)
  return createMoveCardToColumn('todo')(state, action)
}

const developing = (state = [], action) => {
  state = createFetchCards('developing')(state, action)
  state = createMoveCardFromColumn('developing')(state, action)
  return createMoveCardToColumn('developing')(state, action)
}

const testing = (state = {}, action) => {
  state = createFetchCards('testing')(state, action)
  state = createMoveCardFromColumn('testing')(state, action)
  return createMoveCardToColumn('testing')(state, action)
}

const done = (state = {}, action) => {
  state = createFetchCards('done')(state, action)
  state = createMoveCardFromColumn('done')(state, action)
  return createMoveCardToColumn('done')(state, action)
}

const live = (state = {}, action) => {
  state = createFetchCards('live')(state, action)
  state = createMoveCardFromColumn('live')(state, action)
  return createMoveCardToColumn('live')(state, action)
}

const errors = (state = '', action) => {
  if (action.type == 'NETWORK_ERROR') {
    return action.error
  }
  return state
}

const reducer = combineReducers({
  track,
  todo,
  developing,
  testing,
  done,
  live,
  errors,
  routing: routerReducer
})

export default reducer
