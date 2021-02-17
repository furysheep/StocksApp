export const ADD_FAVORITES = 'ADD_FAVORITES';
export const REMOVE_FAVORITES = 'DELETE_FAVORITES';

export interface FavoritesState {
  symbols: string[];
}

interface AddFavoritesAction {
  type: typeof ADD_FAVORITES;
  symbol: string;
}

interface RemoveFavoritesAction {
  type: typeof REMOVE_FAVORITES;
  symbol: string;
}

export type ActionTypes = AddFavoritesAction | RemoveFavoritesAction;
