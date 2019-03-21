import { AsyncStorage } from 'react-native'

export const FLASHCARD_STORAGE_KEY = "Flashcard:decks"

export function submitDeck ({ deck, key }) {
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function submitCard ({ card, key }) {
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
      [key]: card
    }))
  }

export function getDecks(){
  AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then( (obj) => {
    const state = JSON.stringify(obj)
    console.log("AsyncStorage getDecks: "+obj)
    //if (Object.keys(obj).length == 0 && obj.constructor === Object)

  })
  .catch( (error) => {
    console.log(error)
  })
  
  return {
      Capitals: {cards: [{question: "What is the capital of Idaho?", answer: "Boise"},
                      {question: "What is the capital of Ohio?", answer: "Columbus"}]},
      Sports: {cards: [{question: "Who is the famous player who wore 23 on Bulls?", answer: "Michael Jordan"},
                      {question: "What team does Lebron James play for?", answer: "Los Angeles Lakers"}]},
   }
}