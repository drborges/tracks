import { expect } from 'chai'
import deepFreeze from 'deep-freeze-strict'

import * as reducers from '../../app/reducers'

describe("reducers", () => {
  describe("reducers.board", () => {
    describe("FETCH_TRACK", () => {
      it("updates the board name property", () => {
        let state = { board: { name: 'before', dragStarted: false }}
        let action = { type: 'FETCH_TRACK', track: { name: 'after' }}

        deepFreeze(state)
        let afterState = reducers.board(state, action)

        expect(afterState.board.name).to.eq(action.track.name)
      })
    })

    describe("BOARD_START_DRAG", () => {
      it("updates the board dragging property", () => {
        let state = { board: { name: 'before', dragStarted: false }}
        let action = { type: 'BOARD_START_DRAG' }

        deepFreeze(state)
        let afterState = reducers.board(state, action)

        expect(afterState.board.dragStarted).to.eq(true)
      })
    })

    describe("BOARD_STOP_DRAG", () => {
      it("updates the board dragging property", () => {
        let state = { board: { name: 'before', dragStarted: true }}
        let action = { type: 'BOARD_STOP_DRAG' }

        deepFreeze(state)
        let afterState = reducers.board(state, action)

        expect(afterState.board.dragStarted).to.eq(false)
      })
    })

    describe("TODO_FETCH_CARDS", () => {
      it("updates the cards on the board todo column", () => {
        let state = { board: { name: 'before', columns: { todo: { name: 'todo', cards: [{ id: 1 }, { id: 2 }] }}}}
        let action = { type: 'TODO_FETCH_CARDS', cards: [{ id: 3 }, { id: 4 }] }

        deepFreeze(state)
        let afterState = reducers.board(state, action)

        expect(afterState.board.columns.todo.cards).to.eq(action.cards)
      })
    })

    describe("TODO_REMOVE_CARD", () => {
      it("removes a card from the board todo column", () => {
        let state = { board: { name: 'before', columns: { todo: { name: 'todo', cards: [{ id: 1 }, { id: 2 }] }}}}
        let action = { type: 'TODO_REMOVE_CARD', index: 1}

        deepFreeze(state)
        let afterState = reducers.board(state, action)

        expect(afterState.board.columns.todo.cards).to.not.include({ id: 2 })
      })
    })

    describe("TODO_ADD_CARD", () => {
      it("adds a card into the board todo column", () => {
        let state = { board: { name: 'before', columns: { todo: { name: 'todo', cards: [{ id: 2 }] }}}}
        let action = { type: 'TODO_ADD_CARD', card: { id: 1 }}

        deepFreeze(state)
        let afterState = reducers.board(state, action)

        expect(afterState.board.columns.todo.cards).to.include(action.card)
      })
    })

    describe("TODO_DRAG_ENTER", () => {
      it("sets the todo column dragEnter property to true", () => {
        let state = { board: { name: 'before', columns: { todo: { name: 'todo', dragEnter: false }}}}
        let action = { type: 'TODO_DRAG_ENTER' }

        deepFreeze(state)
        let afterState = reducers.board(state, action)

        expect(afterState.board.columns.todo.dragEnter).to.eq(true)
      })
    })

    describe("TODO_DRAG_LEAVE", () => {
      it("sets the todo column dragEnter property to false", () => {
        let state = { board: { name: 'before', columns: { todo: { name: 'todo', dragEnter: true }}}}
        let action = { type: 'TODO_DRAG_LEAVE' }

        deepFreeze(state)
        let afterState = reducers.board(state, action)

        expect(afterState.board.columns.todo.dragEnter).to.eq(false)
      })
    })

    describe("DRAG_CARD", () => {
      it("sets the card dragging property to true", () => {
        let state = { board: { name: 'before', columns: { todo: { name: 'todo', cards: [{ id: 1 }, { id: 2, dragging: false }] }}}}
        let action = { type: 'DRAG_CARD', column: 'todo', index: 1 }

        deepFreeze(state)
        let afterState = reducers.board(state, action)

        expect(afterState.board.columns.todo.cards[1].dragging).to.eq(true)
      })
    })

    describe("DROP_CARD", () => {
      it("sets the card dragging property to false", () => {
        let state = { board: { name: 'before', columns: { todo: { name: 'todo', cards: [{ id: 1 }] }}}}
        let action = { type: 'DROP_CARD', column: 'todo', card: { id: 2, dragging: true } }

        deepFreeze(state)
        let afterState = reducers.board(state, action)

        expect(afterState.board.columns.todo.cards).to.include({ id: 2, dragging: false })
      })
    })
  })
})
