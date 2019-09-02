/**
 * Actions to toggle between light and dark themes
 * Overly complicated I know, but I think I might want to expand this latter.
 * */
export enum ToggleThemeActionTypeKeys {
  TOGGLE_THEME = 'TOGGLE_THEME'
}
interface ToggleThemeAction {
  type: ToggleThemeActionTypeKeys.TOGGLE_THEME;
}

export type ToggleThemeActionTypes = ToggleThemeAction;

export function toggleTheme() {
  return {
    type: ToggleThemeActionTypeKeys.TOGGLE_THEME
  };
}

export default toggleTheme;
