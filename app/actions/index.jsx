import { connect as connectActions } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'app/actions'

const endpoint = 'https://www.pivotaltracker.com/services/v5'
const token = 'd74d02dcf74276370c0e2da7d0346775'

export function connect(component) {
  return connectActions(
    state => ({ ...state }),
    dispatch => bindActionCreators(actions, dispatch)
  )(component)
}

export function fetchTrack(id) {
  return async (dispatch) => {
    try {
      let response = await fetch(`${endpoint}/projects/${id}`, { headers: { 'X-TrackerToken': token }})
      let json = await response.json()

      dispatch({ type: 'FETCH_TRACK', track: json })

      dispatch(fetchIssues(1438516, 'todo'))
      dispatch(fetchIssues(1438516, 'developing'))
      dispatch(fetchIssues(1438516, 'testing'))
      dispatch(fetchIssues(1438516, 'done'))
      dispatch(fetchIssues(1438516, 'live'))

    } catch(e) {
      dispatch({ type: 'NETWORK_ERROR', error: e })
    }
  }
}

export function dragEnter(column) {
  return {
    type: `${column.toUpperCase()}_DRAG_ENTER`
  }
}

export function dragLeave(column) {
  return {
    type: `${column.toUpperCase()}_DRAG_LEAVE`
  }
}

export function dragStart() {
  return {
    type: 'BOARD_START_DRAG',
  }
}

export function dragStop() {
  return {
    type: 'BOARD_STOP_DRAG',
  }
}

export function dragCard(index, column) {
  return {
    type: 'DRAG_CARD',
    index: index,
    column: column,
  }
}

export function dropCard(index, column) {
  return {
    type: 'DROP_CARD',
    index: index,
    column: column,
  }
}

export function removeCard(column, index) {
  return {
    type: `${column.toUpperCase()}_REMOVE_CARD`,
    index: index,
  }
}

export function addCard(column, card) {
  return {
    type: `${column.toUpperCase()}_ADD_CARD`,
    card: card,
  }
}

export function fetchIssues(id, column = 'todo') {
  let issuesPathFor = {
    'backlog':    '/stories?filter=state:unstarted',
    'todo':       '/stories?filter=state:planned',
    'developing': '/stories?filter=state:started',
    'testing':    '/stories?filter=state:started&filter=label:testing',
    'done':       '/stories?filter=state:started,delivered&filter=label:tested',
    'live':       '/stories?filter=state:accepted',
  }

  return async (dispatch) => {
    try {
      let response = await fetch(`${endpoint}/projects/${id}${issuesPathFor[column]}`, { headers: { 'X-TrackerToken': token }})
      let json = await response.json()
      let cards = json.map(item => {
        return {
          id: item.id,
          name: item.name,
          editing: false,
          dragging: false,
      }})

      dispatch({ type: `${column.toUpperCase()}_FETCH_CARDS`, cards: cards })

    } catch(e) {
      dispatch({ type: 'NETWORK_ERROR', error: e })
    }
  }
}
