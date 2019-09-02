/**
 * Reducer for switching themes
 */
import {
  ToggleThemeActionTypeKeys,
  ToggleThemeActionTypes
} from './themeAction';

interface ToggleThemeReducerState {
  isLight: boolean;
}

// This has to be false so that it is checked on init.
const ToggleThemeInitState: ToggleThemeReducerState = {
  isLight: false
};

export default function(
  state = ToggleThemeInitState,
  action: ToggleThemeActionTypes
) {
  if (action.type === ToggleThemeActionTypeKeys.TOGGLE_THEME) {
    return { isLight: !state.isLight };
  }
  return state;
}
