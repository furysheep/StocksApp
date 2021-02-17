import {ActionTypes, ADD_FAVORITES, REMOVE_FAVORITES} from './types';

export const addToFavorites = (symbol: string): ActionTypes => ({
  type: ADD_FAVORITES,
  symbol,
});

export const removeFavorites = (symbol: string) => ({
  type: REMOVE_FAVORITES,
  symbol,
});
