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

export function fetchIssues(id, column = 'backlog') {
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
      dispatch({ type: `FETCH_${column.toUpperCase()}`, issues: json })

    } catch(e) {
      dispatch({ type: 'NETWORK_ERROR', error: e })
    }
  }
}
