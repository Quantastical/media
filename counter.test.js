'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var counter = function counter() {
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
};

(0, _expect2.default)(counter(0, { type: 'INCREMENT' })).toEqual(1);

(0, _expect2.default)(counter(1, { type: 'INCREMENT' })).toEqual(2);

(0, _expect2.default)(counter(2, { type: 'DECREMENT' })).toEqual(1);

(0, _expect2.default)(counter(1, { type: 'DECREMENT' })).toEqual(0);

(0, _expect2.default)(counter(1, { type: 'SOMETHING_ELSE' })).toEqual(1);

(0, _expect2.default)(counter(undefined, {})).toEqual(0);

console.log("Tests passed!");
