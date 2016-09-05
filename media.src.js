import { createStore } from 'redux'

function media(state = {}, action) {
	switch(action.type) {
		case 'MOVIES':
			return state.movies || []
		case 'TV':
			return state.tv || []
		default:
			return state
	}
}

function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

let store = createStore(media)

store.subscribe(() =>
	console.log(store.getState() + "\n")
)

store.dispatch({ type: 'MOVIES' })
store.dispatch({ type: 'ADD_MOVIE_JSON', movieJSON: '/Users/Quantastical/Desktop/Movies/Back to the Future/Extras/Back to the Future.json' })
store.dispatch({ type: 'MOVIES' })
//store.dispatch({ type: 'TV' })