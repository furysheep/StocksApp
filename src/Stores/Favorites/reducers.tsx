import {
  ActionTypes,
  ADD_FAVORITES,
  FavoritesState,
  REMOVE_FAVORITES,
} from './types';

const initialState: FavoritesState = {
  symbols: [],
};

const reducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
  case ADD_FAVORITES:
    return {symbols: [...state.symbols, action.symbol]};
  case REMOVE_FAVORITES:
    return {symbols: state.symbols.filter((s) => s !== action.symbol)};
  default:
    return state;
  }
};
export default reducer;
