import { expect } from 'chai'
import deepFreeze from 'deep-freeze-strict'

import * as reducers from '../../app/reducers'

describe("reducers", () => {
  describe("reducers.board", () => {
    describe("FETCH_TRACK", () => {
      it("updates the board name property", () => {
        let state = { name: 'before', dragging: false }
        let action = { type: 'FETCH_TRACK', track: { name: 'after' }}

        deepFreeze(state)
        let afterState = reducers.board(state, action)

        expect(afterState.name).to.eq(action.track.name)
      })
    })

    describe("BOARD_START_DRAG", () => {
      it("updates the board dragging property", () => {
        let state = { name: 'before', dragging: false }
        let action = { type: 'BOARD_START_DRAG' }

        deepFreeze(state)
        let afterState = reducers.board(state, action)

        expect(afterState.dragging).to.eq(true)
      })
    })

    describe("BOARD_STOP_DRAG", () => {
      it("updates the board dragging property", () => {
        let state = { name: 'before', dragging: true }
        let action = { type: 'BOARD_STOP_DRAG' }

        deepFreeze(state)
        let afterState = reducers.board(state, action)

        expect(afterState.dragging).to.eq(false)
      })
    })

    describe("TODO_FETCH_CARDS", () => {
      it("updates the cards on the board todo column", () => {
        let state = { name: 'before', columns: { todo: { name: 'todo', cards: [{ id: 1 }, { id: 2 }] }}}
        let action = { type: 'TODO_FETCH_CARDS', cards: [{ id: 3 }, { id: 4 }] }

        deepFreeze(state)
        let afterState = reducers.board(state, action)

        expect(afterState.columns.todo.cards).to.eq(action.cards)
      })
    })

    describe("TODO_REMOVE_CARD", () => {
      it("removes a card from the board todo column", () => {
        let state = { name: 'before', columns: { todo: { name: 'todo', cards: [{ id: 1 }, { id: 2 }] }}}
        let action = { type: 'TODO_REMOVE_CARD', index: 1}

        deepFreeze(state)
        let afterState = reducers.board(state, action)

        expect(afterState.columns.todo.cards).to.not.include({ id: 2 })
      })
    })

    describe("TODO_ADD_CARD", () => {
      it("adds a card into the board todo column", () => {
        let state = { name: 'before', columns: { todo: { name: 'todo', cards: [{ id: 2 }] }}}
        let action = { type: 'TODO_ADD_CARD', card: { id: 1 }}

        deepFreeze(state)
        let afterState = reducers.board(state, action)

        expect(afterState.columns.todo.cards).to.include(action.card)
      })
    })

    describe("TODO_DRAG_ENTER", () => {
      it("sets the todo column draggingOver property to true", () => {
        let state = { name: 'before', columns: { todo: { name: 'todo', draggingOver: false }}}
        let action = { type: 'TODO_DRAG_ENTER' }

        deepFreeze(state)
        let afterState = reducers.board(state, action)

        expect(afterState.columns.todo.draggingOver).to.eq(true)
      })
    })

    describe("TODO_DRAG_LEAVE", () => {
      it("sets the todo column draggingOver property to false", () => {
        let state = { name: 'before', columns: { todo: { name: 'todo', draggingOver: true }}}
        let action = { type: 'TODO_DRAG_LEAVE' }

        deepFreeze(state)
        let afterState = reducers.board(state, action)

        expect(afterState.columns.todo.draggingOver).to.eq(false)
      })
    })
  })
})
