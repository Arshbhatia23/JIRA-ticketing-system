// reducers.js
const initialState = {
  selectedOption: '',
};

export default function dropdownReducer(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_OPTION':
      return {...state, selectedOption: action.payload };
    default:
      return state;
  }
}