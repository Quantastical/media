'use strict';

var _redux = require('redux');

function media() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case 'MOVIES':
			return state.movies || [];
		case 'TV':
			return state.tv || [];
		default:
			return state;
	}
}

function counter() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
}

var store = (0, _redux.createStore)(media);

store.subscribe(function () {
	return console.log(store.getState() + "\n");
});

store.dispatch({ type: 'MOVIES' });
store.dispatch({ type: 'ADD_MOVIE_JSON', movieJSON: '/Users/Quantastical/Desktop/Movies/Back to the Future/Extras/Back to the Future.json' });
store.dispatch({ type: 'MOVIES' });
//store.dispatch({ type: 'TV' })

//# sourceMappingURL=media.js.map