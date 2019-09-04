import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
// Reducers
import sideDrawerReducer from '../store/sideDrawer/sideDrawer.reducer';
import themeReducer from '../store/theme/themeReducer';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    sideDrawerReducer: sideDrawerReducer,
    themeReducer: themeReducer
  });
}
