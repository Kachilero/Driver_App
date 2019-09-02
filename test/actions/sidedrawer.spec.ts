import '@types/jest';
import {
  toggleSideDrawer,
  sideDrawerHover,
  SideDrawerActionTypeKeys
} from '../../app/store/sideDrawer/sideDrawer.actions';

describe('side drawer actions', () => {
  it('should create action to toggle the side drawer', () => {
    const expectedAction = {
      type: SideDrawerActionTypeKeys.TOGGLE_SIDE_DRAWER
    };
    expect(toggleSideDrawer()).toEqual(expectedAction);
  });

  it('should create action to hover the side drawer', () => {
    const expectedAction = {
      type: SideDrawerActionTypeKeys.SD_HOVER_STATE
    };
    expect(sideDrawerHover()).toEqual(expectedAction);
  });
});
