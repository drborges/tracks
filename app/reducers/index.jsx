import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import Immutable from 'immutable'

const initialState = {
  board: {
    name: '',
    dragStarted: false,
    columns: {
      todo: {
        name: 'todo',
        loading: false,
        dragEnter: false,
        cards: [],
      },
      developing: {
        name: 'developing',
        loading: false,
        dragEnter: false,
        cards: [],
      },
      testing: {
        name: 'testing',
        loading: false,
        dragEnter: false,
        cards: [],
      },
      done: {
        name: 'done',
        loading: false,
        dragEnter: false,
        cards: [],
      },
      live: {
        name: 'live',
        loading: false,
        dragEnter: false,
        cards: [],
      }
    }
  },
  loading: false,
  errors: []
}

const fetchTrack = (state, action) =>
  (action.type != 'FETCH_TRACK') ? state : {
    ...state,
    board: { ...state.board, name: action.track.name },
  }

const boardStartDrag = (state, action) =>
  (action.type != 'BOARD_START_DRAG') ? state : {
    ...state,
    board: { ...state.board, dragStarted: true },
  }

const boardStopDrag = (state, action) =>
  (action.type != 'BOARD_STOP_DRAG') ? state : {
    ...state,
    board: { ...state.board, dragStarted: false },
  }

function fetchCards(column) {
  return (state, action) => {
    if (action.type != `${column.toUpperCase()}_FETCH_CARDS`)
      return state

    return {
      ...state,
      board: {
        ...state.board,
        columns: Immutable.Map(state.board.columns).
          set(column, Immutable.Map(state.board.columns[column]).set('cards', action.cards).toObject()).toObject()
      }
    }
  }
}

const removeCardFrom = (column) =>
  (state, action) => {
    return (action.type != `${column.toUpperCase()}_REMOVE_CARD`) ? state : {
      ...state,
      board: {
        ...state.board,
        columns: {
          ...state.board.columns,
          todo: {
            ...state.board.columns.todo,
            cards: state.board.columns.todo.cards.slice(0, action.index).concat(state.board.columns.todo.cards.slice(action.index + 1)),
          }
        },
      }
    }
  }

const addCardTo = (column) =>
  (state, action) =>
    (action.type != `${column.toUpperCase()}_ADD_CARD`) ? state : {
      ...state,
      board: {
        ...state.board,
        columns: {
          ...state.board.columns,
          todo: {
            ...state.board.columns.todo,
            cards: [action.card].concat(state.board.columns.todo.cards),
          }
        },
      }
    }

const dragEnter = (column) =>
  (state, action) =>
    (action.type != `${column.toUpperCase()}_DRAG_ENTER`) ? state : {
      ...state,
      board: {
        ...state.board,
        columns: {
          ...state.board.columns,
          todo: {
            ...state.board.columns.todo,
            dragEnter: true,
          }
        },
      }
    }

const dragLeave = (column) =>
  (state, action) =>
    (action.type != `${column.toUpperCase()}_DRAG_LEAVE`) ? state : {
      ...state,
      board: {
        ...state.board,
        columns: {
          ...state.board.columns,
          todo: {
            ...state.board.columns.todo,
            dragEnter: false,
          }
        },
      }
    }

// TODO
// editCardStart reducer
// editCardStop reducer

const dragCard = (state, action) => {
  if (action.type != 'DRAG_CARD')
    return state

  let card = Immutable.Map(state.board.columns[action.column].cards[action.index]).set('dragging', true).toObject()
  let cards = Immutable.List(state.board.columns[action.column].cards).insert(action.index, card).toArray()
  let column = Immutable.Map(state.board.columns[action.column]).set('cards', cards).toObject()
  let columns = Immutable.Map(state.board.columns).set(action.column, column).toObject()

  return {
    ...state,
    board: {
      ...state.board,
      columns,
    }
  }
}

const dropCard = (state, action) => {
  if (action.type != 'DROP_CARD')
    return state

  let card = action.card
  card.dragging = false
  let cards = Immutable.List(state.board.columns[action.column].cards).push(card).toArray()
  let column = Immutable.Map(state.board.columns[action.column]).set('cards', cards).toObject()
  let columns = Immutable.Map(state.board.columns).set(action.column, column).toObject()

  return {
    ...state,
    board: {
      ...state.board,
      columns,
    }
  }
}

export const board = (state = initialState, action) => {
  state = fetchTrack(state, action)
  state = boardStartDrag(state, action)
  state = boardStopDrag(state, action)
  state = dragCard(state, action)
  state = dropCard(state, action)

  let columns = ['todo', 'developing', 'testing', 'done', 'live']
  columns.forEach((columnName) => {
    state = fetchCards(columnName)(state, action)
    state = removeCardFrom(columnName)(state, action)
    state = addCardTo(columnName)(state, action)
    state = dragEnter(columnName)(state, action)
    state = dragLeave(columnName)(state, action)
  })
  return state
}

// const track = (state = {}, action) => {
//   if (action.type == 'FETCH_TRACK') {
//     return action.track
//   }
//
//   return state
// }
//
// const createFetchCards = (column) =>
//   (state = [], action) =>
//     (action.type == `FETCH_${column.toUpperCase()}`) ?
//       { cards: action.cards } : state
//
// const createMoveCardFromColumn = (source) =>
//   (state = [], action) =>
//     (action.type == "MOVE_CARD" && action.source == source) ?
//       { cards: state.cards.slice(0, action.cardIndex).concat(state.cards.slice(action.cardIndex + 1)) } : state
//
// const createMoveCardToColumn = (target) =>
//   (state = [], action) =>
//     (action.type == "MOVE_CARD" && action.target == target) ?
//       { cards: [action.card].concat(state.cards) } : state
//
// const todo = (state = [], action) => {
//   state = createFetchCards('todo')(state, action)
//   state = createMoveCardFromColumn('todo')(state, action)
//   return createMoveCardToColumn('todo')(state, action)
// }
//
// const developing = (state = [], action) => {
//   state = createFetchCards('developing')(state, action)
//   state = createMoveCardFromColumn('developing')(state, action)
//   return createMoveCardToColumn('developing')(state, action)
// }
//
// const testing = (state = {}, action) => {
//   state = createFetchCards('testing')(state, action)
//   state = createMoveCardFromColumn('testing')(state, action)
//   return createMoveCardToColumn('testing')(state, action)
// }
//
// const done = (state = {}, action) => {
//   state = createFetchCards('done')(state, action)
//   state = createMoveCardFromColumn('done')(state, action)
//   return createMoveCardToColumn('done')(state, action)
// }
//
// const live = (state = {}, action) => {
//   state = createFetchCards('live')(state, action)
//   state = createMoveCardFromColumn('live')(state, action)
//   return createMoveCardToColumn('live')(state, action)
// }
//
// const dragStarted = (state = false, action) => {
//   return action.type == 'START_DRAG' || action.type == 'STOP_DRAG' ?
//     action.dragStart : state
// }

const errors = (state = '', action) => {
  if (action.type == 'NETWORK_ERROR') {
    return action.error
  }
  return state
}

const reducer = combineReducers({
  board,
  errors,
  routing: routerReducer
})

export default reducer
