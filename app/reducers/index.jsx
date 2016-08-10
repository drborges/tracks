import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const initialState = {
  board: {
    name: '',
    dragging: false,
    columns: {
      todo: {
        name: 'todo',
        loading: false,
        draggingOver: false,
        cards: [],
      },
      developing: {
        name: 'developing',
        loading: false,
        draggingOver: false,
        cards: [],
      },
      testing: {
        name: 'testing',
        loading: false,
        draggingOver: false,
        cards: [],
      },
      done: {
        name: 'done',
        loading: false,
        draggingOver: false,
        cards: [],
      },
      live: {
        name: 'live',
        loading: false,
        draggingOver: false,
        cards: [],
      }
    }
  },
  loading: false,
  errors: []
}

export const board = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TRACK':
      return { ...state, name: action.track.name }

    case 'BOARD_START_DRAG':
      return { ...state, dragging: true }

    case 'BOARD_STOP_DRAG':
      return { ...state, dragging: false }

    case 'TODO_FETCH_CARDS':
      return {
        ...state,
        columns: {
          ...state.columns,
          todo: {
            ...state.columns.todo,
            cards: action.cards
          }
        }
      }

    case 'TODO_REMOVE_CARD':
      let cards = state.columns.todo.cards
      return {
        ...state,
        columns: {
          ...state.columns,
          todo: {
            ...state.columns.todo,
            cards: cards.slice(0, action.index).concat(cards.slice(action.index + 1))
          }
        }
      }

    case 'TODO_ADD_CARD':
      return {
        ...state,
        columns: {
          ...state.columns,
          todo: {
            ...state.columns.todo,
            cards: [action.card].concat(state.columns.todo.cards)
          }
        }
      }

    case 'TODO_DRAG_ENTER':
      return {
        ...state,
        columns: {
          ...state.columns,
          todo: {
            ...state.columns.todo,
            draggingOver: true
          }
        }
      }
    case 'TODO_DRAG_LEAVE':
      return {
        ...state,
        columns: {
          ...state.columns,
          todo: {
            ...state.columns.todo,
            draggingOver: false
          }
        }
      }
    default:
      return state
  }

}

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

const dragStarted = (state = false, action) => {
  return action.type == 'START_DRAG' || action.type == 'STOP_DRAG' ?
    action.dragStart : state
}

const reducer = combineReducers({
  track,
  todo,
  developing,
  testing,
  done,
  live,
  errors,
  dragStarted,
  routing: routerReducer
})

export default reducer
