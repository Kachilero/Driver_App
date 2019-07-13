import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter.reducer';
import sideDrawerToggle from './sideDrawer.reducer';
import { History } from 'history';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter,
    sideDrawerToggle
  });
}