import { ADD_CARD, ADD_DECK, RECEIVE_DECKS } from '../actions'
import { combineReducers } from 'redux'

function decks (state = {}, action) {
  switch (action.type) {
    case ADD_DECK :
      return {
        ...state,
        [action.deck.title]: { cards: [] }
      }
    case ADD_CARD :
      return {
        ...state,
        [action.card.title]: {
          ...state[action.card.title],
          cards: state[action.card.title].cards.concat([action.card.card])
        }
      }
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    default :
      return state
  }
}

export default combineReducers({
    decks
});