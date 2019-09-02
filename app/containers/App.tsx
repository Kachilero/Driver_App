import { connect } from 'react-redux';
import AppLayout from '../layouts/AppLayout';
import {
  sideDrawerHover,
  toggleSideDrawer
} from '../store/sideDrawer/sideDrawer.actions';
import { Dispatch } from 'redux';

export interface AppState {
  sideDrawerToggle: boolean;
}

function mapStateToProps(state: AppState) {
  return state;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    toggleSideDrawer: () => {
      dispatch(toggleSideDrawer());
    },
    sideDrawerHover: () => {
      dispatch(sideDrawerHover());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppLayout);
