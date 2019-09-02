/**
 * Reducers for the side drawer
 */
import {
  SideDrawerActionTypeKeys,
  SideDrawerActionTypes
} from './sideDrawer.actions';
interface SideDrawerReducerState {
  isOpen: boolean;
  hoverState: boolean;
}
const sideDrawerReducerInitState: SideDrawerReducerState = {
  isOpen: true,
  hoverState: false
};
export default function(
  state = sideDrawerReducerInitState,
  action: SideDrawerActionTypes
) {
  switch (action.type) {
    case SideDrawerActionTypeKeys.TOGGLE_SIDE_DRAWER:
      return {
        isOpen: !state.isOpen,
        hoverState: state.hoverState
      };
    case SideDrawerActionTypeKeys.SD_HOVER_STATE:
      return {
        isOpen: state.isOpen,
        hoverState: !state.hoverState
      };
    default:
      return state;
  }
}
