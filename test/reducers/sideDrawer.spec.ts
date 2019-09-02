import reducer from '../../app/store/sideDrawer/sideDrawer.reducer';
import { SideDrawerActionTypeKeys } from '../../app/store/sideDrawer/sideDrawer.actions';

describe('Side Drawer Reducer', () => {
  it('should return the initial state', () => {
    //@ts-ignore
    expect(reducer(undefined, {})).toEqual({
      isOpen: true,
      hoverState: false
    });
  });

  it('should handle TOGGLE_SIDE_DRAWER', () => {
    expect(
      reducer(undefined, {
        type: SideDrawerActionTypeKeys.TOGGLE_SIDE_DRAWER
      })
    ).toEqual({
      hoverState: false,
      isOpen: false
    });
  });

  it('should handle SD_HOVER_STATE', () => {
    expect(
      reducer(undefined, {
        type: SideDrawerActionTypeKeys.SD_HOVER_STATE
      })
    ).toEqual({
      hoverState: true,
      isOpen: true
    });
  });
});
