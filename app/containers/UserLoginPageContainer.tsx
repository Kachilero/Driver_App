/**
 * Handles Login with Google
 */

import { connect } from 'react-redux';
import UserLoginView from '../views/UserLoginView';

export interface IuserLoginState {}
export interface IuserLoginProps {}

function mapStateToProps(state: IuserLoginState) {
  return state;
}

export default connect(mapStateToProps)(UserLoginView);
