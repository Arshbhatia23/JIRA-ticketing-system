// actions.js
export const SELECT_OPTION = 'SELECT_OPTION';

export function selectOption(option) {
  return { type: SELECT_OPTION, payload: option };
}