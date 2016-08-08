import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const track = (state = {}, action) => {
  if (action.type == 'FETCH_TRACK') {
    console.log('Fetched:', action.track)
    return action.track
  }

  return state
}

const backlog = (state = {}, action) => {
  if (action.type == 'FETCH_BACKLOG') {
    console.log('backlog:', action.issues)
    return { issues: action.issues }
  }

  return state
}

const todo = (state = {}, action) => {
  if (action.type == 'FETCH_TODO') {
    console.log('todo:', action.issues)
    return { issues: action.issues }
  }

  return state
}

const developing = (state = {}, action) => {
  if (action.type == 'FETCH_DEVELOPING') {
    console.log('in progress:', action.issues)
    return { issues: action.issues }
  }

  return state
}

const testing = (state = {}, action) => {
  if (action.type == 'FETCH_TESTING') {
    console.log('in test:', action.issues)
    return { issues: action.issues }
  }

  return state
}

const done = (state = {}, action) => {
  if (action.type == 'FETCH_DONE') {
    console.log('done:', action.issues)
    return { issues: action.issues }
  }

  return state
}

const live = (state = {}, action) => {
  if (action.type == 'FETCH_LIVE') {
    console.log('live:', action.issues)
    return { issues: action.issues }
  }

  return state
}

const errors = (state = '', action) => {
  if (action.type == 'NETWORK_ERROR') {
    return action.error
  }
  return state
}

const reducer = combineReducers({
  track,
  backlog,
  todo,
  developing,
  testing,
  done,
  live,
  errors,
  routing: routerReducer
})

export default reducer
