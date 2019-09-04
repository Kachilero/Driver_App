/**
 * User Settings Container
 *
 * Wraps the User Settings View in connect
 */
import { connect } from 'react-redux';
import UserSettingsView from '../views/UserSettingsView';

export interface IuserSettingsState {}
export interface IuserSettingsProps {}

function mapStateToProps(state: IuserSettingsState) {
  return state;
}

export default connect(mapStateToProps)(UserSettingsView);
