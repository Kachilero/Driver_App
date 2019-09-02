/**
 * Home Page Container
 *
 * Here we'll map the props and state that will be used by this page
 * as well as any children of this page
 * */
import { connect } from 'react-redux';
import HomeLayout from '../layouts/HomeLayout';
import {
  sideDrawerHover,
  toggleSideDrawer
} from '../store/sideDrawer/sideDrawer.actions';
import toggleTheme from '../store/theme/themeAction';
import { Dispatch } from 'redux';

export interface homeState {}

function mapStateToProps(state: homeState) {
  return state;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSideDrawerClick: () => {
      dispatch(toggleSideDrawer());
    },
    onThemeClick: () => {
      dispatch(toggleTheme());
    },
    sideDrawerHover: () => {
      dispatch(sideDrawerHover());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeLayout);
