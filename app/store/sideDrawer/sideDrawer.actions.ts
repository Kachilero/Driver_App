/**
 * Actions for the side drawer
 */
export enum SideDrawerActionTypeKeys {
  TOGGLE_SIDE_DRAWER = 'TOGGLE_SIDE_DRAWER',
  SD_HOVER_STATE = 'SD_HOVER_STATE'
}
interface ToggleSideDrawerAction {
  type: SideDrawerActionTypeKeys.TOGGLE_SIDE_DRAWER;
}
interface SDHoverState {
  type: SideDrawerActionTypeKeys.SD_HOVER_STATE;
}

export type SideDrawerActionTypes = ToggleSideDrawerAction | SDHoverState;

export function toggleSideDrawer() {
  return {
    type: SideDrawerActionTypeKeys.TOGGLE_SIDE_DRAWER
  };
}

export function sideDrawerHover() {
  return {
    type: SideDrawerActionTypeKeys.SD_HOVER_STATE
  };
}

export default { toggleSideDrawer, sideDrawerHover };
