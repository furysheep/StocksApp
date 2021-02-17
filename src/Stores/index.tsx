import {combineReducers} from 'redux';
import configureStore from './CreateStore';
import FavoritesReducer from './Favorites/reducers';

const rootReducer = combineReducers({
  favorites: FavoritesReducer,
});

export default () => {
  return configureStore(rootReducer);
};

export type RootState = ReturnType<typeof rootReducer>;
